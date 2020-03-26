---
title:  Vim, regular expressions and negative lookahead
date:   2012-08-05 13:15:00
layout: post
---

One of Vim's biggest strengths IMHO is it's quick access to the search and [extended support for regular expressions][pattern-multi-items]. It can be very frustrating at first as the syntax for the latter doesn't follow Perl or anything else I have used (`grep`, etc.), but once you learn more about it, you'll start to appreciate it.

A feature I recently discovered was [negative lookahead][negative-lookahead]. This can be useful in cases where you are looking for a particular string, but only if it's not followed by another. In my case, I was looking for all references of `include`, but since this also matches Ruby's `include?`, I wanted to exclude and not report it. The search expression I used was:

{%highlight vim%}
/include\(?\)\@!
{%endhighlight%}

There are all sorts of goodness in the [Vim documentation on patterns][documentation]. If you are using Vim on a daily basis, it's worth spending a few minutes to learn what's available. Your next search & replace could save you hours of editing or recording and getting a macro just right.

  [pattern-multi-items]: http://vimdoc.sourceforge.net/htmldoc/pattern.html#pattern-multi-items
  [negative-lookahead]:  http://vimdoc.sourceforge.net/htmldoc/pattern.html#/\@!
  [documentation]:       http://vimdoc.sourceforge.net/htmldoc/pattern.html
