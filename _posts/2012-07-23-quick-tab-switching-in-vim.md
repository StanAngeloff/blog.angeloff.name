---
title:  Quick tab switching in Vim
date:   2012-07-23 12:00:00
layout: post
---

This is so simple, it doesn't even deserve an explanation:

{% highlight vim %}
nnoremap <silent> <C-J> gt
nnoremap <silent> <C-K> gT
{% endhighlight %}

Re-map your `Caps Lock` key to `Ctrl` and navigating around your tabs just got a lot easier.

To re-map in Ubuntu, open up the Dash, find the *Keyboard Layout* app, launch it, go to *Options...* and expand *Caps Lock key behaviour*. Select *Make Caps Lock an additional Control but keep the Caps_Lock keysym*. Close windows. Changes should be available immediately.
