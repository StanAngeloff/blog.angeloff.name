import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const WIDTH = 1200;
const HEIGHT = 630;

const FONTS_CSS_URL =
  "https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@600&family=IBM+Plex+Mono:wght@400";

// Old-browser UA triggers TTF delivery (single file per family, no unicode-range splitting)
const TTF_UA =
  "Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.0.9.2372 Mobile Safari/537.10+";

let fontCache: { serif: ArrayBuffer; mono: ArrayBuffer } | null = null;

async function loadFonts() {
  if (fontCache) return fontCache;

  const css = await fetch(FONTS_CSS_URL, {
    headers: { "User-Agent": TTF_UA },
  }).then((r) => r.text());

  function extractUrl(family: string): string {
    const escaped = family.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = css.match(
      new RegExp(
        `font-family:\\s*'${escaped}'[^}]+src:\\s*url\\(([^)]+)\\)`,
      ),
    );
    if (!match) throw new Error(`Font URL not found for ${family}`);
    return match[1];
  }

  const [serif, mono] = await Promise.all([
    fetch(extractUrl("IBM Plex Serif")).then((r) => r.arrayBuffer()),
    fetch(extractUrl("IBM Plex Mono")).then((r) => r.arrayBuffer()),
  ]);

  fontCache = { serif, mono };
  return fontCache;
}

export async function generateOgImage(
  title: string,
  date?: Date,
  { showBlogName = true }: { showBlogName?: boolean } = {},
): Promise<Buffer> {
  const fonts = await loadFonts();

  const formattedDate = date?.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const fontSize = title.length > 80 ? 40 : title.length > 50 ? 48 : 56;

  const element = {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "#111110",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              width: "100%",
              height: "4px",
              backgroundColor: "#b8a47a",
            },
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              flex: 1,
              padding: "52px 72px 48px",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                  },
                  children: [
                    ...(showBlogName
                      ? [
                          {
                            type: "div",
                            props: {
                              style: {
                                fontFamily: "IBM Plex Mono",
                                fontSize: "28px",
                                color: "#8a8a80",
                                marginBottom: "32px",
                              },
                              children: "~ tmpfs /home/stan",
                            },
                          },
                        ]
                      : []),
                    {
                      type: "div",
                      props: {
                        style: {
                          fontFamily: "IBM Plex Serif",
                          fontWeight: 600,
                          fontSize,
                          color: "#eceae0",
                          lineHeight: 1.2,
                          letterSpacing: "-0.012em",
                        },
                        children: title,
                      },
                    },
                  ],
                },
              },
              ...(formattedDate
                ? [
                    {
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          flexDirection: "column",
                        },
                        children: [
                          {
                            type: "div",
                            props: {
                              style: {
                                width: "160px",
                                height: "2px",
                                backgroundColor: "#4a4a42",
                                marginBottom: "20px",
                              },
                            },
                          },
                          {
                            type: "div",
                            props: {
                              style: {
                                fontFamily: "IBM Plex Mono",
                                fontSize: "20px",
                                color: "#8a8a80",
                              },
                              children: formattedDate,
                            },
                          },
                        ],
                      },
                    },
                  ]
                : []),
            ],
          },
        },
      ],
    },
  };

  const svg = await satori(element, {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      {
        name: "IBM Plex Serif",
        data: fonts.serif,
        weight: 600,
        style: "normal",
      },
      {
        name: "IBM Plex Mono",
        data: fonts.mono,
        weight: 400,
        style: "normal",
      },
    ],
  });

  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: WIDTH },
  });

  return resvg.render().asPng();
}
