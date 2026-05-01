---
title:  Cygwin, CoffeeScript & Growl for Windows integration
date:   2010-08-16 17:24:00
---

Let's start by adjusting where [node.js](http://nodejs.org/) looks for libraries. We will need this later on when we use the newly implemented [`-r`](http://github.com/jashkenas/coffee-script/commit/b1b78dca47c83986c9654ec51fd9993f90a795e5) command-line switch in CoffeeScript. Open up your shell init file, in my instance `~/.zshrc`:

```shellsession
$ vim ~/.zshrc
```

and add a line in there:

```bash
export NODE_PATH="/cygdrive/d/Workspace/public/coffee-script/.coffee_libraries:$NODE_PATH"
```

The path can be anywhere on your system so adjust it accordingly. Let's go ahead and create a file inside `.coffee_libraries`, name it `growlnotify-windows.coffee` and paste this code inside of it:

```javascript
{ exec } = require 'child_process'

icon = null
require('fs').realpath "#{__dirname}/icon-coffee-cup.png", (exception, path) ->
  exec "cygpath -w '#{path}'", (exception, stdout) ->
    icon = stdout
    process()

queue = []
process = ->
  exec "
  growlnotify
    '/a:CoffeeScript'
    '/i:\"#{ icon.replace(/"/g, '\\"') }\"'
    '/r:\"success\",\"exception\"'
    '/n:\"exception\"'
    '/p:2'
    '/s:true'
    \"/t:\\\"#{ exception.message.replace(/"/g, '\\"') }\\\"\"
    \"#{ exception.stack.replace(/"/g, '\\"').replace(/\n/g, '\\n') }\"
  " while exception = queue.shift()

CoffeeScript.on 'failure', (exception, task) ->
  queue.push exception
  process() if icon
```

We also need a [proper icon](/assets/images/imgur/SaUrK.png) -- save it in the script folder as `icon-coffee-cup.png`.

Next time you run the `coffee` command line utility, append `-r growlnotify-windows` like so:

```shellsession
$ coffee -r growlnotify-windows -wc src/
```

and when the compiler encounters an exception, you will receive a nice UI prompt like this:

![Smokestack theme preview](/assets/images/imgur/M2OiE.png)

Happy coding!
