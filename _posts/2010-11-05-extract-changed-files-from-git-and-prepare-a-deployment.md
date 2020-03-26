---
title:  Extract changed files from Git and prepare a deployment (Bash script)
date:   2010-11-05 22:34:00
layout: post
---

So, you have moved over to Git. Well done! You have big plans for your future deployment process -- it is going to be automated and thoroughly tested... but you still have to support your existing legacy products. If you are like me, you most likely started with simple FTP copies (oh, this takes me back). I moved over from SVN and TortoiseSVN was my primary choice for a desktop client. After each deployment, I would create an SVN tag so next time I can get a list of all changed files. In TortoiseSVN it's as simple as selecting two revisions while holding down the Shift key and doing a *Compare Revisions*. From the new window you can export all changed files to a new location. If your project in 100MB in size, you only ever have to deal with modified files on subsequent updates. Simple (or so I thought back then).

Moving over to Git has thought me many things. I used to love [my Cygwin console](http://blog.angeloff.name/post/1004704485/alternative-cygwin-terminal-shell) even before the switch and I've learnt to do pretty much every daily task in it. But the one thing I really needed and didn't have with Git was an option to copy modified files from the working tree between two commits. It wasn't available on the command line, nor in any of the [clients](http://cola.tuxfamily.org/) [I've tried](http://sourceforge.net/projects/gitextensions/) [so far](http://code.google.com/p/tortoisegit/). So having been playing with shell scripts for a few weeks, I decided to put one together which would do just that:

<script src="https://gist.github.com/664680.js"></script>

Paste the above in a script on your `$PATH`. Using `gitk` or another tool find the first commit you want to include in your extract. Invoke the script as below:

{% highlight bash %}
$ git-extract initial_hash_of_first_commit_to_include..HEAD
Do you wish to remove '.deployments' first? [Y/n]
  Purging '.deployments'...
  Done.
Processing 10 files... 100.00%
Done.
{% endhighlight %}

A new directory `.deployments` will be created with all files that have changed in the given commits range. If files were deleted, a `.delete` file will be generated and you have to handle these manually.

I haven't found a better solution yet, but I am sure there is a *Git way* to do just what I am after. This script is a hack to get the job done.

Leave a comment if you found this post useful. Fork [the Gist](https://gist.github.com/664680) and modify it to suit your needs.
