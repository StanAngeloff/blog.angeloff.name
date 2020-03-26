---
title:  Get my Coffee, Compass and web server in the background, please
date:   2010-08-11 12:57:00
layout: default
---

This is a simple **bash** script I run from my project's working directory to get [CoffeeScript](http://coffeescript.org), [Compass](http://compass-style.org/docs/reference/compass/) and a [simple web server](http://blog.angeloff.name/post/931456447/in-need-of-a-simple-web-server) running. Any changes to `*.(coffee|scss)` files will be compiled on the fly. Remember to check the console every now and then if you think you've made an whoopsy:

<script src="http://gist.github.com/558165.js"></script>

You need an empty `compass.config.rb` file to be present. Mine usually has some goodness in it:

{% highlight ruby %}
images_dir      = 'static/images'
relative_assets = true
{% endhighlight %}
