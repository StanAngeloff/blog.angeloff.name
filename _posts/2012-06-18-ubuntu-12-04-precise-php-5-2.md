---
title:  Ubuntu 12.04 (Precise) & PHP 5.2.x
date:   2012-06-18 14:12:00
layout: default
---

If you get lots of:

    configure: error: Cannot find libXXX under /usr.

when you attempt to `./configure` PHP 5.2.x (and possibly earlier series as well), try appending:

    --with-libdir=lib/x86_64-linux-gnu

This instructs the script to look for libraries under `/usr/lib/x86_64-linux-gnu` instead of `/usr/lib`. If this doesn't work for you, try running:

    $ sudo updatedb
    $ locate 'libXXX' | grep 'so$'

Which should output the directory where the binary `libXXX` (e.g., `libmysqlclient`) is installed.

----

If you also see this at the linking stage:

    ext/openssl/xp_ssl.c: undefined reference to `SSLv2_server_method'

You would want to patch your 5.2.17 source with [debian_patches_disable_SSLv2_for_openssl_1_0_0.patch](https://bugs.php.net/patch-display.php?bug_id=54736&patch=debian_patches_disable_SSLv2_for_openssl_1_0_0.patch&revision=latest).
