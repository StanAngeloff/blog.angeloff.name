---
title:  'Day X: Giving up on Firefox OS'
date:   2014-10-07 19:45:00
layout: post
---

### The Experiment

I recently decided to give Firefox OS a try and ordered a [Flame][flame] developer reference phone. This will be an attempt at a blog series capturing my first 30 days of usage. I will do my best to blog as frequently as I can, usually once or twice a week as I get more accustomed to the new platform.

  [flame]: https://developer.mozilla.org/en-US/Firefox_OS/Developer_phone_guide/Flame

### The Experience (or lack thereof)

Going back to the end of August, I was pretty excited to be getting an upgrade from an old and dying Android-based phone to the Flame running Firefox OS, the fresh and exciting OS. My enthusiasm was cooled down fairly quickly once I discovered the OS is still pretty much unfinished and had many bugs. Shortly thereafter a got a Twitter mention saying I should be trailing Firefox OS 2.x as it will offer a much better experience. What did I have to lose, I obviously wasn't happy with the stock 1.3 version?

So one day I got my USB cable, flashed the phone with Firefox OS 2.1 and started over. No apps, no contacts, no accounts... a clean slate.

#### Bugs, bugs, bugs

I was hoping Firefox OS would be pretty stable after reaching version 2.x when it comes to be basics. Things like making or picking up a phone call surely must be tested with each code change introduced? Automated tests, CI, etc.? I was unpleasantly surprised to find out that this is not the case. The dialer, for example, broke fairly frequently making it impossible to make a phone call. To this day I can't answer incoming calls as well, the slider to pick up does not work. The latter one has persisted across multiple OS updates.

Is it the case that there are automated tests and bugs have been caught and ignored? If so, why are such changes allowed to be accepted to the nightlies [1] before being finished?

Another annoying issue is the low output volume you get when you plug-in earphones. It will just not go any higher than 10-20% no matter what the UI says. As you unplug your earphones the phone then goes into _party-mode_ with the built-in speaker tearing itself at 100%.

Then there is the network time bug. The phone never correctly synchronises its clock with the network. On Android, connected to the same network, resetting the date & time and then syncing from the network always works. On Firefox OS you get a random date, usually within the past 3-4 days, and a random time. Needless to say this wreaks havoc in pretty much all apps, from the Call Log, to Messaging and E-mail. Just as an example, a missed call from 5 minutes ago may be shown several swipes down with calls from yesterday.

The list goes on and the above is just a fraction of the really frustrating ones. The OS feels like an experiment that is largely unfinished.

<small>[1] I get that nightlies are meant for testing, however introducing unfinished changes seems like a bad practise. Firefox recently introduced [Electrolysis], a big change _to run web content in a separate process from Firefox itself_. This was turned off by default and is a good model to follow &ndash; if an update is unfinished or breaks things, hide it behind a flag.</small>

  [Electrolysis]: https://wiki.mozilla.org/Electrolysis

#### Battery

Power consumption on the phone is what you would expect it to be and the battery can last you for a good 24 hours with low to moderate usage. That is by no means great, however at this price range is to be expected.

There is a nasty bug, though, which sometimes prevents the phone from charging. I thought charging would have been handled at the hardware level, however the OS appears to have control over this. A restart usually helps.
If you are using a non-standard charger, the phone would sometimes get stuck at the boot screen and begin to vibrate. This doesn't happen every time and a restart usually helps.

#### Marketplace

If I have to sum it up in one word: poor. Apps are rarely polished and you get wrappers around a website's mobile version. A good example is Soundcloud which is just m.soundcloud.com behind a pretty icon. As you switch away from the app, the music stops. So yeah, no Soundcloud on the background whilst composing your super important e-mails.

#### Core Applications

In the month that I have been using 2.x Calendar never did work. E-Mail still can't open or forward attachments. Firefox, the built in browser, has gotten somehow worse. I still haven't figured out how to use tabs.

There is a handy 'Usage' app which is supposed to track your mobile data plan usage. For me it rarely works and reports there is no SIM inserted the majority of the time.

For whatever reason you now also get a global 'Search the web' box at the top which is a shortcut to Firefox. It picks up on the app and will change appearance. You would be fooled to think it's actually part of the app itself, but it isn't. I can't remember how many times I've tried to look up contacts in the wrong search box.

#### Developers, developers, developers

It's a shame the platform is so unappealing. I was not once tempted to fire up Vim and work on an app exclusively for Firefox OS. This is part of the problem the platform has &ndash; HTML5 apps are good enough and you don't go the extra mile to add polish for Firefox OS.

### The Conclusion

I have made up my mind. It pains me to say I will be going back to Android. Firefox OS is not ready for the end-user and it's not appealing to me as a developer. It has it's place in emerging markets, but once you compare it to anything else it doesn't stand a chance.

The logical question to ask is then _can you fix the ugly and the broken_? You most probably can but it will take discipline.

- Don't ship broken code globally, never, not even in nightlies. If you are asking developers to create apps for your platform, they must have confidence in how reliable it is.
- If you introduced an issue by accident, fix it as quickly as you can. Bugzilla is filled with cases of Firefox browser bugs being open for 5+ years. Is history going to repeat itself and will Firefox OS suffer from the same fate?
- Polish, polish, polish. When I pick up a phone with Firefox OS, I want it to look finished. I don't want my notifications screen to be filled with double-escaped HTML messages. Yes, '&lt;span&gt;'s actually appear in notifications and that issue hasn't been fixed in weeks.

I will keep my Flame around and will likely come back to revisit Firefox OS in a couple of months. Perhaps then it will be a more mature platform with less teething problems.
