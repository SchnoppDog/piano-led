# Updates

## Version 3.2.1
**Release Date: 09.01.2022**
Greetings! This is a update to this project and a notice on why this project hasn't been updated in quite a while. But first I get to the little changes I made.

### Added
You can again turn on the piano and light up the color in its base color when no client is connected to the websites GUI. This was a major problem for me, because sometimes I wanted just the led to light up when I play without connecting my phone or pc to the website.

You are also able to connect to the websites GUI and change different key-colors etc. when your piano is turned off. All features like a new color, freeze-mode or piano-live play will be enabled at the time you power on your piano.

### Bugfixes

- Fixed a bug where the app crashed when a client connected multiple times when the piano is powered off and turned back on again.
- Fixed a bug where the app crashed when a client connected to the website and the piano was not connected.

### Why this porject did not receive any Updates
Now I want to talk about why this project didn't receive any updates until now and might not be updated in the future aswell. First I want to talk about the beginning of this project. It was a mere idea of a simple guy (me) who watched pianists on YouTube which had this *cool* and *amazing* feature on their pianos which light up their keys when they were playing the piano. With me in my JavaScript learning phase wanted to get this done too. So I made a plan how I could accomplish this. What started out as a simple idea has been turned out as a nice project I really do appreciate to have done. It has many features like changing the key and background-color, "freezing" keys for a selected time, creating random colors and display a live play on the website. This is way more of what I could have imagined at the beginning. I also worked on some features which, unfortunately, will never be published since they do not work as expected. Those features are i.e. when you press a key and let it go that the color fades out instead of disappearing or make a circling rainbow background-color that, when you press a key, shows always a different color, or splitting the led-keys at a given led-number so that the right side can be in a different color than the left side and more. But those things have also one thing in common: **The lack of my motiviation to keep going**.

I never was the programming-guy. In fact I don't like writing much code or big applications like this one (yes for me this is a *big* application). I am, if any, more a script-guy which writes some lines of code for differents tasks. I used to to learn JavaScript. But nowadays I don't write any code in JavaScript anymore due to the lack of motiviation. I dropped it, because of several reasons like job change or simple motivation. Right now I do like writing code in python and maybe, just maybe, I try to re-write this project with python.

#### Now what does that mean for this project? 
**Does it get any more updates?**
I don't know. I may want to code again more in JavaScript sometime, but not now and not in the following months. I may come back and write new features for it, but this is not guaranteed.

**What about bug fixes?**
If you have an issue you can open it, but please keep in mind due to the lack of motivation that I may not response in time or even response at all. If you found a bug I might dig into it, but I won't guarantee that I will do it. If I find a bug for myself and if it really annoys me, this might get changed. But please don't ask for quick fixes.

**Will there be a video tutorial?**
No. Last year I tried to do a decent video, but I wasn't happy with it since I am not confident in making videos. So please don't ask me if there will be a video on how to make this project work for you. You can read all informations in the README.md. But keep in mind, that this project was never intended to be public. That's the reason why this application might not work in your case.

With that said I want to thank everyone which read or even marked this repository with a star. I am glad that you may somewhat appreciate my work!
**If you want to further develop this project you can, of course, fork this project and work on it!**

## Version 3.2
**Release Date: 31.12.2020**
Just before new years eve there is a new update to make! In this version a new feature was added. It's called "Live-Piano". More Information below.

### Added
- **Live-Piano**: This new feature allows you to see your pianoplay in the your webbrowser in **real-time**. If you know the software Synthesia, then you know how it's gonna look like. You have also two options. First you can decide if the live-play-feature should be turned off or on. Second you can decide if the color of the animated piano in the browser should be its default-green-color or if it should match the led-strips color.

## Version 3.1
**Release Date: 25.10.2020**
A new feauture and some structure work has been done in this version of 3.1!

### Added
- **Color-Shuffle**: This new feature allows you to set multiple colors at once. You can assign between 2 to 6 colors. After every key-press the colors get shuffled through. Let's assume you assigned 3 colors in the color-scheme of RGB: `red, green and blue`. After every key-press those colors are lighten up in the expected order: `red -> green -> blue -> red \[...]`.
    - **Random-Shuffle-Order**: If you want a random order of your selected colors you can activate this function. The assigned colors appear in a completly randomized order.
    - **Random-Shuffle-Colors**: You are too lazy to set your own shuffle-colors? No problem I got you covered! Activate this function by typing in how many individual colors you want to get. These colors are randomly created.


## Version 3.0
**Release Date: 03.08.2020**  
With a new "major" feature this project is welcomed to version 3.0!

### Added
- **LED-Background-Light now supported**: This feature is a major one. You are now able to light up your entire led-strip with the preset-colors. You can also set a completely random color. If you want to set your own color you can do that with the new improved color-picker. You can decide between 3 modes: 
    - **Edit Key-Color**: Here you can set your key-color.
    - **Edit Background-Color**: Here you can set your background-color.
    - **Turning Background-Color Off**: This turns the entire led-strip to off.
- Color-Picker: It is true. The color-picker which was removed in version 2.0 due to maintanance has now returned in a new style.
 
### Important Note
If you want to use the led-background-light with your piano I recommend using an external power supply. Installations are provided in:
- [Beginner's-Guide](BEGINNERS.md#led-background-light)
- [Normal-Guide](../README.md#led-background-light)

## Version 2.0
**Release Date: 03.06.2020**  
Hey there folks! It's been a long time since this project was released! After 5 Months I had some time to work on this project again. Here are the details what's new in this project:

### Added
- **New HTML-Design:** With the support of jquery, popper.js and bootstrap the new Color-Page.html-File looks now a lot better than in the first version. On this site you can set your personal preferences for color of the strip provided by preset-color-buttons or a random-color-function. You can also add a time how long the keys should stay lit after pressing them 
- **Random-Color-Button:** If you use this feature each new pressed key will light up in a different color. 
- **Freeze-Option:** After releasing the key your light will stay lit for a specifig amount of seconds. You can decide if between 1-5 seconds (floating numbers not supported yet!)

### Removed
- **Color-Picker:** At this moment you can't select your own color anymore. This feature is currently under maintenance.