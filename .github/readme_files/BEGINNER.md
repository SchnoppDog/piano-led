# Beginner's Installation
## About
This Installation-Guide will provide you with information for setting up your own led-piano with no experience in programming or whatsoever. You simply need time and patience. I take no warranty for any damage in this process or that the project won't work for you.

## Notice
Please notice that I can't replicate the entire steps given since I don't have the hardware to do it again. This guide may provide images but not for all steps shown.

## What you need
- A standard piano with 88 keys. Depending on what led-strip you will actually use you can have a piano with more or less keys.
- Your piano should have a USB-MIDI-Interace. If your piano doesn't have a USB-MIDI-Interface you can get a [MIDI-to-USB-cable](https://www.thomann.de/de/thomann_midi_usb_1x1.htm).
- An APA102 (Dotstar) LED-Strip. I used 144 LEDs/0.5m, but you can go with any length you want. Notice that the LEDs should match the keys.
- A Raspberry Pi version 3 or higher.
- A micro-sd card with atleast 16 GB of storage.
- A power supply for your raspberry pi
- A USB-to-HOST-cable like [this](https://www.thomann.de/de/lindy_usb_2.0_typ_a_b_5m_black.htm) one.
- **For use with the background-led-funtion**: A 5V 10A power supply for your strip (144 LEDs/0.5m). If you are unsure what power supply you need: 
    - Expect each LED consumes up to 60mA. Then use this function to calculate your needed power supply: strip-led-length * 60 mA / 1000 = Amps 
    - With that in mind you need to search for a power supply of 5V and your calculated amps. 

## Installing Raspbian
I recommend using the official installation [tutorial](https://projects.raspberrypi.org/en/projects/raspberry-pi-setting-up) for installing raspbian on your raspberry pi.

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
If you're done installing verify the nodejs-package with those two commands:
```
node -v
npm -v
```
The outputs for `node -v` should be v10.15.2 or higher and for `npm -v` 5.8.0 or higher

## Copying the Project
Navigate into any directory you want to install this project. I recommend using the `documents` folder. Download the project into your directory using `git clone https://github.com/SchnoppDog/piano-led.git`. After your download change into the newly created directory called led piano. Now use the command `npm install` to install the project with its modules.

## Setting Variabled
Now comes a more tricky part of this installation-guide, but don't worry.

### Creating and updating mainConfig.js
First open the file called `mainConfig.txt`. Copy the text and close the file again. Navigate to `backend` and create a new file called `config.js`. Open up `config.js` and paste your copied text. Change the `config.server.port` to `8080` 
```
module.exports.port = 8080
```
Then change the `config.server.ipPi` to your rapsberry pi's IPv4-adress. If you don't know how to obtain the ipv4-adress of your rapsberry pi simply type `ifoncfig | grep inet` into the terminal. The output should be like this:
```
inet 192.168.0.0  netmask 255.255.255.0  broadcast 192.168.0.255
```
Copy your inet number (in this example 192.168.0.0) and paste it into the `config.server.ipPi` variable:
```
module.exports.ipPi = "192.168.0.0"
```
Quotation marks are need.