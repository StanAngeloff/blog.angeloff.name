---
title:  PHP Recursive Patterns
date:   2012-08-05 13:30:00
layout: post
---

_**tl;dr;** This post deals with writing very simple parsers for nested data using recursive regular expressions._

There is a very good reason why regular expressions are called that -- they are regular. You can get a lot done with them, but if your data has a complex structure, you'd often be advised to use a parser.
A good example is processing data where parentheses can be nested. A simple regular expression:

{%highlight php%}
/\([^\)]+/
{%endhighlight%}

fails quickly when a nested `(` `)` pair is encountered.


{%highlight php%}
<?php

$string = '(Hello (World!))';
preg_match_all('/\([^\)]+/', $string, $groups);
var_export($groups);

# array (
#   0 => array (
#     0 => '(Hello (World!',
#   ),
# )
{%endhighlight%}

[PCRE][PCRE] (the regular expressions engine behind [`preg_*` functions][preg functions]) has support for dealing with those cases where you need to recurse and repeat the pattern.
For example, a very simple CSS parser would need to balance opening `{` and closing `}`, i.e., taking into account `@media` queries also enclosed by a `{..}` pair. Let's assume this document:

{%highlight css%}
body { color: #888; }

@media print { body { color: #333; } }

code { color: blue; }
{%endhighlight%}

A non-[greedy][greedy] regular expression like `/{.*?}/` would fail as it exits as soon as a closing `}` is encountered resulting in the following captured groups:

{%highlight php%}
array (
  0 => '{ color: #888; }',
  1 => '{ body { color: #333; }',  # NOTE: the first opening { is not balanced.
  2 => '{ color: blue; }',
)
{%endhighlight%}

To deal with balanced pairs, we need a way to descend into a pair and repeat the pattern. In pseudo Basic-like regular expressions code this would mean:

```
10: expect an opening '{'
20:   read until
21:     '{' or '}' is encountered
22:     OR end of data, goto 50.
30:   if '{', start over; goto 10.
40:   if '}', goto 50.
50: expect a balanced closing '}'
```

[PCRE supports `(?R)`][PCRE recursive] which does exactly what is illustrated above: it repeats the **whole** pattern recursively.
Let's go back to the non-greedy pattern (and the sample CSS document):

{%highlight php%}
/{.*?}/
{%endhighlight%}

and modify it so it starts a new group for each nested pair:

{%highlight php%}
/
  {           # find the first opening '{'.
    (?:       # start a new group, this is so '|' below does not apply/affect the opening '{'.
      [^{}]+  # skip ahead happily if no '{' or '}'.
      |       #   ...otherwise...
      (?R)    # we may be at the start of a new group, repeat whole pattern.
    )
    *         # nesting can be many levels deep.
  }           # finally, expect a balanced closing '}'
/
{%endhighlight%}

Let's convert this to an inline pattern and run it against our sample CSS document:

{%highlight php%}
<?php

$string = <<<CSS
body { color: #888; }

@media print { body { color: #333; } }

code { color: blue; }
CSS;

$pattern = '/{(?:[^{}]+|(?R))*}/';

preg_match_all($pattern, $string, $groups);
var_export($groups);

# array (
#   0 =>
#   array (
#     0 => '{ color: #888; }',
#     1 => '{ body { color: #333; } }',
#     2 => '{ color: blue; }',
#   ),
# )
{%endhighlight%}

This is a great start to a simple CSS parser. You can now iterate over the results and run the expression again until you get a flattened list of all the properties.

Note again `(?R)` repeats the **whole** pattern. If you want to match all `@media` queries for example, you'd need to make sure the group is optional:

{%highlight php%}
<?php

# [...]

$pattern = '/(?:@media[^{]+)?'     # @media is optional, e.g., when we have descended into it.
         . '{(?:[^{}]+|(?R))*}/s';
{%endhighlight%}

### Why not a parser instead?

Parsers can be much more complex than a one-line regular expression. You'd most likely also need to include a dependency in your project.
If all you need is a simple solution then I say try and use recursive regular expressions first. I have been hacking on a tool to [merge `@media` queries][gist] produced by Sass and I got the job done with no complex parsers or dependencies involved.


  [PCRE]:           http://www.pcre.org/
  [preg functions]: http://www.php.net/manual/en/ref.pcre.php
  [greedy]:         http://www.regular-expressions.info/repeat.html#greedy
  [PCRE recursive]: http://php.net/manual/en/regexp.reference.recursive.php
  [gist]:           https://gist.github.com/3164569
