---
title:  Alternative Cygwin terminal & shell
date:   2010-08-24 10:20:00
layout: post
---

I just realised many, if not most, Cygwin users stick with their default terminal which is the *Cygwin Bash Shell*. I never understood why this is the default with each installation. It is no better than *Command Prompt* -- horizontal window resizing is out of the question, custom fonts are limited and mouse support is, well... missing.

## Terminal

If you have used PuTTY to connect to remote machines, you would love [**MinTTY**](http://code.google.com/p/mintty/). It is based on code from PuTTY 0.60. Features as seen on the project's homepage include:

  * Native Windows user interface that tries to keep things simple.
  * Support for UTF-8, CJK fonts, and Windows IMEs.
  * Drag & drop and copy & paste of text, files and folders. (Files and folders are inserted as quoted filenames.)
  * Extensive mouse support, e.g. mousewheel scrolling in less and opening files and URLs with Ctrl+click
  * Window transparency, including glass effect on Vista and 7.
  * Small program size and  uick scrolling.

![MinTTY preview](http://i.imgur.com/EBpvY.png)

## Shell

I encourage you to try [**Zsh**](http://www.zsh.org/) as an alternative to Bash (the default). Bash is fine, but if you are looking for better history management, lots of plug-ins and options for customisations you need to move on. Check out [oh-my-zsh](http://github.com/robbyrussell/oh-my-zsh) for a collection of such add-ons.

You can install MinTTY and ZSH using Cygwin's [setup.exe](http://www.cygwin.com/setup.exe).

### MinTTY at your fingertips

Having a terminal keystroke away is essential in my day-to-day work. I need to be able to quickly get in and out of it -- [read how to do it](http://blog.angeloff.name/post/1104619682/mintty-at-your-fingertips).
