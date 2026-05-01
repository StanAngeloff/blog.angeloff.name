import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { marked } from "marked";
import fs from "node:fs";
import path from "node:path";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function postUrl(post: { id: string; data: { date: Date } }): string {
  const date = post.data.date;
  const y = String(date.getUTCFullYear());
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  const titleSlug = post.id.slice(11);
  return `https://blog.angeloff.name/post/${y}/${m}/${d}/${titleSlug}/`;
}

export const GET: APIRoute = async () => {
  const posts = await getCollection("posts");
  const sorted = posts.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );

  const items = await Promise.all(
    sorted.map(async (post) => {
      const filePath = path.join(
        process.cwd(),
        "src/content/posts",
        `${post.id}.md`,
      );
      const raw = fs.readFileSync(filePath, "utf-8");
      const body = raw.replace(/^---[\s\S]*?---\s*/, "");
      const html = await marked(body);
      const url = postUrl(post);
      return `    <item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${post.data.date.toUTCString()}</pubDate>
      <description><![CDATA[${html}]]></description>
    </item>`;
    }),
  );

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>tmpfs /home/stan</title>
    <link>https://blog.angeloff.name/</link>
    <description>Stan Angeloff's blog, a collection of thoughts, rants &amp; research</description>
    <language>en</language>
    <lastBuildDate>${sorted[0].data.date.toUTCString()}</lastBuildDate>
    <atom:link href="https://blog.angeloff.name/rss.xml" rel="self" type="application/rss+xml"/>
${items.join("\n")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
};
