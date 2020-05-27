const pianoMidi      = require('easymidi')
const usbDetect      = require('usb-detection')
const convert        = require('color-convert')
const ledStrip       = require('../backend/lib/expModules/lightStrip.js')
const colorEffects   = require('../backend/lib/expModules/colorEffects.js')
const express        = require('express')
const bodyParser     = require('body-parser')
const colorApp       = express()
const colorAppConfig = require('../backend/config')

//Default Values if Script fails or has to restart
let red = 128
let green = 128
let blue = 128
const alpha = 0.5
let randomColor = false
let randColOnOff = 0
let freezeOpts = {}
let isFreeze = 'false'
let freezeTime = 0

colorApp.use(bodyParser.urlencoded({extended: false}))
colorApp.use(express.static(colorAppConfig.html.public))     //to access the html files in it. Can be named anything you like

colorApp.get("/color-page", (req, res) => {
    res.sendFile(`${config.html.views}/colorPage.html`)
})


colorApp.post("/set-color", (req, res) => {
    const colorValue = req.query.colorValue
    const arrayRGB   = convert.hex.rgb(colorValue)
    randomColor = false
    red = arrayRGB[0]
    green = arrayRGB[1]
    blue = arrayRGB[2]

    if(isFreeze === 'true') {
        freezeOpts = {
            isFreeze: isFreeze,
            freezeOpts: {
                rgba: {
                    red: red,
                    green: green,
                    blue: blue,
                    alpha: alpha
                },
                duration: freezeTime
            }
        }
    } else {
        freezeOpts = {
            isFreeze: isFreeze,
            freezeOpts: {
                duration: 0
            }
        }
    }
    res.json({ statusCode: 200, message: "Color set!"})
})

colorApp.post("/random-color", (req, res) => {
    randColOnOff++
    if(randColOnOff % 2 === 0) {
        randomColor = false
        red = 128
        green = 128
        blue = 128
        res.json({ statusCode: 205, message: "Random Color Off!"})
    } else {
        randomColor = true
        res.json({ statusCode: 200, message: "Random Color set!"})
    }
})

colorApp.post("/key-freeze", (req, res) => {
    freezeTime = parseInt(req.query.freeze_time) * 1000 
    isFreeze   = req.query.is_freeze
    freezeOpts = {
        isFreeze: isFreeze,
        freezeOpts: {
            rgba: {
                red: red,
                green: green,
                blue: blue,
                alpha: alpha
            },
            duration: freezeTime
        }
    }
    if(isFreeze === 'false') {
        return res.json({ statusCode: 210, message: "Freeze is now off!"})
    }
    if(freezeTime > 5000 || freezeTime < 0) {
        res.json({ statusCode: 205, message: "Your time is too high/low!"})
    } else {
        res.json({ statusCode: 200, message: "Freeze has been set!"})
    }
})

usbDetect.startMonitoring()
usbDetect.on('add',(device) => { 
    if(device.deviceName === "Digital_Piano") {
        console.log("Device found!")
        
        const midiInput = new pianoMidi.Input('Digital Piano:Digital Piano MIDI 1 20:0')
        midiInput.on('noteon', (msg) => {
            if(msg.velocity > 0 ) {
                if(msg.note === msg.note) {
                    if(randomColor === true) {
                        let rgbValues = colorEffects.getRandomColor()
                        red           = rgbValues[0]
                        green         = rgbValues[1]
                        blue          = rgbValues[2]
                    }
                    ledStrip.lightOn(msg.note,red,green,blue,alpha)
                }
            }else {
                if(msg.note === msg.note) {
                    ledStrip.lightOff(msg.note, freezeOpts)
                }
            }
        })
    }
})

colorApp.listen(colorAppConfig.server.port, "0.0.0.0")
