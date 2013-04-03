---
title:  Stopping Ubuntu services on startup
date:   2013-04-03 20:20:00
layout: default
---

I have been using Ubuntu since 10.04. I am running 13.04 at present and have undergone numerous distribution upgrades and not a single re-install. As a result, there is quite a lot of cruft accumulated by now. By cruft I mean packages I have had to install in order to complete a particular task and never got around to cleaning them up afterwards. For some odd reason, I still keep the projects that depend on them around so uninstalling is not an option.

A fair share of those packages also install services. For example, `[sudo] apt-get install -y apache2` sets up a web server which is started on every boot. MySQL, PostgreSQL, MongoDB, etc. all come with startup services which are enabled and run on boot by default (something you would want on a server).
As time went on, boot times had increased and the overall performance of the PC slowed down considerably. You can see how many processes are running at any given time on your machine by using `ps -e | wc -l`. Most of those would be system process (init, session handling, tty, etc.), however many are also started on boot and you most likely don't need them running all the time.

Ubuntu uses [Upstart][upstart] to start tasks and services during boot... but that is not all. There are packages that use the old [System-V][system-v] shell initialisation scripts in `/etc/init.d`.

After searching for a while and getting nowhere, I reverted to reading the Upstart documentation in order to find the best way to stop a service.  It turns out there is a [quick way][manual-stanza] to keep the job files around (in case you want to start something manually after logging in), but prevent the service from running at boot.

I came up with a combined script which deals with both SysV-style scripts as well as Upstart jobs. The script will attempt to disable a service while preserving the initialisation scripts so you can still `[sudo] service name start` when you need it.

My results were more than impressive. On a system with an [SSD][ssd] disk my boot times improved noticeably which was unexpected. I had some of the most common packages for a developer installed so I used:

```shell
$ service-disable.sh apache2 lxc lxc-net memcached mongod mongodb mysql palm-novacomd postfix postgresql qemu-kvm
```

To find out what services you have on your system, use the following command:

```shell
$ sudo find /etc/init /etc/init.d \! -iname '*.override' \! -name '.*' | \
  xargs -l basename | \
  sed -e 's/\.conf$//' | \
  sort -u
```

Onto the script itself:

<script src="http://gist.github.com/4434953.js?file=service-disable.sh"></script>

Download using the [raw][raw-script] link, `chmod +x service-disable.sh` and put somewhere on your `$PATH`. `/usr/local/bin/` is usually the right place.

**NOTE**: Be extremely careful what services you disable. Make sure you are absolutely certain the service being stopped is not essential for the operation of your PC.

Let me know if your boot times improve.
Feel free to post a (common) service in the comments below if I have missed it in the post itself.


  [upstart]: http://upstart.ubuntu.com/
  [manual-stanza]: http://upstart.ubuntu.com/cookbook/#manual
  [system-v]: https://en.wikipedia.org/wiki/UNIX_System_V
  [ssd]: http://en.wikipedia.org/wiki/Solid-state_drive
  [raw-script]: https://gist.github.com/StanAngeloff/4434953/raw/service-disable.sh
