---
title:     Git on Red Hat Enterprise Linux (RHEL) 4 i386
date:      2010-10-15 14:04:00
layout:    default
permalink: /post/1319580433/git-on-red-hat-enterprise-linux-rhel-4-i386/index.html
---

I have been struggling with this for a while now. There is no `yum` to begin with and `up2date` doesn't help much either (no `git-*` packages). Here is a quick solution:

    $ cd ~
    $ wget http://packages.sw.be/git/git-1.7.3-1.el4.rf.i386.rpm
    $ wget http://packages.sw.be/git/perl-Git-1.7.3-1.el4.rf.i386.rpm
    $ rpm -ivh --nodeps git-1.7.3-1.el4.rf.i386.rpm perl-Git-1.7.3-1.el4.rf.i386.rpm
    $ git --version

You can browse [packages.sw.be/git/](http://packages.sw.be/git/) for the latest packages and update the above accordingly.
