import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { generateOgImage } from "../../lib/og";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection("posts");
  return posts.map((post) => ({
    params: { id: post.id },
    props: { title: post.data.title, date: post.data.date },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const { title, date } = props as { title: string; date: Date };
  const png = await generateOgImage(title, date);
  return new Response(png, {
    headers: { "Content-Type": "image/png" },
  });
};
