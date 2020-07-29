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

colorApp.get("/", (req, res) => {
    res.redirect("/color-page")
})

//Displaying Color-Page HTML-File
colorApp.get("/color-page", (req, res) => {
    res.sendFile(`${config.html.views}/colorPage.html`)
})

//Setting Preset-Color
colorApp.post("/set-color", (req, res) => {
    const colorValue = req.query.colorValue
    const arrayRGB   = convert.hex.rgb(colorValue)
    randomColor = false    //if preset color is choosen random-color will turn off automatically
    randColOnOff++         //needed for showing the correct respond-message in random-color
    red = arrayRGB[0]
    green = arrayRGB[1]
    blue = arrayRGB[2]

    //need to be set as String cause boolean value is converted to a string
    //setting new freeze-options with new color
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
        //turning of freezeoption if it is not set
        freezeOpts = {
            isFreeze: isFreeze,
            freezeOpts: {
                duration: 0
            }
        }
    }
    res.json({ statusCode: 200, message: "Color set!"})
})

//setting the random color
colorApp.post("/random-color", (req, res) => {
    randColOnOff++      //need for sending the correct respond message
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

//setting key-freeze option
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
    //response if criteria for freeze-option is not met
    if(freezeTime > 5000 || freezeTime < 0) {
        res.json({ statusCode: 205, message: "Your time is too high/low!"})
    } else {
        res.json({ statusCode: 200, message: "Freeze has been set!"})
    }
})

//Starting Monitoring Service for piano
//You need to edit this "if"-Statemant if your piano has a other name than shown here
usbDetect.startMonitoring()
usbDetect.on('add',(device) => { 
    if(device.deviceName === "Digital_Piano") {
        console.log("Device found!")
        
        //Edit this const if your input-name of your piano is different than shown here
        const midiInput = new pianoMidi.Input('Digital Piano:Digital Piano MIDI 1 20:0')
        midiInput.on('noteon', (msg) => {
            if(msg.velocity > 0 ) {
                if(msg.note === msg.note) {
                    //setting the options for random color if freezeTime is set to 0 from before freeze will be deactivated
                    if(randomColor === true) {
                        let rgbValues = colorEffects.getRandomColor()
                        red           = rgbValues[0]
                        green         = rgbValues[1]
                        blue          = rgbValues[2]

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
