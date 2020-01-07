const pianoMidi = require('easymidi')
const usbDetect = require('usb-detection')
const convert = require('color-convert')
const ledStrip  = require('../piano-project/lib/expModules/lightStrip.js')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const colorApp = express()
const colorAppConfig = require('../piano-project/configs/mainConfig')

//Default Values if Script fails or has to restart
let red = 128
let green = 128
let blue = 128
const alpha = 0.5

colorApp.use(bodyParser.urlencoded({extended: false}))
colorApp.use(morgan('short'))
colorApp.use(express.static('./lib/sites'))     //to access the html files in it. Can be named anything you like

colorApp.post("/colorPageDefine", (req,res) => {
    console.log("Accessed colorPageDefine")
    if(req.body.buttonRed) {
        red = 100
        green = 0
        blue = 0
    } else if(req.body.buttonGreen) {
        red = 0
        green = 100
        blue = 0
    } else if(req.body.buttonBlue) {
        red = 0
        green = 0
        blue = 100
    } else if(req.body.buttonOrange) {
        red = 255
        green = 128
        blue = 0
    } else if(req.body.buttonPurple) {
        red = 100
        green = 0
        blue = 100
    } else if(req.body.buttonCyan) {
        red = 0
        green = 100
        blue = 100
    } else if(req.body.buttonYellow) {
        red = 100
        green = 100
        blue = 0
    } else if(req.body.buttonOff) {
        red = 0
        green = 0
        blue = 0
    } else if(req.body.buttonDefault) {
        red = 100
        green = 100
        blue = 100
    } else if(req.body.favColor) {
        colorArray = convert.hex.rgb(`${req.body.favColor}`)
        red = colorArray[0]
        green = colorArray[1]
        blue = colorArray[2]

        if(red > 255) {
            res.send("<p>Color Value is too big! Please reconsider!</p>")
        } else if(green > 255) {
            res.send("<p>Color Value is too big! Please reconsider!</p>")
        } else if(blue > 255) {
            res.send("<p>Color Value is too big! Please reconsider!</p>")
        }
    }
    res.redirect(`http://${colorAppConfig.ipPi}:${colorAppConfig.port}/colorPage.html`)
})

usbDetect.startMonitoring()
usbDetect.on('add',(device) => { 
    if(device.deviceName === "Digital_Piano") {
        console.log("Device found!")
        
        const midiInput = new pianoMidi.Input('Digital Piano:Digital Piano MIDI 1 20:0')
        midiInput.on('noteon', (msg) => {
            if(msg.velocity > 0 ) {
                if(msg.note === msg.note) {
                    ledStrip.lightOn(msg.note,red,green,blue,alpha)
                }
            }else {
                if(msg.note === msg.note) {
                    ledStrip.lightOff(msg.note)
                }
            }
        })
    }
})

colorApp.listen(colorAppConfig.port, "0.0.0.0")