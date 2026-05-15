import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

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

export default defineConfig({
  site: "https://blog.angeloff.name",
  output: "static",
  trailingSlash: "always",
  integrations: [sitemap(), mdx()],
  markdown: {
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
