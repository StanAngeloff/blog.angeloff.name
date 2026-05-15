import type { APIRoute } from "astro";
import { generateOgImage } from "../../lib/og";

export const GET: APIRoute = async () => {
  const png = await generateOgImage("~ tmpfs /home/stan", undefined, {
    showBlogName: false,
  });
  return new Response(png, {
    headers: { "Content-Type": "image/png" },
  });
};
