---
title: MinTTY at your fingertips
date: 2010-09-11 23:38:00
---

How often do you need to get in and out of your terminal as quickly as possible? I use [Cygwin](http://www.cygwin.com) for Linux emulation under Windows and [MinTTY](http://code.google.com/p/mintty/) as my terminal of choice. MinTTY is great as it supports semi-transparent backgrounds and fullscreen mode (and lots more, be sure to check out the homepage). It is so tiny I don't mind having a copy of it running at all times, however it bugs me when I see its icon on the taskbar. The following is an [AutoHotkey](http://www.autohotkey.com/) script which launches a new MinTTY window, if one is not started already, sets it up in fullscreen mode and lets you do your work until you press **Win+C** again to send it to the background and remove all traces of it on your desktop.

```autohotkey
; AutoHotkey script, download from:
;   http://www.autohotkey.com/
; NOTE: Save this file with Windows line endings i.e. \r\n
;

cmd_line  := "C:\bin\cygwin\bin\mintty.exe /bin/zsh --login"
wnd_class := "ahk_class mintty"

#c::

DetectHiddenWindows, on

Maximize()
{
	global
	WinShow
	WinActivate
	WinGetPos, X, Y, Width, Height
	SysGet, FullScreenWidth, 78
	SysGet, FullScreenHeight, 79
	If (X <> 0) or (Y <> 0) or (Width <> FullScreenWidth) or (Height <> FullScreenHeight)
	{
		Send !{Enter}
	}
}

If WinExist(wnd_class)
{
	IfWinActive
	{
		WinMinimize
		WinHide
	}
	Else
	{
		Maximize()
	}
}
Else
{
	Run % cmd_line, , Hide
	WinWait % wnd_class, , 5
	If ErrorLevel
	{
		MsgBox, WinWait timed out. Please try pressing Win+C again.
	}
	Else
	{
		Maximize()
	}
}
```

If you haven't used AutoHotkey before make sure you download a copy. You most definitely will find some use for it.

As for the script, it is possible to tweak it so the window is only taking half the screen and slides in from the top _(ah, Mac envy)_. I leave that for you to figure out.
