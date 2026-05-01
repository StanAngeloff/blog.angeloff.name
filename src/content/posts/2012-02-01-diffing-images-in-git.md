---
title:  Diff'ing images in Git
date:   2012-02-01 23:32:00
---

I use Git on the command-line usually, but lately I'm using more and more of [git-cola](http://cola.tuxfamily.org/). It's compact, keyboard-friendly, regularly updated, features a clean UI with main focus on staging and diffs. It was while working in git-cola merging over 100+ files from two different branches that I discovered quite a few overlapping image files. The diff panel was useless and it's not like I can rely on the command-line for non-textual diffs. Did what every developer does nowadays when faced with an issue, I googled *side-by-side diffs*, *git diff images* and any other combination of words and phrases I could come up. There wasn't much, if anything, useful that came up in the results so I got to work.

I run Ubuntu and Gtk immediately came to mind. It shouldn't be too difficult to display the two images with their dimensions side-by-side in a window. I don't need fancy [image view modes](https://github.com/blog/817-behold-image-view-modes), just having the two images next to each other would give me enough information to decide which one to accept. At the end, having never done any PyGtk programming before, I came up with a 50-line script that does just what I need:

```python
#!/usr/bin/env python

# Simple Image Diffs
# ==================
#
# How to Install
# --------------
#
# Download the script somewhere on $PATH as 'simple-imagediff' with +x:
#
# $ cd ~/bin
# $ wget -O simple-imagediff https://raw.github.com/gist/1716699/simple-imagediff.py
# $ chmod +x simple-imagediff
#
# Prerequisites
# -------------
#
# The script should work out-of-the box on Ubuntu 11.10. On other OS'es you may
# need to install PIL and Gtk3.
#
# Git Setup
# ---------
#
# In ~/.gitconfig, add:
#
# [diff "image"]
#   command = simple-imagediff
#
# In your project, create .gitattributes file and add (this enables the custom
# diff tool above):
#
# *.gif diff=image
# *.jpg diff=image
# *.png diff=image
#
# Try It
# ------
#
# $ git diff path/to/file.png
#
# NOTE: file.png must be versioned and the working copy must be different.

import os
import sys

import Image

from gi.repository import Gdk, Gtk

class SimpleImageDiffWindow(Gtk.Window):
    def __init__(self, left, right):
        Gtk.Window.__init__(self, title="Simple Image Diff (%s, %s)" % (left, right))
        self.set_default_size(640, 480)
        align = Gtk.Alignment()
        align.set_padding(10, 10, 10, 10)
        box = Gtk.HBox(homogeneous=True, spacing=10)
        box.add(self._create_image_box(left))
        box.add(self._create_image_box(right))
        align.add(box)
        self.add(align)
        self.resize(1, 1)
        self.set_position(Gtk.WindowPosition.CENTER)

    def _create_image_box(self, image_file):
        box = Gtk.VBox(spacing=10)
        frame = Gtk.Frame()
        image = Gtk.Image()
        image.set_from_file(image_file)
        title = Gtk.Label(label="W: %dpx  |  H: %dpx" % Image.open(image_file).size)
        frame.add(image)
        box.pack_start(frame, True, True, 0)
        box.pack_end(title, False, False, 10)
        return box

def _halt(message, code):
    sys.stderr.write("[ERROR] %s\n" % message)
    sys.exit(0 << code)

def _verify_file_exists(target):
    if not os.path.exists(target):
        _halt("The file '%s' does not exists." % target, 2)

if __name__ == '__main__':
    if len(sys.argv) < 3:
        _halt('Not enough arguments.', 1)
    _verify_file_exists(sys.argv[1])
    _verify_file_exists(sys.argv[2])
    app = SimpleImageDiffWindow(sys.argv[1], sys.argv[2])
    app.connect('delete-event', Gtk.main_quit)
    app.show_all()
    Gtk.main()
```

<img src="https://p.twimg.com/AkkMTtpCMAAtKL8.png" />

It's not an ultimate solution. It will choke up on large images, it doesn't handle transparency well and there are no controls like zooming in/out, but it is better than nothing.

Overall, I found the PyGtk documentation very easy to read, there are plenty of tutorials around and the [API reference](http://developer.gnome.org/gtk3/3.0/) has all the information one needs.

Tip: in git-cola, `<C-D>` will open up the configured diff tool for the highlighted file.
