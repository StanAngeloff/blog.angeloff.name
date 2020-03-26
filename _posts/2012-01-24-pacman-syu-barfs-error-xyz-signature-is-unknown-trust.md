---
title:  "pacman -Syu barfs error: XYZ: signature is unknown trust"
date:   2012-01-24 14:45:00
layout: post
---

Things kept getting better and better. Following the recent [pacman upgrade](http://blog.angeloff.name/post/16404732719/not-enough-random-bytes-available), I was now facing issues with regards to package signatures. I had already successfully completed the keyring initialisation and I was a bit stumbled as to what exactly I was doing wrong.

You remember all those `/etc/config saved as /etc/config.new` messages. Yes, as it turns out these are important. Given you haven't modified your `pacman` configuration (perhaps added to the `HoldPkg` list recently?), you can safely accept the new values:

{% highlight bash %}
$ [sudo] mv /etc/pacman.conf /etc/pacman.conf.pacprev
$ [sudo] mv /etc/pacman.conf.pacnew /etc/pacman.conf
{% endhighlight %}

Re-run `[sudo] pacman -Syu` and you are on your way.
