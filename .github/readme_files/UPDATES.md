# Updates
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