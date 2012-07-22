---
title:     cd with bookmarks and auto-completion for Zsh
date:      2010-08-29 12:00:00
layout:    default
permalink: /post/1027007406/cd-with-bookmarks-and-auto-completion-for-zsh/index.html
---

If you are like me, you do a lot of terminal work and `cd` is your friend (or enemy). I was getting really tired to `cd /home/stan/projects/important-project/src/` every time I launch my shell. It's bad enough when you have one project to work on, but as things get scattered, you tend to do more directory traversing than actual coding.

Up until recently I was using [go-tool](http://code.google.com/p/go-tool/). From the website:

> `go` is a small shell command for changing directories quickly. Typically you have a set of directories that you work in. Typing out the names of those dirs in full can be tedious. `go` allows you to give a shortcut name for a directory -- say `ko` for `D:\trentm\main\Apps\Komodo-devel` [..]

It's a great tool, but it doesn't work with Zsh out-of-the box (trivial to modify the Bash example to fake it). It's also based on Python and can be very slow when using it in a fresh terminal window. I really needed a solution that was native and didn't require a lot of effort to set up.

## The 'Thin' Option

I stumbled upon [Ivan Čukić's excellent blog post](http://ivan.fomentgroup.org/blog/2010/01/29/zsh-bookmarks-for-cd-change-directory-with-completion/). It's so cool, I couldn't resist trying it. I took the functions and tweaked the path where the database is stored and how it is accessed. This is a better solution compared to `go` and as a bonus it also offers auto-completion:

<script src="http://gist.github.com/558158.js"></script>

### How to Use It

Paste the above code at the bottom of your `~/.zshrc` file. Restart your terminal and run `cdb_edit`. This should bring up an empty buffer in your `$EDITOR`. To define shortcuts, use `shortcut  absolute/path`. Here is an example file:

    $ cdb_edit

    public    /cygdrive/d/Workspace/public/
    projects  /cygdrive/d/Workspace/projects/

### Try it Out

Using the database above as an example:

    ~ $ cdb public
    /cygdrive/d/Workspace/public/ $ 

## The 'Fat' Option

If you are looking for something more sophisticated which wouldn't involve maintaining a database using vim then you need [Jump, a bookmarking system for the bash and zsh shells](http://github.com/flavio/jump). It's a great tool and quite easy to install too:

    $ gem install jump
    $ cp `gem contents jump | grep zsh` ~/.jump_shell_driver

and a line in your `~/.zshrc` to make the magic happen: `source ~/.jump_shell_driver`.

Further instructions (incl. Bash) and a tutorial is available on the project's [GitHub page](http://github.com/flavio/jump).
