const pianoMidi = require('easymidi')
const usbDetect = require('usb-detection')
const convert = require('color-convert')
const ledStrip  = require('../backend/lib/expModules/lightStrip.js')
const express = require('express')
const bodyParser = require('body-parser')
const colorApp = express()
const colorAppConfig = require('../backend/config')

//Default Values if Script fails or has to restart
let red = 128
let green = 128
let blue = 128
const alpha = 0.5

colorApp.use(bodyParser.urlencoded({extended: false}))
colorApp.use(express.static(colorAppConfig.html.public))     //to access the html files in it. Can be named anything you like

colorApp.post("/colorPageDefine", (req,res) => {
    console.log("Accessed colorPageDefine")
        colorArray = convert.hex.rgb(`${req.body.color}`)
        red = colorArray[0]
        green = colorArray[1]
        blue = colorArray[2]
    res.redirect(`http://${colorAppConfig.server.ipPi}:${colorAppConfig.server.port}/colorPage`)
    res.end()
})

colorApp.get("/colorPage", (req, res) => {
    res.sendFile(`${config.html.views}/colorPage.html`)
})

colorApp.get("/testColorPage", (req, res) => {
    res.sendFile(`${config.html.views}/testColorPage.html`)
})

colorApp.get("/testButton/:colorValue", (req, res) => {
    
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

colorApp.listen(colorAppConfig.server.port, "0.0.0.0")
