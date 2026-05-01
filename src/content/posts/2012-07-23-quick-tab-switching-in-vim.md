---
title: Quick tab switching in Vim
date: 2012-07-23 12:00:00
---

This is so simple, it doesn't even deserve an explanation:

```vim
nnoremap <silent> <C-J> gt
nnoremap <silent> <C-K> gT
```

Re-map your `Caps Lock` key to `Ctrl` and navigating around your tabs just got a lot easier.

To re-map in Ubuntu, open up the Dash, find the _Keyboard Layout_ app, launch it, go to _Options..._ and expand _Caps Lock key behaviour_. Select _Make Caps Lock an additional Control but keep the Caps_Lock keysym_. Close windows. Changes should be available immediately.
