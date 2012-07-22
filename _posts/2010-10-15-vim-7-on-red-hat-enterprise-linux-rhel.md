---
title:     Vim 7 on Red Hat Enterprise Linux (RHEL)
date:      2010-10-15 14:53:00
layout:    default
permalink: /post/1319772540/vim-7-on-red-hat-enterprise-linux-rhel/index.html
---

Following my [last post](http://tumblr.com/xskltn6s1) I moved on to installing Vim 7.x as the one that comes with RHEL 4 is pretty outdated (6.x).

## Vim 7.2 from SVN

Tested on RHEL 4 i386:

    $ cd ~
    $ svn co https://vim.svn.sourceforge.net/svnroot/vim/vim7
    $ cd vim7
    $ ./configure --prefix=/usr --with-features=huge --disable-gui --without-x --enable-rubyinterp --enable-cscope --enable-multibyte
    $ make && make install
    $ vim --version
    VIM - Vi IMproved 7.2 (2008 Aug 9)

## Vim 7.3 from Mercurial

Tested on RHEL 5 x86_64:

    $ cd ~
    $ yum install hg ncurses-devel
    $ hg clone https://vim.googlecode.com/hg/ vim
    $ cd vim
    $ ./configure --prefix=/usr --with-features=huge --disable-gui --without-x --enable-rubyinterp --enable-cscope --enable-multibyte
    $ make && make install
    $ vim --version
    VIM - Vi IMproved 7.3 (2010 Aug 15)

RHEL 4 comes with `up2date`. I tried `-i mercurial` and `-i hg`, but both failed. Vim offers an archived download so you can skip steps 3-4 above and instead use:

    [..]
    $ wget ftp://ftp.vim.org/pub/vim/unix/vim-7.3.tar.bz2
    $ tar xjvf vim-7.3.tar.bz2
    $ cd vim73
    [..]

Let me know if this post helped you or if you had to install any additional libraries.
