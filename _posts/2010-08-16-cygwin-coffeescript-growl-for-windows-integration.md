---
title:     Cygwin, CoffeeScript & Growl for Windows integration
date:      2010-08-16 17:24:00
layout:    default
permalink: /post/962830463/cygwin-coffeescript-growl-for-windows-integration/index.html
---

Let's start by adjusting where [node.js](http://nodejs.org/) looks for libraries. We will need this later on when we use the newly implemented [`-r`](http://github.com/jashkenas/coffee-script/commit/b1b78dca47c83986c9654ec51fd9993f90a795e5) command-line switch in CoffeeScript. Open up your shell init file, in my instance `~/.zshrc`:

    $ vim ~/.zshrc

and add a line in there:

    export NODE_PATH="/cygdrive/d/Workspace/public/coffee-script/.coffee_libraries:$NODE_PATH"

The path can be anywhere on your system so adjust it accordingly. Let's go ahead and create a file inside `.coffee_libraries`, name it `growlnotify-windows.coffee` and paste this code inside of it:

<script src="http://gist.github.com/558161.js"></script>

We also need a [proper icon](http://i.imgur.com/SaUrK.png) -- save it in the script folder as `icon-coffee-cup.png`.

Next time you run the `coffee` command line utility, append `-r growlnotify-windows` like so:

    $ coffee -r growlnotify-windows -wc src/

and when the compiler encounters an exception, you will receive a nice UI prompt like this:

![Smokestack theme preview](http://i.imgur.com/M2OiE.png)

Happy coding!
