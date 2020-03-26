---
title:  Ubuntu 11.10 - Replace the Default (and Annoying) Orange Scheme
date:   2011-10-14 13:03:00
layout: post
---

Switching to Ubuntu 11.10 is painful, ugly and time consuming... but more on that some other time.

I was quite surprised to see most of the theme control options are now gone. The Appearance panel has no colour tweaks and I hate the default orange scheme. Luckily, there is a way to change it in Gtk3:

{% highlight bash %}
$ sudo apt-get install dconf-tools
$ dconf-editor
{% endhighlight %}

Browse to `org.gnome.desktop.interface`. Locate `gtk-color-scheme`. Edit the property:

{% highlight css %}
bg_color:#f0f1f2;selected_bg_color:#4677f0
{% endhighlight %}

Change the colours to your liking. You may need to re-launch some apps for changes to take effect.

...now if I could only get those Gnome Terminal tabs to look darker.
