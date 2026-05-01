import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const body = `Sitemap: https://blog.angeloff.name/sitemap-index.xml

User-agent: *
Crawl-delay: 1
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
