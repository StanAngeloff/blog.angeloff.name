---
title:     Not enough random bytes available.
date:      2012-01-24 14:38:00
layout:    default
permalink: /post/16404732719/not-enough-random-bytes-available/index.html
---

### Please do some other work to give the OS a chance to collect more entropy! (Need more bytes)

I decided to upgrade `pacman` on Arch Linux recently. I was advised to run `[sudo] pacman-key --init` after the update had finished. Sounds simple enough, just one extra command I need to copy -> paste to get me going again. Wrong. It turns out **gpg** will go about generating a very strong key (did not investigate the exact key size). On my not-so-busy machine it would just sit there doing (what would appear as) nothing for hours. To generate entropy, `/dev/random` [is used](http://sublimated.wordpress.com/2007/08/28/not-enough-random-bytes-available/). I started:

    $ cat /dev/random

in a remote session and there was nothing printed on-screen, e.g., nothing was being generated, e.g., no entropy, e.g., no **gpg** joy. What follows is a very ugly hack to speed things up. Keep the above remote connection open and connect to the machine in a separate tab/window. Start `pacman-key` as instructed earlier. Leave the window/tab open and connect again, in a third, separate window/tab. Repeat (many) times:

    $ ls -R /
    $ [sudo] sync
    $ sudo tee /proc/sys/vm/drop_caches <<< 3

Ugly, I know.
