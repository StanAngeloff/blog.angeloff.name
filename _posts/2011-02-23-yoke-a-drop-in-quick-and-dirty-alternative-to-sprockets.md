---
title:     Yoke - a drop-in, quick and dirty alternative to Sprockets
date:      2011-02-23 18:02:00
layout:    default
permalink: /post/3465035915/yoke-a-drop-in-quick-and-dirty-alternative-to/index.html
---

In local development, I tend to create separate pieces of JavaScript for every controller, model, view, etc. I loved the idea of Sprockets -- grab all these files and stitch them together. While it worked well for a while (on the command-line), I got fed up with how slow it runs, especially on Ruby under Cygwin.  
So, what to do? Node.js of course. Why? It's fast, it's super-easy to install and writing a script on top of it is a breeze. Meet Yoke:

<script src="https://gist.github.com/840581.js"></script>

To use, copy the script above on `$PATH` and then:

    yoke [-I path[ -I path]...] input.js > output.js

In most cases, you would just need to replace your existing `sprocketize` command with `yoke`. Both `<file>` and `"file"` requires are supported.
