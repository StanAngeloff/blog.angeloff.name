---
title: Get my Coffee, Compass and web server in the background, please
date: 2010-08-11 12:57:00
---

This is a simple **bash** script I run from my project's working directory to get [CoffeeScript](http://coffeescript.org), [Compass](http://compass-style.org/docs/reference/compass/) and a [simple web server](http://blog.angeloff.name/post/931456447/in-need-of-a-simple-web-server) running. Any changes to `*.(coffee|scss)` files will be compiled on the fly. Remember to check the console every now and then if you think you've made an whoopsy:

```bash
#!/bin/bash

stop()
{
  echo "Shutting down..."

  if [[ $SERVER_PID ]]; then kill -HUP $SERVER_PID; fi;
  if [[ $COMPASS_PID ]]; then kill -HUP $COMPASS_PID; fi;
  if [[ $COFFEE_PID ]]; then kill -HUP $COFFEE_PID; fi;

  if [ -f .coffee.pid ]; then rm -f .coffee.pid; fi;
  if [ -f .compass.pid ]; then rm -f .compass.pid; fi;
  if [ -f .server.pid ]; then rm -f .server.pid; fi;

  trap - INT

  echo "Done."
  exit
}

if [ "$1" == "start" ]; then

  COFFEE_PID=0
  COMPASS_PID=0
  SERVER_PID=0

  trap stop INT

  echo "Starting processes..."

  coffee --watch --compile --output static/lib src &
  COFFEE_PID=$!

  compass watch --config compass.config.rb --sass-dir src/styles --css-dir static/styles &
  COMPASS_PID=$!

  python -m SimpleHTTPServer &
  SERVER_PID=$!

  echo $COFFEE_PID > .coffee.pid
  echo $COMPASS_PID > .compass.pid
  echo $SERVER_PID > .server.pid

  echo "Use '$0 stop' to kill."

elif [ "$1" == "stop" ]; then

  if [ -f .coffee.pid ]; then read COFFEE_PID < .coffee.pid; fi;
  if [ -f .compass.pid ]; then read COMPASS_PID < .compass.pid; fi;
  if [ -f .server.pid ]; then read SERVER_PID < .server.pid; fi;

  stop

else

  echo "Usage: $0 [start,stop]"

fi
```

You need an empty `compass.config.rb` file to be present. Mine usually has some goodness in it:

```ruby
images_dir      = 'static/images'
relative_assets = true
```
