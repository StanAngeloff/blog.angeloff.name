import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import { remarkAlert } from "remark-github-blockquote-alert";
import mastodonSummary from "./src/integrations/mastodon-summary.mjs";

/** Shellsession grammars treat # as a root prompt, not a comment.
 *  Re-color entire #-prefixed lines as comments. */
const shellsessionComments = {
  name: "shellsession-comments",
  line(node) {
    if (this.options.lang !== "shellsession") return;
    const first = node.children[0];
    if (first?.children?.[0]?.value?.trimStart() !== "#") return;
    const style = first.properties?.style;
    const text = node.children
      .flatMap((c) => c.children || [])
      .map((n) => n.value || "")
      .join("");
    node.children = [
      {
        type: "element",
        tagName: "span",
        properties: { style },
        children: [{ type: "text", value: text }],
      },
    ];
  },
};

/** Inject the "dictated" AI disclosure after the first paragraph of any post
 *  whose frontmatter sets `dictated: true`, so it lands in the content flow
 *  rather than above the article. */
const aiDisclosureHtml =
  '<aside class="ai-disclosure" aria-label="How this post was written">' +
  '<span class="ai-disclosure-mark" aria-hidden="true">✦</span>' +
  "<p><strong>Dictated, not typed — but read.</strong> " +
  "I thought this post out loud and " +
  '<a href="https://github.com/Flemma-Dev/voxize">transcribed</a> it, then wrote it ' +
  "up with Claude Code, which had direct access to the code and config it describes. " +
  "I read every word; the ideas and direction are mine, the prose a collaboration.</p>" +
  "</aside>";

function remarkAiDisclosure() {
  return (tree, file) => {
    if (!file?.data?.astro?.frontmatter?.dictated) return;
    const idx = tree.children.findIndex((node) => node.type === "paragraph");
    const html = { type: "html", value: aiDisclosureHtml };
    if (idx === -1) tree.children.unshift(html);
    else tree.children.splice(idx + 1, 0, html);
  };
}

export default defineConfig({
  site: "https://blog.angeloff.name",
  output: "static",
  trailingSlash: "always",
  integrations: [sitemap(), mdx(), mastodonSummary()],
  vite: {
    ssr: {
      external: ["satori", "@resvg/resvg-js"],
    },
  },
  markdown: {
    remarkPlugins: [remarkAlert, remarkAiDisclosure],
    shikiConfig: {
      themes: {
        light: "catppuccin-latte",
        dark: "catppuccin-mocha",
      },
      defaultColor: false,
      transformers: [shellsessionComments],
    },
  },
});
