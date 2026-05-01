---
title: Yoke - a drop-in, quick and dirty alternative to Sprockets
date: 2011-02-23 18:02:00
---

In local development, I tend to create separate pieces of JavaScript for every controller, model, view, etc. I loved the idea of Sprockets -- grab all these files and stitch them together. While it worked well for a while (on the command-line), I got fed up with how slow it runs, especially on Ruby under Cygwin.  
So, what to do? Node.js of course. Why? It's fast, it's super-easy to install and writing a script on top of it is a breeze. Meet Yoke:

```javascript
#!/usr/bin/env node

var fs = require("fs"),
  path = require("path"),
  options = {
    verbose: false,
    directories: ["."],
  };

var includeFollowing = false;
process.argv.slice(2).forEach(function (option) {
  if (option === "-v" || option === "--verbose") {
    options.verbose = true;
  } else if (option === "-I" || option === "--include") {
    includeFollowing = true;
  } else if (option.indexOf("-I") === 0) {
    options.directories.push(option.substring(2));
  } else if (includeFollowing) {
    options.directories.push(option);
    includeFollowing = false;
  }
});

function findOne(file, directories) {
  var resolved = null;
  directories.forEach(function (directory) {
    if (resolved) {
      return;
    }
    var target = path.join(directory, file.replace(/\.js$/, "") + ".js");
    if (fs.existsSync(target)) {
      resolved = target;
    }
  });
  return resolved;
}

function pad(level) {
  return Array(level * 2 + 1).join(" ");
}

function processOne(file, level) {
  var lines = fs.readFileSync(file, "utf8");
  level || (level = 0);
  if (options.verbose) {
    console.error(pad(level) + "> " + file + "\n");
  }
  lines = lines.replace(
    /^\s*\/\/=\s*require\s+(["<])([^">]+).$/gm,
    function (match, type, location) {
      var resolved = findOne(
        location,
        type === "<" ? options.directories : [path.dirname(file)],
      );
      if (resolved) {
        return processOne(resolved, level + 1);
      }
      throw new Error(
        "Cannot resolve require:\n\n    " + match + "\n\n in file " + file,
      );
    },
  );
  return lines;
}

process.stdout.write(processOne(process.argv.pop()));
```

To use, copy the script above on `$PATH` and then:

    yoke [-I path[ -I path]...] input.js > output.js

In most cases, you would just need to replace your existing `sprocketize` command with `yoke`. Both `<file>` and `"file"` requires are supported.
