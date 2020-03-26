---
title:  Ubuntu 12.04 - Super key not working in shortcuts
date:   2012-08-08 12:00:00
layout: default
---

If you are running the latest Ubuntu this Summer and are trying to configure your keyboard shortcuts to use the `Super` key, you may be out of luck.

Up until recently, I was quite happy with my `Super+E` key launching `nautilus` in my home directory. I went to *Keyboard Shortcuts* and played around with the configuration and then restored my original values. To my surprise, I could no longer open `nautilus` with the key combination `Super+E`.
It took me all evening to find a solution and as it turns out, there are several issues at play:

- If you haven't mapped your `Super` key yet, you are [advised to do so][map-super-key] before you continue.
- There is a [long standing issue with multiple regressions][long-standing-issue] where *Unity* is blocking any other apps from receiving the `Super` key if the Dash is configured to open just by using that key. You should set it to a key combination, e.g., `Super+L` or similar.
- The latest regression [Unity blocks other programs from binding globally to Super+* or Alt+* (* = any key)][latest-regression] has been fixed, but not officially released.

  [map-super-key]:       http://askubuntu.com/a/138136/49686
  [long-standing-issue]: https://bugs.launchpad.net/ubuntu/+source/unity/+bug/704231
  [latest-regression]:   https://bugs.launchpad.net/ubuntu/+source/gnome-settings-daemon/+bug/950160

So, at the end, it turns out it's `gnome-settings-daemon` being faulty. To get the updated version, which should fix the issue on Ubuntu 12.04, you need to accept packages from the [`proposed`][proposed] archive.

Start by making sure you have your system up-to-date:

{%highlight bash%}
$ sudo apt-get update
$ sudo apt-get dist-upgrade
# Accept upgrades, if any.
{%endhighlight%}

> To enable the proposed archive for Ubuntu 12.04 go to **Applications→Ubuntu Software Center→Edit→Software Sources→Updates** and ensure that **precise-proposed** is ticked.

You should also make sure to suppress updates you are not interested in as you may unnecessarily install an unstable package. To opt-out of automatic updates from the `proposed` archive, create a new file under `/etc/apt/preferences.d/precise-proposed` and put the following inside it:

```
Package: *
Pin: release a=precise-security
Pin-Priority: 990

Package: *
Pin: release a=precise-updates
Pin-Priority: 900

Package: *
Pin: release a=precise-proposed
Pin-Priority: 400
```

What the above file does is to ensure the `proposed` packages are lower in priority than their stable versions from `precise-updates`.
Before you continue, make sure you don't have any package updates. If you do, it means something was picked up from the `proposed` archive and this should not have happened:

{%highlight bash%}
$ sudo apt-get update
$ sudo apt-get dist-upgrade
# Confirm you have 0 upgrades.
{%endhighlight%}

Finally, install `gnome-settings-daemon` from `precise-proposed`:

{%highlight bash%}
$ sudo apt-get install gnome-settings-daemon/precise-proposed
{%endhighlight%}

Unfortunately you would likely need to restart the system for changes to take effect. In my case I `kill`ed the daemon, but in the process it didn't reload with the correct settings and I experienced a nasty crash.

  [proposed]: https://wiki.ubuntu.com/Testing/EnableProposed

I hope changes would be pushed to stable channels soon which would make this post obsolete, but in the interim, enjoy your `Super` key combos working again.
