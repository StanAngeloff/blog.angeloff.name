---
title:  'Cross-compiling BusyBox to run on the Intel Atom Z3745 inside an ASUS MeMO Pad (ME176C)'
date:   2015-01-03 13:30:00
layout: default
---

I recently acquired the very inexpensive [ASUS MeMO Pad (ME176C)][ME176C]. It's a [surprisingly great device][the-verge] with an excellent screen and, best of all, a powerful [Intel Atom Z3745][Z3745] inside. The tablet comes with Android 4.4 (KitKat), however I want to run Ubuntu LTS from a `chroot`. I soon discovered I needed to compile BusyBox from source in order to achieve this.

You should root your tablet following the [instructions on XDA Forums][how-to-root]. I strongly advise you grab the latest [RootZenPhone from the official page][RootZenFone]. I initially bricked the tablet using 1.4.6r, but had success with 1.4.6.8r. Make sure to back up all of your important information as you may have to factory reset in case the rooting fails.

### Prerequisites

You will need Ubuntu 14.04 LTS (Trusty). If you are running a different operating system the steps may still work, however you will need to tweak package names.

### Android NDK

In order to cross-compile BusyBox, we'll need the [Android NDK][android-ndk]. Grab whatever is the latest revision (<tt>10d</tt> at the time of writing) and make sure to pick the correct architecture for your computer. If you are downloading from a terminal, please familiarise yourself with the Terms & Conditions on the NDK page.

```bash
cd /tmp
wget http://dl.google.com/android/ndk/android-ndk-r10d-linux-x86_64.bin
chmod a+x android-ndk-*.bin
./android-ndk-*.bin
```

### BusyBox from source

Let's get started by cloning the BusyBox repisitory:

```bash
# If you don't have Git installed:
#
#     sudo apt-get install -y git-core

cd /tmp
git clone git://git.busybox.net/busybox.git
```

We'll need to check out a stable release. At the time of writing, I had success compiling 1.23.0:

```bash
cd /tmp/busybox
git checkout 1_23_0
```

With the Android NDK in place, we need to edit the default configuration file to set the correct paths and flags:

```bash
cd /tmp/busybox

# Export a shell variable for easy access to the Android NDK path:
export ANDROID_NDK_ROOT=$( echo -n /tmp/android-ndk-*/ )

# Configure the cross-compiler prefix used by BusyBox:
sed 's!^\(CONFIG_CROSS_COMPILER_PREFIX=\).*!\1"'$ANDROID_NDK_ROOT'toolchains/x86-4.8/prebuilt/linux-x86_64/bin/i686-linux-android-"!' -i configs/android_ndk_defconfig

# Configure the cross-compiler root:
sed 's!^\(CONFIG_SYSROOT=\).*!\1"'$ANDROID_NDK_ROOT'platforms/android-19/arch-x86"!' -i configs/android_ndk_defconfig

# Configure CFLAGS for the Intel Atom:
sed 's!^\(CONFIG_EXTRA_CFLAGS=\).*!\1"-DANDROID -D__ANDROID__ -DSK_RELEASE -march=atom -m32 -ffast-math -mfpmath=sse -ftree-loop-if-convert -fschedule-insns -fsched-pressure -O2"!' -i configs/android_ndk_defconfig
```

The file we modified needs to be copied so BusyBox can read it:

```bash
make android_ndk_defconfig
```

There are several issues when cross-compiling BusyBox. We need to turn options associated with them off to avoid compilation errors:

```bash
# If you don't have ncurses headers installed:
#
#     sudo apt-get install -y libncurses5-dev

make menuconfig
```

With the graphical menu on-screen, make sure the following options are configured as instructed:

- <font color="darkred">disable</font> `Coreutils ---> touch -> Add support for -h`
- <font color="green">enable</font> `Login/Password Management Utilities ---> Use internal crypt functions`
- <font color="darkred">disable</font> `Linux System Utilities ---> mdev`
- <font color="green">enable</font> `Linux System Utilities ---> mount`
- <font color="green">enable</font> `Linux System Utilities ---> umount`
- <font color="darkred">disable</font> `Networking Utilities ---> udhcp client (udhcpc)`

The default state of those options should be the inverse of what we need them configured at. As you turn an option on, additional ones may present themselves -- make sure to leave those untouched.

Tip: `<Esc><Esc>` gets you to the previous screen. `<Tab>` let's you highlight the Exit button.

Exit and save the configuration with the new options.

### Patching BusyBox

There are several compilation errors at this time should you attempt to run `make`.

#### mount and umount

