---
title:  A quick and dirty way to use namespaces in CoffeeScript
date:   2010-12-07 16:07:00
---

```coffeescript
# Code:
#
namespace = (target, name, block) ->
  [target, name, block] = [exports ? window, arguments...] if arguments.length < 3
  top    = target
  target = target[item] or= {} for item in name.split '.'
  block target, top

# Usage:
#
namespace 'Hello.World', (exports) ->
  # `exports` is where you attach namespace members
  exports.hi = -> console.log 'Hi World!'

namespace 'Say.Hello', (exports, top) ->
  # `top` is a reference to the main namespace
  exports.fn = -> top.Hello.World.hi()

Say.Hello.fn()  # prints 'Hi World!'
```

There you have it -- should work both in the browser and on the server.
