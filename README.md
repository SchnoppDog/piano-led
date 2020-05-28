# piano-led
## About
This is a selfmade project inspired by videos from pianist Rousseau on Youtube. With this project you can light up your piano just like rousseau and other people on youtube. This project is entirely written in Node.js and a bit of HTML. I take no warranties that the project works for you.
## Updates
Hey there folks! It's been a long time since this project was released! After 5 Months I had some time to work on this project again. Here are the details what's new in this project:
### Added
- **New HTML-Design:** With the support of jquery, popper.js and bootstrap the new Color-Page.html-File looks now a lot better than in the first version. On this site you can set your personal preferences for color of the strip provided by preset-color-buttons or a random-color-function. You can also add a time how long the keys should stay lit after pressing them 
- **Random-Color-Button:** If you use this feature each new pressed key will light up in a different color. 
- **Freeze-Option:** After releasing the key your light will stay lit for a specifig amount of seconds. You can decide if between 1-5 seconds (floating numbers not supported yet!)
### Removed
- **Color-Picker:** At this moment you can't select your own color anymore. This feature is currently under maintenance.
## What you need
- A standard piano with 88 keys
- A piano with USB-MIDI (if you own a piano with standard MIDI-Interfaces then get a MIDI-to-USB-cable)
- An APA102 Dotstar LED-Strip (144LEDs/0.5m)
- A raspberry pi (version 3 or higher)
- A micro-SD card with atleast 16GB
- A Power-Supply for your raspberry-pi
- A USB-to-Host cable (USB-B to USB-A)
#### You don't need this, but would be appreciated:
- An additional power-supply for the LED-Strip (5V 6Amp would be more than enough. Notice: I didn't use one in my project! so this is not covered!)
- A bit of knowledge about node.js and linux
## Software-Preparations
Install Raspbian on your raspberry-pi (I recommend the official raspberry-pi [tutorial](https://projects.raspberrypi.org/en/projects/raspberry-pi-setting-up).
If you don't own a second monitor or any other devices you can follow this [guide](https://www.terminalbytes.com/raspberry-pi-without-monitor-keyboard/).
## On Raspbian
If you booted into raspbian successfully you need to get some packages before starting. Some of these packages might be already installed on your system. Open up a terminal and type in following commands:
```
sudo apt-get update
sudo apt install curl
sudo apt-get install nodejs
curl -L https://npmjs.org/install.sh | sudo.sh
sudo apt install python3
sudo apt install gcc
sudo apt install g++
sudo apt install libasound2-dev
```
If you're done verify node with:
```
node -v
npm -v
```
The outputs for `node -v` should be something like v10.15.2 or higher and for `npm -v` 5.8.0 or higher
## Create a project-directory and copy the project
Go into any directory where you want to create this project. I would put in something like `/home/pi/documents`.
Download the project into your directory using `git clone https://github.com/SchnoppDog/piano-led.git`. 
After your download use change into the new-created directory called `led piano`. Now use the command `npm install` to install the project with its modules. 
## Updating variables
Now comes the trickiest part (for non-programmer). Since this programm was never intended to be published you have to edit some variables inside the code. But no worries it isn't that much of a change. 
### Creating and Updating mainConfig.js
First go into the `configs` folder and review the file called `mainConfig.txt`. Copy the shown text and create a new file in the same folder with the name `mainConfig.js`. Paste the copied text into the file.
Now change the port number from this: 
```
module.exports.port = port_number
```
to something you want (I use 8080, but you can choose any open port i.e. 9090 etc.)
```
module.exports.port = 8080
``` 
After you changed that change the second:
```
module.exports.ipPi = "IP-Adress"
```
to your pi's IP-address. To figure out your pi's ip-address open a terminal and write `ifconfig | grep inet`. The output you need should be something like:
```
inet 192.168.0.0  netmask 255.255.255.0  broadcast 192.168.0.255
```
What you need to copy is the address right after `inet` (i.e. 192.168.0.0 keep in mind that you have to use your own ip not the one shown here!)
After you copied your IP paste it between the quotation marks like this:
```
module.exports.ipPi = "192.168.0.0" 
```
### Connecting your piano
Now connect your piano with a USB-to-Host cable to your raspberry-pi and turn it on. To verify that you piano is detected as MIDI-Device open up a terminal and type in `aconnect -i`. Your piano should be listed something like:
```
client 20: 'Digital Piano' [type=Kernel,card=1]
    0 'Digital Piano MIDI 1'
```
If your piano is listed then use the file `yourPianoName.js` in folder `test`. Change into the folder `test` and use the following command `node getPianoName.js`. This short script lists you two types of information we need to update the variables correctly.
The **first** output you get should be something like:
```
 Midi Through:Midi Through Port-0 14:0,Digital Piano:Digital Piano MIDI 1 20:0
 ```
 Copy your piano, in this example `Digital Piano:Digital Piano MIDI 1 20:0` and paste it somwhere save.
 The **second** output you get should be list of different devices. Search your piano until you find something like this:
 ```
 locationId: 0,
    vendorId: 1177,
    productId: 5647,
    deviceName: 'Digital Piano',
    manufacturer: 'Yamaha Corporation',
    serialNumber: '',
    deviceAddress: 0 
```
Copy your deviceName, in this example `Digital Piano` and paste it somewhere save.
Now open up `main.js` in the root-directory of the project. Scroll down until you see `if(device.deviceName === "Digital_Piano")`. Replace `Digital_Piano` with your second saved value.
Some line underneath you should find `const midiInput = new pianoMidi.Input('Digital Piano:Digital Piano MIDI 1 20:0')`.
Replace `Digital Piano:Digital Piano MIDI 1 20:0` with the first value you've saved. 
**After changing the needed files don't forget to save them!**
## Installing PM2
Now you are nearly done! You need to put the `main.js` into startup so that it is running always even if your pi shuts unexpectedly down. For that we use PM2. Simply type `npm install pm2 -g`. After the installation type `pm2 start main.js`. To see if it is running type `pm2 list`. After that save it into startup with `pm2 save`.
**That's it for the software-part now comes the last two parts**
## Enable SPI and wire your Strip to SPI-Pins
On your raspberry-pi you need to activate SPI. To do that go into `setting` click `raspberry-pi-configuration`. A windows should pop up. Then you need to go to `interfaces` and activate SPI. If activated close the window with OK. 
To wire up your strip you need four female to female wires. 
- One for GND (Ground) (often black)
- One for 5V (often red)
- One for DATA (often green)
- One for Clock-Rate (often blue)
Now connect all four wires (better use the same color) to the strip. After connecting the to the strip connect GND to GND on your pi, 5 V to 5V on your pi, Clock-Rate to SCLK Pin 23 on your pi and DATA to MOSI Pin 19 on your pi ([raspi 3 pinout](https://pinout.xyz/))
## Good to go
Now you should be good to go. Plug in your power-supply for the reaspberry pi, turn on your piano and have fun!
To change colors your simply visit the following website: `http://your_pi_ip_address:your_port/color-page.html`. 
After `http://` type your pi's IP-Adress. After the ip-address type a colon with your port afterwards and then `/color-page.html`.
Find your Pi's ip and port in the `mainConfig.js` file you created. 
Notice: You need to type the url in a browser e.g. chromium on your raspberry pi or any other browser on another pc in your network. 

**If you have any problems you can contact me. But please keep in mind as I said that this project was never intended to be public so errors and problems can rise.** 