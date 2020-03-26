---
title:  node-paperserve - Quick and dirty web server from your working directory
date:   2010-08-17 14:57:00
layout: post
---

**Install**

{% highlight bash %}
$ npm install paperserve
{% endhighlight %}

**Usage**

    paperserve [path-to-serve]

      -p, --port [PORT]  set the port to listen on, default 8000
      -q, --quiet        turn off any logging, default false
      -h, --help         display this help message

Here's what the output looks like:

    >>> paperserve: running on port 8000, serving from '/cygdrive/d/Workspace/public/node-paperserve'
    >>> paperserve:   Press Ctrl-C to stop.

Source code can be found on [GitHub](http://github.com/StanAngeloff/node-paperserve). As for the motivation behind the project -- let's just say I prefer JavaScript to [Python](http://blog.angeloff.name/post/931456447/in-need-of-a-simple-web-server).