We are in luck as there is a patch in [Tias Guns' repository][tias-guns]:

```bash
cd /tmp/busybox
wget https://raw.githubusercontent.com/tias/android-busybox-ndk/835af752d00bb025bc8857d92b3af9de7a902cbc/patches/003-mount-umount-fsck-df.patch
patch -N -p1 < 003-mount-umount-fsck-df.patch
```

#### GNUisms not available...

We are in luck again as there is a patch in [Tias Guns' repository][tias-guns]:

```bash
cd /tmp/busybox
wget https://raw.githubusercontent.com/tias/android-busybox-ndk/835af752d00bb025bc8857d92b3af9de7a902cbc/patches/012-mempcpy.patch
patch -N -p1 < 012-mempcpy.patch
```

### Let's build

All it should take now is:

```bash
make

# Let's verify it all went fine:
#
#     file busybox
#
# The output should be identical to:
#
#     busybox: ELF 32-bit LSB  executable, Intel 80386, version 1 (SYSV), dynamically linked (uses shared libs), stripped
```


  [ME176C]: http://www.asus.com/Tablets/ASUS_MeMO_Pad_7_ME176C/
  [the-verge]: https://www.youtube.com/watch?v=kPyVptxhJ9U
  [Z3745]: http://ark.intel.com/products/80270/Intel-Atom-Processor-Z3745-2M-Cache-up-to-1_86-GHz
  [how-to-root]: http://forum.xda-developers.com/showpost.php?p=55229933&postcount=22
  [RootZenFone]: http://23pin.logdown.com/posts/230216-root-rootzenfone-14r
  [android-ndk]: https://developer.android.com/tools/sdk/ndk/index.html#download
  [tias-guns]: https://github.com/tias/android-busybox-ndk


### Get BusyBox on the MeMO Pad

#### Prerequisites

In order to be able to copy the new `busybox` binary to the tablet, we need to enable USB debugging.

- Open _Settings_ > _About_ > _Software Information_
- Tap continuously on _Build number_ until you turn Developer mode on
- Re-open _Settings_ > _Developer options_
- Enable _USB debugging_

##### udev rules

Connect the MeMO Pad to your computer. You will get prompted to authorise the connection on the tablet -- accept after reviewing.

You may then discover that you haven't got permissions to access the tablet using `adb`. To verify the device is recognised:

```bash
# If you don't have adb installed:
#
#     sudo apt-get install -y android-tools-adb

adb kill-server
adb devices
```

If you see lots of question signs under the device name (e.g., `????????`), we need to do one last thing -- configure the correct permissions when hot-plugging. With the tablet still connected to the computer:

```bash
lsusb

# Review the list of attached devices and locate the ASUS MeMO Pad.
# Copy the string after "ID " and paste it in place of the `$REPLACE_ME` variable below.
# The line should look something like:
#
#     export MEMOPAD_ID="0b05:5507"

export MEMOPAD_ID="$REPLACE_ME"

echo -e '# ASUS MeMO Pad 7 (ME176C):\nSUBSYSTEM=="usb", ATTRS{idVendor}=="'${MEMOPAD_ID%:*}'", ATTRS{idProduct}=="'${MEMOPAD_ID#*:}'", MODE="0664", GROUP="plugdev"' | sudo tee -a /etc/udev/rules.d/60-android.rules

sudo udevadm control --reload-rules
sudo service udev restart
```

Unplug and plug the MeMO Pad. Verify the question signs have disappeared and the device is recognised correctly.

#### Push BusyBox to the MeMO Pad

```bash
cd /tmp/busybox
adb push ./busybox /sdcard/
```

The binary is on the tablet now, but it requires executable permissions. Use `adb` to start a shell:

```bash
# On your computer:
adb shell

# You will find yourself logged as a regular user on the MeMO Pad.
# To be able to set executable permissions, you need to gain root access:
su

# Approve the request in SuperSU.

# Copy the binary to a new location where we can make it executable.
#
# NOTE: mv does not work and will report 'Cross-device link' failure, hence we use cp instead:
cp /sdcard/busybox /data/local/busybox-1.23.0

# Modify the binary permissions to make it executable:
chmod 555 /data/local/busybox-1.23.0

exit

# We are now back logged as a regular user on the MeMO Pad
exit

# On your computer let's verify it all went fine:
adb shell /data/local/busybox-1.23.0 | head -n1

# The output should be identical to:
#
#     BusyBox v1.23.0 (2015-01-03 12:55:15 UTC) multi-call binary.
```

Happy hacking!
