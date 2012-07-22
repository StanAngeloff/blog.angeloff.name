---
title:     In need of a simple web server
date:      2010-08-10 13:47:00
layout:    default
permalink: /post/931456447/in-need-of-a-simple-web-server/index.html
---

I was hacking away on an AJAX application and needed to do some `XMLHttpRequest` goodness. Needless to say, working with the `file://` protocol has become very restrictive lately so I was in a need of a simple web server - this meant no configuration, no support, no hassle whatsoever:

    $ python -m SimpleHTTPServer &

and your working directory is now accessible over at `http://localhost:8000/`