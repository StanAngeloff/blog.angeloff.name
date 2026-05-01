---
title: Extract changed files from Git and prepare a deployment (Bash script)
date: 2010-11-05 22:34:00
---

So, you have moved over to Git. Well done! You have big plans for your future deployment process -- it is going to be automated and thoroughly tested... but you still have to support your existing legacy products. If you are like me, you most likely started with simple FTP copies (oh, this takes me back). I moved over from SVN and TortoiseSVN was my primary choice for a desktop client. After each deployment, I would create an SVN tag so next time I can get a list of all changed files. In TortoiseSVN it's as simple as selecting two revisions while holding down the Shift key and doing a _Compare Revisions_. From the new window you can export all changed files to a new location. If your project in 100MB in size, you only ever have to deal with modified files on subsequent updates. Simple (or so I thought back then).

Moving over to Git has thought me many things. I used to love [my Cygwin console](http://blog.angeloff.name/post/1004704485/alternative-cygwin-terminal-shell) even before the switch and I've learnt to do pretty much every daily task in it. But the one thing I really needed and didn't have with Git was an option to copy modified files from the working tree between two commits. It wasn't available on the command line, nor in any of the [clients](http://cola.tuxfamily.org/) [I've tried](http://sourceforge.net/projects/gitextensions/) [so far](http://code.google.com/p/tortoisegit/). So having been playing with shell scripts for a few weeks, I decided to put one together which would do just that:

```bash
#!/bin/bash

BOLD="\033[1m"
_BOLD="\033[22m"
RED="\033[31m"
YELLOW="\033[33m"
GREEN="\033[32m"
RESET="\033[39m"

range=$1
if [ -z "$range" ]; then
  echo -e "${BOLD}${RED}You must specify a '<since>..<until>' argument.${RESET}${_BOLD}"
  exit 1
fi

if [ -z "$2" ]; then
  target="$( pwd )/.deployments"
else
  target=$( echo "$2" | sed -e 's#/\+$##g' )
fi

if [ -d "$target" ]; then
  echo -ne "Do you wish to remove '$target' first? [Y/n] "
  read prompt
  if [ -z "$prompt" ] || [ "$prompt" == "Y" ] || [ "$prompt" == "y" ]; then
    echo -e "  ${YELLOW}Purging '$target'...${RESET}"
    if [ -d "$target" ]; then
      rm -Rf "$target"
    fi
    echo -e "  ${GREEN}Done.${RESET}"
  fi
fi

mkdir -p "$target"

LOG=$( git whatchanged -m --oneline "$range" | awk '{
  if ($1 ~ /^:/) {
    print $5 ":" $6
  }
}' | tac )

length=$( echo "$LOG" | wc -l )
manual=''

index=0
for command in $LOG; do
  operation=${command:0:1}
  filepath=${command:2}
  case $operation in
    "A" | "M")
      if [ -f "$filepath" ]; then
        destination=$( dirname "$target/$filepath" )
        filename=$( basename "$filepath" )
        mkdir -p "$destination"
        cp -f "$filepath" "$target/$filepath"
      fi
    ;;
    "D")
      manual="$manual\n$filepath"
    ;;
    *)
    echo -e "${BOLD}${RED}Unknown operation $operation on file $filepath.${RESET}${_BOLD}"
    exit 4
    ;;
  esac
  let "index++"
  echo -ne "\r${YELLOW}Processing ${length} files...${RESET} $( echo "scale=2; ( $index / $length ) * 100.00" | bc )%"
done
echo

if [ ! -z "$manual" ]; then
  echo $( echo -e "$manual" | sed -e 's/^\s\+//g' | sort -u ) > "$target/.delete"
  echo -e "[WARN] Please manually delete the files listed in '${BOLD}.delete${_BOLD}'"
fi

echo -e "${GREEN}Done.${RESET}"
```

Paste the above in a script on your `$PATH`. Using `gitk` or another tool find the first commit you want to include in your extract. Invoke the script as below:

```shellsession
$ git-extract initial_hash_of_first_commit_to_include..HEAD
Do you wish to remove '.deployments' first? [Y/n]
  Purging '.deployments'...
  Done.
Processing 10 files... 100.00%
Done.
```

A new directory `.deployments` will be created with all files that have changed in the given commits range. If files were deleted, a `.delete` file will be generated and you have to handle these manually.

I haven't found a better solution yet, but I am sure there is a _Git way_ to do just what I am after. This script is a hack to get the job done.

Leave a comment if you found this post useful. Fork [the Gist](https://gist.github.com/664680) and modify it to suit your needs.
