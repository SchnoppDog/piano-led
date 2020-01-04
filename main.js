const pianoMidi = require('easymidi')
const usbDetect = require('usb-detection')
const ledStrip  = require('../piano-project/lib/expModules/lightStrip.js')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const colorApp = express()
const colorAppConfig = require('../piano-project/configs/mainConfig')

let red = 128
let green = 128
let blue = 128
const alpha = 0.5

colorApp.use(bodyParser.urlencoded({extended: false}))
colorApp.use(morgan('short'))
colorApp.use(express.static('./lib/sites'))

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
    } else if(req.body.inputRed) {
        red = req.body.inputRed
    } else if (req.body.inputGreen) {
        green = req.body.inputGreen
    } else if(req.body.inputBlue) {
        blue = req.body.inputBlue
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