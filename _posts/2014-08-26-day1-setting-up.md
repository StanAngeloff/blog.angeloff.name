---
title:  'Day 1: Setting Up (Firefox OS series)'
date:   2014-08-26 20:30:00
layout: default
---

### The Experiment

I recently decided to give Firefox OS a try and ordered a [Flame][flame] developer reference phone. This will be an attempt at a blog series capturing my first 30 days of usage. I will do my best to blog as frequently as I can, usually once or twice a week as I get more accustomed to the new platform.

  [flame]: https://developer.mozilla.org/en-US/Firefox_OS/Developer_phone_guide/Flame

### Mobile Data, voice mail, etc.

I started playing with the phone and was surprised to find it had managed to auto-configure mobile data (APN access), voice mail, MMS, etc. I am guessing this is largely dependant on the mobile carrier, but I am glad Firefox OS picked up on those. In the past, when dealing with Android, I've had to go through long Customer Support calls to receive the correct settings for my device as text messages.

### E-Mail

The very first app I launched was E-Mail. Unlike Android, Firefox OS does not have a notion of system-wide accounts. Setting up mailboxes is, therefore, specific to the Mail app.

<a href="{{ site.base | xml_escape }}/assets/images/2014/08/26/2014-08-27-19-13-28.png" target="_blank"><img src="{{ site.base | xml_escape }}/assets/images/2014/08/26/2014-08-27-19-13-28.png" alt="'New Account' screen in Mail" style="max-width: 66%; max-height: 360px; border: 1px solid rgba(0, 0, 0, 0.25);"></a>

I use [Google Apps for Business][apps-for-business] with [two-factor authentication][twofactor] and was curious if the app will pick up on that. I entered my work e-mail, my regular password and after a little while was prompted to use an 'application-specific password'. I created one in my Google security profile and Mail was then able to fully set up the account, incl. IMAP and SMTP over SSL/TLS.

Using Mail has been a bit of a pain. There is no easy way to archive e-mails. I'm still unsure how message deletion is handled, are they sent to the Bin? Drafts are stored locally and if you wish to continue writing on a different device, your best bet is to e-mail the draft to yourself. Handling multiple accounts is a pain and switching between them is 4 taps away. Gmail accounts are set up using IMAP and as such you will get notifications of new messages with a delay (poll interval configurable, no push notifications). I haven't figured out how to open attachments yet.

Overall, using Mail on Firefox OS feels like a step backwards... a big one at that.

  [twofactor]: https://www.google.com/landing/2step/
  [apps-for-business]: http://www.google.com/enterprise/apps/business/

### Calendar

As before, setting up accounts is specific to the app. When adding calendars from Google, you'll be sent to the Google profile log in page where you'll have to enter your full e-mail address and password. If using two-factor authentication, you'll have to enter the temporary PIN as well. This is different from setting up accounts on E-Mail where application-specific passwords are required.

<a href="{{ site.base | xml_escape }}/assets/images/2014/08/26/2014-08-27-19-32-25.png" target="_blank"><img src="{{ site.base | xml_escape }}/assets/images/2014/08/26/2014-08-27-19-32-25.png" alt="The default view in Calendar" style="max-width: 66%; max-height: 360px; border: 1px solid rgba(0, 0, 0, 0.25);"></a>

The default month view doesn't leave a lot of space for any events to be shown at the bottom. There are no animations, transitions or any other niceties. For example, in week view swiping from any edge will move a week forward/backward. The new events replace old ones and sometimes it's difficult to tell if anything changed. In day view the unnecessary big font size cuts event titles rather short and makes landscape view preferred... which does not work.

I rarely use the calendar on my phone and I have a feeling I'll be using less of it in the future.

### Contacts

This should come as no surprise, importing contacts is app-specific. You must go through the process of logging into your Google profile once again. Furthermore, I couldn't find an option to sync with Google so importing is a one-off thing. Yes, it feels a lot like owning an ancient Nokia phone and importing from SIM.

### Summary

The experience hasn't been great so far and the stock apps are disappointing. However, given we are talking about Firefox OS 1.4, it is too early to judge. The platform is open so anyone can contribute and improve.

Next time I'll be setting up Twitter and apps I use frequently.
