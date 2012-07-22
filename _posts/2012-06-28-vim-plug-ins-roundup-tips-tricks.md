---
title:     Vim plug-ins roundup, tips & tricks
date:      2012-06-28 23:30:00
layout:    default
permalink: /post/26091281290/vim-plug-ins-roundup-tips-tricks/index.html
---

I am fairly new to Vim. [When I switched editors][switch] and moved to Vim completely (about an year ago), I looked around for plug-ins and scripts other Users were using. I knew I was going to improve my text editing speed just by using the core editor itself, however I was more keen on setting up my very own personal environment.

What helped me a great deal were all those <nobr>'[Vim plug-ins you MUST have][must-have]'</nobr>-style articles. After a while, however, they got pretty boring as most were covering the same plug-ins.

As I started using Vim for everything (after an initial period of pain and suffering), I kept expanding my [.vimrc][vimrc] and soon found it had grown to contain a lot of useful and rare gems. My intentions are by sharing these here they would also help you be more productive in your day-to-day tasks in Vim.

  [switch]: https://github.com/StanAngeloff/komodo-html-toolkit/issues/25#issuecomment-1924790
  [must-have]: https://google.com/search?q=vim+plug-ins+must+have
  [vimrc]: https://github.com/StanAngeloff/dotfiles/blob/master/.vimrc#files

Plug-ins
--------

### **[godlygeek/tabular](https://github.com/godlygeek/tabular)**

> Vim script for text filtering and alignment.

I like my code well indented and aligned... but it is a pain to keep it organised by hand. Tabular does this instead of you. It is extremely helpful and can deal with any coding style preference you may have. Take, for example, this input:

    <?php

    $hello = 'world';
    $how = 'are you';
    $when = 'today';

For quick access to Tabular, set up key bindings like so to trigger indentation on `=`:

    nnoremap <leader>a= :Tabularize /=<CR>

