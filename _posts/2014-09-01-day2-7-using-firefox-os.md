---
title:  'Day 2-7: Using Firefox OS'
date:   2014-09-01 20:30:00
layout: post
---

### The Experiment

I recently decided to give Firefox OS a try and ordered a [Flame][flame] developer reference phone. This will be an attempt at a blog series capturing my first 30 days of usage. I will do my best to blog as frequently as I can, usually once or twice a week as I get more accustomed to the new platform.

  [flame]: https://developer.mozilla.org/en-US/Firefox_OS/Developer_phone_guide/Flame

### The Bad & Ugly

In the last week of usage, there have been more bad things than good. This post may come across as negative, but in reality I am satisfied with the phone and OS at its early stage of development.

#### Multitasking

You can switch between apps by holding the 'Home' button. The phone will vibrate (cannot be turned off) before displaying apps as 'cards'.

<a href="{{ site.base | xml_escape }}/assets/images/2014/09/01/2014-09-01-19-55-05.png" target="_blank"><img src="{{ site.base | xml_escape }}/assets/images/2014/09/01/2014-09-01-19-55-05.png" alt="The multitasking interface in Firefox OS" style="max-width: 66%; max-height: 360px; border: 1px solid rgba(0, 0, 0, 0.25);"></a>

From this interface you can close an app either by tapping on the (x) icon or by flicking the thumbnail from the bottom. Both methods will work only half the time. When it doesn't work, you open an app from the list at random instead.

#### E-Mail

Let's start with the most frequently used app... or what used to be the most frequently used app. E-mail is bad at mail. I have noticed a lot of issues around scrolling the contents of an e-mail. It gets so bad, you can't read your messages after the first paragraph. I still haven't figured out if attachments are supported at all, there is no way to open them.

Notifications. They pile up on your lock screen if you have multiple accounts and disappear at once when you open the app. They will disappear even if you didn't look at the account with new messages in it. What is particularly annoying is after you receive a new notification, if you archive or delete the message on your computer, the notification on the phone will persist. So, yeah...

#### Call log

This should be called something else as it doesn't do what the title suggests. Notifications for missed calls show up on the lock screen, but then are nowhere to be found in the call log. I have had numerous follow-ups from people asking me why I didn't return their call... what call?! Outgoing calls are rarely logged as well.

#### Browser

Firefox, of course. If you are looking for customisations, you won't find them, though:

<a href="{{ site.base | xml_escape }}/assets/images/2014/09/01/2014-09-01-19-17-57.png" target="_blank"><img src="{{ site.base | xml_escape }}/assets/images/2014/09/01/2014-09-01-19-17-57.png" alt="The Settings page in Firefox browser" style="max-width: 66%; max-height: 360px; border: 1px solid rgba(0, 0, 0, 0.25);"></a>

You will receive mobile-optimised versions of websites more often than not. In Firefox, unlike Chrome for Android, you cannot spoof the user-agent to request a desktop version instead. You are stuck with whatever the author has chosen to display for mobile devices.

Sharing a link is pre-configured to open up E-mail as if other options do not exist. In doing so, the E-mail app will sometimes get very confused and report 'you are not set up to receive e-mail'.

On heavier pages Firefox is **slow**. As you are trying to zoom in a region, the browser will decide to do a reflow. You end up on a random region instead. Opening links, scrolling, etc. generally feels clunky instead of smooth.

Then there's the overly sensitive issue which makes you navigate to pages just by flicking through an article.

#### Twitter

This app is basically Twitter for Mobile. You'll get the same experience if you spoof your Chrome user-agent to a mobile device or visit [twitter.com](https://twitter.com) in Safari, etc. The only difference is the app supports web activities:

> We’ve also implemented support for a feature unique to Firefox OS: Web Activities. This lets you tweet photos directly out of any app that also supports web activities such as the built-in photos app.
>
> <div align="right"><a href="https://blog.twitter.com/2013/twitter-for-firefox-os">source</a></div>

Twitter on Firefox OS is usable, but definitely lacks behind its iOS and Android counterparts. No notifications for mentions, direct messages, etc.

#### YouTube

Just as above, YouTube is nothing more than a wrapper around the mobile version of [youtube.com](http://youtube.com)... but actually worse. The app displays a small area at the bottom which is meant to toggle navigation controls for apps which don't behave correctly.

<a href="{{ site.base | xml_escape }}/assets/images/2014/09/01/2014-09-01-19-46-31.png" target="_blank"><img src="{{ site.base | xml_escape }}/assets/images/2014/09/01/2014-09-01-19-46-31.png" alt="YouTube app showing a 'black' area at the bottom to toggle implicit navigation controls" style="max-width: 66%; max-height: 360px; border: 1px solid rgba(0, 0, 0, 0.25);"></a> <a href="{{ site.base | xml_escape }}/assets/images/2014/09/01/2014-09-01-19-48-17.png" target="_blank"><img src="{{ site.base | xml_escape }}/assets/images/2014/09/01/2014-09-01-19-48-17.png" alt="YouTube app with expanded implicit navigation controls" style="max-width: 66%; max-height: 360px; border: 1px solid rgba(0, 0, 0, 0.25);"></a>

### The Rest

Next time I'll be reviewing marketplace apps and sharing more thoughts on the young Firefox OS.
