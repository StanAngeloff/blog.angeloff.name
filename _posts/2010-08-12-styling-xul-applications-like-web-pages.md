---
title:  Styling XUL applications like web pages
date:   2010-08-13 13:10:00
layout: post
---

If you don't know of XUL applications there are [many out there](http://www.mozilla.org/projects/mozilla-based.html) in the wild. You are probably using a Mozilla XUL-based app without even realising it.

I am a [Komodo Edit](http://www.activestate.com/komodo-edit) user myself  and I love the platform. I have posted [several](http://community.activestate.com/xpi/html-toolkit) [extensions](http://community.activestate.com/xpi/aero-theme) if my words are not enough to prove it.

The greatest weakness of XUL apps in my book is how **static** they feel. They are not as dynamic and rich as HTML documents and as a result development is usually not as easy and elegant. You are forced to restart the application between updates or rely on hacky methods to reload it while running. Being frustrated with these facts, I decided to do something about it. It would be wonderful if you could just press `Ctrl+Alt+R` and have a fresh stylesheet loaded into your application -- much like existing solutions for [Google Chrome](https://chrome.google.com/extensions/detail/ojcnooebgeenefpfngjfifjcnhlkbbdd) of [Firefox](https://addons.mozilla.org/en-US/firefox/addon/7465/). Here is one way you can do just this in Komodo:

<script src="http://gist.github.com/558163.js"></script>

Create this as a macro and assign a key binding to it. Pressing it will discard any previously loaded stylesheet and inject a non-cached fresh copy of it right in the beginning of the document.

This can be simulated in any XUL app -- you would need a `keypress` handler and some code to deal with recognising the correct combination of keys and you are off on a good start.