Pressing `\a` (where `\` is the leader key) yields:

    <?php

    $hello = 'world';
    $how   = 'are you';
    $when  = 'today';

There, all nice and tidy.

### **[mattn/zencoding-vim](https://github.com/mattn/zencoding-vim)**

> Zen-Coding for Vim.

This one is a must-have for HTML folks. Take this input:

    ul>li*5>a>span

Re-map Zen Coding to suit your needs:

    let g:user_zen_leader_key = '<leader>z'

and voila!

    <ul>
      <li><a href=""><span></span></a></li>
      <li><a href=""><span></span></a></li>
      <li><a href=""><span></span></a></li>
      <li><a href=""><span></span></a></li>
      <li><a href=""><span></span></a></li>
    </ul>

### **[othree/html5.vim](https://github.com/othree/html5.vim)**

> HTML5 omni-complete and syntax.

HTML is dead, long live HTML5! This plug-in provides syntax highlighting for the new HTML5 tags which are not available out-of-the-box in a default Vim installation.

It also plays nicely with other plug-ins, such as [php.vim][php].

  [php]: https://github.com/StanAngeloff/php.vim

### **[pangloss/vim-javascript](https://github.com/pangloss/vim-javascript)**

> Vastly improved JavaScript indentation.

If you do a lot of JavaScript development, you have probably been driven to despair on each new line. Vim's default JavaScript syntax file is not very smart when it comes to indentation and it can sometimes be utterly stupid.  This plug-in puts a stop to it all.

### **[samsonw/vim-task](https://github.com/samsonw/vim-task)**

> Basically, this is the TextMate Tasks Bundle port for Vim.

I like keeping NOTEs and TODOs in my projects. This is a very simple plug-in which provides syntax highlighting for `*.tasks` files and a couple of handy key bindings to deal with resolving items.

<a href="http://blog.samsonis.me/wp-content/uploads/2010/09/vim-task.png"><img title="Vim-Task with Monaco font" src="http://blog.samsonis.me/wp-content/uploads/2010/09/vim-task.png" alt="Vim-Task with Monaco font" width="300"></a>

### **[sjl/gundo.vim](https://github.com/sjl/gundo.vim)**

> Vim plug-in to visualize your Vim undo tree.

Undone your changes, tried something different and then realised you want to get your old code back? Gundo comes to the rescue giving you a tree of all edits and points of interest in the history.

<a href="http://www.flickr.com/photos/sjl7678/5093114605/" title="gundo by stevelosh, on Flickr"><img src="http://farm5.static.flickr.com/4113/5093114605_ebc46d6494.jpg" width="300" alt="gundo" /></a>

### **[session.vim--Odding](https://github.com/vim-scripts/session.vim--Odding)**

> Extended session management for Vim.

Restart Vim and avoid losing your editing session. This plug-in saves your Vim sessions and restores them so it is like you never even left Vim. The default options are somewhat intrusive, but it doesn't take too much to customise the plug-in to behave:

    " Don't prompt on Vim close if we want to save the session.
    let g:session_autosave=0
    " Don't auto-load saved sessions on Vim start.
    let g:session_autoload=0
    " Re-map for easy session saving/restore.
    noremap <leader>ss :SaveSession user<CR>
    noremap <leader>sr :OpenSession user<CR>

Whenever you feel you need to close Vim, but want to be able to get back your opened buffers, use `\ss` (where `\` is the leader key) before `:q`uitting.  Next time you start Vim, use `\sr` to restore.

Note you wouldn't be able to save options like plug-ins state, e.g., opened directories in NERDTree.

### **[kien/ctrlp.vim](https://github.com/kien/ctrlp.vim)**

> Fuzzy file, buffer, mru, tag, etc finder.

When I first got to Vim, I tried [Command-T][command-t]. I loved it... but having Ruby support available in Vim was proving an issue on some Windows machines.  You also need to compile a binary which further meant the plug-in cannot be used out-of-the-box in a new Vim installation.

CtrlP is a great alternative with a slew of new features to offer. You still get a fuzzy matching file finder, but you can also search for tags, recent buffers, etc.

I don't like having plug-ins register their key bindings without my say, so I turn off the defaults for CtrlP and create personalised mappings:

    " Don't use <C-P>, leave it available for something else.
    let g:ctrlp_map=''

    nnoremap <silent> <leader>o :<C-U>CtrlPCurWD<CR>
    nnoremap <silent> <leader>b :<C-U>CtrlPBufTag<CR>

Use `\o` (where `\` is the leader key) to fuzzy match and open a file and `\b` to fuzzy match and move to a tag in the current buffer (quickly navigate to a method, etc.)

  [command-t]: http://www.vim.org/scripts/script.php?script_id=3025

### **[thinca/vim-visualstar](https://github.com/thinca/vim-visualstar)**

> star for Visual-mode.

The star `*` is a very powerful key in Vim. You can quickly look for all occurrences of the word under the cursor, but it is not always a word you'd be looking for. This plug-in extends the star in visual mode so it looks for all occurrences of the entire selected text, taking care of escaping any special characters or whitespace that may have been selected.

IMHO this is how Vim's `*` should work by default in visual mode.

### **[hail2u/vim-css3-syntax](https://github.com/hail2u/vim-css3-syntax)**

> Add CSS3 syntax support to vim's built-in `syntax/css.vim`.

This plug-in provides syntax highlighting for the new CSS3 properties. It is a bit trickier to set it up so it works for HTML and Sass buffers, but you only have to do it once anyway.

### **[jesseschalken/list-text-object](https://github.com/jesseschalken/list-text-object)**

> A Vim script to provide text objects for items in lists like ( a, b, c ), { a; b; c; } etc.

Lastly, I came across this plug-in several weeks ago and have been using it on a daily basis ever since. It deals with text objects for lists, e.g.:

    <?php

    print implode(', ', ['Hello', 'World', 'How are' <|>. ' you?']);

Given the cursor position is defined by `<|>` above, pressing `vi,` will select (in visual mode):

    'How are' <|>. ' you?'

This is a great and quick way to change function arguments, list values, etc.

Tips & Tricks
-------------

### **Keep Your Focus**

One of the greatest strengths of Vim is having your hands rest comfortably on the home row whilst you are editing away. It bugged me I can't do the same with my screen, i.e., focus my attention on a given area and have everything I am working on flow in that particular line of screen. You can achieve this in Vim by setting the `scrolloff` option to a relatively big value:

    set scrolloff=120  " Total LoC visible on screen divided by 2 or higher.

It takes some getting used to, but eventually (hopefully) you will find there is less strain on your eyes.

### **Relative Line Numbers**

I have always found this particular 'feature' of Vim to be extremely annoying.  That is until I decided to try and live with it for at least a week. Coupled with the technique above, the editor becomes static and all that ever changes is the buffer itself. You can also much more easily navigate to a particular line since you know how many lines away it happens to be.

    set rnu  " Show relative line numbers.

### **Long Lines Slow Down Vim**

It has happened to all of us. You accidentally open a minified JavaScript file, Vim crawls to a complete halt and `<C-C>` cannot get you control of the editor back. This usually happens because Vim is having trouble syntax highlighting long lines. By setting a limit on the characters Vim will highlight per line at most, you can avoid situations like the above.

    set synmaxcol=512

### **Dreadful 'Ex' mode**

`Q` must be one of the most useless default key bindings in Vim.  I have yet to hear someone making extensive use of 'Ex' mode. It is much more efficient having `Q` save and quit the current buffer (and you would also never have to type `visual` again):

    nnoremap <silent> Q ZZ

### **Quick Indentation Settings**

Very often files open with the wrong indentation settings. 2, 4 and 8 are the most common setting for spaces per indent:

    " Key bindings for adjusting the tab/shift width.
    nnoremap <leader>w2 :setlocal tabstop=2<CR>:setlocal shiftwidth=2<CR>
    nnoremap <leader>w4 :setlocal tabstop=4<CR>:setlocal shiftwidth=4<CR>
    nnoremap <leader>w8 :setlocal tabstop=8<CR>:setlocal shiftwidth=8<CR>

Final Words
-----------

Leave a comment with your favourite, not-so-popular Vim plug-in or script below. Share this article with friends and on Twitter. I hope it has helped you make your Vim a little bit nicer to work from.
