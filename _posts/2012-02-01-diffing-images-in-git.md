---
title:  Diff'ing images in Git
date:   2012-02-01 23:32:00
layout: default
---

I use Git on the command-line usually, but lately I'm using more and more of [git-cola](http://cola.tuxfamily.org/). It's compact, keyboard-friendly, regularly updated, features a clean UI with main focus on staging and diffs. It was while working in git-cola merging over 100+ files from two different branches that I discovered quite a few overlapping image files. The diff panel was useless and it's not like I can rely on the command-line for non-textual diffs. Did what every developer does nowadays when faced with an issue, I googled *side-by-side diffs*, *git diff images* and any other combination of words and phrases I could come up. There wasn't much, if anything, useful that came up in the results so I got to work.

I run Ubuntu and Gtk immediately came to mind. It shouldn't be too difficult to display the two images with their dimensions side-by-side in a window. I don't need fancy [image view modes](https://github.com/blog/817-behold-image-view-modes), just having the two images next to each other would give me enough information to decide which one to accept. At the end, having never done any PyGtk programming before, I came up with a 50-line script that does just what I need:

<script src="https://gist.github.com/1716699.js"></script>

<img src="https://p.twimg.com/AkkMTtpCMAAtKL8.png" />

It's not an ultimate solution. It will choke up on large images, it doesn't handle transparency well and there are no controls like zooming in/out, but it is better than nothing.

Overall, I found the PyGtk documentation very easy to read, there are plenty of tutorials around and the [API reference](http://developer.gnome.org/gtk3/3.0/) has all the information one needs.

Tip: in git-cola, <C-D> will open up the configured diff tool for the highlighted file.
