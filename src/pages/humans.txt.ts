import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const lastUpdate = new Date().toISOString().slice(0, 10);
  const body = `/* TEAM */
Name: Stan Angeloff
Role: Author
Site: https://blog.angeloff.name
Location: Sofia, Bulgaria

/* SITE */
Last update: ${lastUpdate}
Language: English
Standards: HTML5, CSS3
Software: Astro, Pico CSS
Hosting: GitHub Pages
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
