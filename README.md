# [blog.angeloff.name](https://blog.angeloff.name)

Personal blog of Stan Angeloff. Built with [Astro](https://astro.build/) 6.2, styled with [Pico CSS](https://picocss.com/), hosted on GitHub Pages.

Static site, no JavaScript, no build-time image processing — just markdown posts rendered to HTML.

## Stack

- **Astro 6.2** — static output, content collections with glob loader
- **Pico CSS v2** (indigo) — classless styling via CDN
- **IBM Plex Sans / Serif** — body and heading fonts from Google Fonts
- **GitHub Actions** — build and deploy to Pages on push to `main`
- **Atom + RSS** — feeds generated at build time from post markdown

## Development

```sh
pnpm install
pnpm dev
```

## Build

```sh
pnpm build
```

Output goes to `dist/`.
