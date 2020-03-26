---
title:  Failed to load module "globalmenu-gtk" after uninstalling gnome-shell
date:   2012-02-06 17:53:00
layout: post
---

If you get:

{% highlight bash %}
Gtk-Message: Failed to load module "globalmenu-gtk"
{% endhighlight %}

every time you launch an app, you have left a Gnome Shell module, which is no longer present on your system, in your `GTK_MODULES` environment variable. In my case, I enabled the Global Menu extension in Gnome Tweak Tool and then uninstalled Gnome Shell. To fix, I `rm`ed the `/etc/profile.d/globalmenu.sh` file and rebooted.
