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
let red                     = 128
let green                   = 128
let blue                    = 128
const alpha                 = 0.5
let randomColor             = false
let randColOnOff            = 0
let counterBgColor          = 1
let counterBgColorOnOff     = 1
let freezeTime              = 0
let stripOpts               = {
    isFreeze: 'false',
    freezeOpts: {
        rgba: {
            red: 0,
            green: 0,
            blue: 0,
            alpha: alpha
        },
        duration: freezeTime
    },
    isBgColor: 'false',
    isBgColorOnOff: 'false',
    bgColorOpts: {
        rgba: {
            red: 0,
            green: 0,
            blue: 0,
            alpha: alpha
        }
    }
}


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
    let bgRed, bgGreen, bgBlue
    bgRed            = ((arrayRGB[0] / 2) / 2) / 2
    bgGreen          = ((arrayRGB[1] / 2) / 2) /2
    bgBlue           = ((arrayRGB[2] / 2) / 2) /2
    randomColor      = false    //if preset color is choosen random-color will turn off automatically
    randColOnOff++         //needed for showing the correct respond-message in random-color
    // red              = arrayRGB[0]
    // green            = arrayRGB[1]
    // blue             = arrayRGB[2]

    //need to be set as String cause boolean value is converted to a string
    //setting new freeze-options with new color
    console.log("isBgColor: ", stripOpts.isBgColor)
    console.log("isBgColorOnOff: ", stripOpts.isBgColorOnOff)

    if(stripOpts.isBgColorOnOff === 'true') {
        if(stripOpts.isBgColor === 'true') {
            if(stripOpts.isFreeze === 'true') {
                stripOpts = {
                    isFreeze: stripOpts.isFreeze,
                    freezeOpts: {
                        rgba: {
                            red: arrayRGB[0],
                            green: arrayRGB[1],
                            blue: arrayRGB[2],
                            alpha: alpha
                        },
                        duration: stripOpts.freezeOpts.duration
                    },
                    isBgColor: stripOpts.isBgColor,
                    isBgColorOnOff: stripOpts.isBgColorOnOff,
                    bgColorOpts: {
                        rgba: {
                            red: bgRed,       //arrayRGB[0]
                            green: bgGreen,     //arrayRGB[1]
                            blue: bgBlue,      //arrayRGB[2]
                            alpha: alpha
                        }
                    }
                }
            } else {
                stripOpts = {
                    isFreeze: stripOpts.isFreeze,
                    freezeOpts: {
                        rgba: {
                            red: 0,
                            green: 0,
                            blue: 0,
                            alpha: alpha
                        },
                        duration: 0
                    },
                    isBgColor: stripOpts.isBgColor,
                    isBgColorOnOff: stripOpts.isBgColorOnOff,
                    bgColorOpts: {
                        rgba: {
                            red: bgRed,
                            green: bgGreen,
                            blue: bgBlue,
                            alpha: alpha
                        }
                    }
                }
            }
            ledStrip.setBgLight(stripOpts)
        } else {
            red     = arrayRGB[0]
            green   = arrayRGB[1]
            blue    = arrayRGB[2]

            if(stripOpts.isFreeze === 'true') {
                stripOpts = {
                    isFreeze: stripOpts.isFreeze,
                    freezeOpts: {
                        rgba: {
                            red: red,
                            green: green,
                            blue: blue,
                            alpha: alpha
                        },
                        duration: stripOpts.freezeOpts.duration
                    },
                    isBgColor: stripOpts.isBgColor,
                    isBgColorOnOff: stripOpts.isBgColorOnOff,
                    bgColorOpts: {
                        rgba: {
                            red: stripOpts.bgColorOpts.rgba.red,        //stripOpts.bgColorOpts.rgba.red
                            green: stripOpts.bgColorOpts.rgba.green,    //stripOpts.bgColorOpts.rgba.green
                            blue: stripOpts.bgColorOpts.rgba.blue,      //stripOpts.bgColorOpts.rgba.blue
                            alpha: alpha
                        }
                    }
                }
            } else {
                stripOpts = {
                    isFreeze: stripOpts.isFreeze,
                    freezeOpts: {
                        rgba: {
                            red: 0,
                            green: 0,
                            blue: 0, 
                            alpha: alpha
                        },
                        duration: 0
                    },
                    isBgColor: stripOpts.isBgColor,
                    isBgColorOnOff: stripOpts.isBgColorOnOff,
                    bgColorOpts: {
                        rgba: {
                            red: stripOpts.bgColorOpts.rgba.red,
                            green: stripOpts.bgColorOpts.rgba.green,
                            blue: stripOpts.bgColorOpts.rgba.blue,
                            alpha: alpha
                        }
                    }
                }
            }
        }
    } else {
        red     = arrayRGB[0]
        green   = arrayRGB[1]
        blue    = arrayRGB[2]

        if(stripOpts.isFreeze === 'true') {
            stripOpts = {
                isFreeze: stripOpts.isFreeze,
                freezeOpts: {
                    rgba: {
                        red: red,
                        green: green,
                        blue: blue,
                        alpha: alpha
                    },
                    duration: stripOpts.freezeOpts.duration
                },
                isBgColor: stripOpts.isBgColor,
                isBgColorOnOff: stripOpts.isBgColorOnOff,
                bgColorOpts: {
                    rgba: {
                        red: 0,        //stripOpts.bgColorOpts.rgba.red
                        green: 0,       //stripOpts.bgColorOpts.rgba.green
                        blue: 0,        //stripOpts.bgColorOpts.rgba.blue
                        alpha: alpha
                    }
                }
            }
        } else {
            stripOpts = {
                isFreeze: stripOpts.isFreeze,
                freezeOpts: {
                    rgba: {
                        red: 0,
                        green: 0,
                        blue: 0,
                        alpha: alpha
                    },
                    duration: 0
                },
                isBgColor: stripOpts.isBgColor,
                isBgColorOnOff: stripOpts.isBgColorOnOff,
                bgColorOpts: {
                    rgba: {
                        red: 0,
                        green: 0,
                        blue: 0,
                        alpha: alpha
                    }
                }
            }
        }
    }
    // console.log("Set-Color:")
    // console.log(stripOpts)
    // console.log("Lighton-Function: ")
    // console.log("red: ", red)
    // console.log("green: ", green)
    // console.log("blue: ", blue)
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
    let isFreeze   = req.query.is_freeze
    freezeTime     = parseInt(req.query.freeze_time) * 1000 
    stripOpts = {
        isFreeze: isFreeze,
        freezeOpts: {
            rgba: {
                red: stripOpts.freezeOpts.rgba.red,
                green: stripOpts.freezeOpts.rgba.green,
                blue: stripOpts.freezeOpts.rgba.blue,
                alpha: alpha
            },
            duration: freezeTime
        },
        isBgColor: stripOpts.isBgColor,
        isBgColorOnOff: stripOpts.isBgColorOnOff,
        bgColorOpts: {
            rgba: {
                red: stripOpts.bgColorOpts.rgba.red,
                green: stripOpts.bgColorOpts.rgba.green,
                blue: stripOpts.bgColorOpts.rgba.blue,
                alpha: alpha
            }
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

colorApp.post('/bg-lighting-on-off', (req, res) => {
    let bgColorOnOff = req.query.bgColorOnOff

    if(bgColorOnOff === 'true') {
        counterBgColorOnOff++
        if(counterBgColorOnOff % 2 === 0) {
            bgColorOnOff = 'true'
            res.json({ statusCode: 200, message: "BG-Color turned On!" })
        } else {
            bgColorOnOff = 'false'
            stripOpts = {
                isFreeze: stripOpts.isFreeze,
                freezeOpts: {
                    rgba: {
                        red: stripOpts.freezeOpts.rgba.red,
                        green: stripOpts.freezeOpts.rgba.green,
                        blue: stripOpts.freezeOpts.rgba.blue,
                        alpha: alpha
                    },
                    duration: stripOpts.freezeOpts.duration
                },
                isBgColorOnOff: bgColorOnOff,
                isBgColor: stripOpts.isBgColor,
                bgColorOpts: {
                    rgba: {
                        red: 0,
                        green: 0,
                        blue: 0,
                        alpha: alpha
                    }
                }
            }
            ledStrip.setBgLight(stripOpts)
            res.json({ statusCode: 400, message: "BG-Color turned Off!" })
        }
    }

    stripOpts = {
        isFreeze: stripOpts.isFreeze,
        freezeOpts: {
            rgba: {
                red: stripOpts.freezeOpts.rgba.red,
                green: stripOpts.freezeOpts.rgba.green,
                blue: stripOpts.freezeOpts.rgba.blue,
                alpha: alpha
            },
            duration: stripOpts.freezeOpts.duration
        },
        isBgColorOnOff: bgColorOnOff,
        isBgColor: stripOpts.isBgColor,
        bgColorOpts: {
            rgba: {
                red: stripOpts.bgColorOpts.rgba.red,
                green: stripOpts.bgColorOpts.rgba.green,
                blue: stripOpts.bgColorOpts.rgba.blue,
                alpha: alpha
            }
        }
    }
})

colorApp.post('/bg-lighting', (req, res) => {
    let bgColor         = req.query.bgColor
    
    if(bgColor === 'true') {
        counterBgColor++
        if(counterBgColor % 2 === 0) {
            bgColor = 'true'
            res.json({ statusCode: 200, message: "Edit Background-Color" })
        } else {
            bgColor = 'false'
            res.json({ statusCode: 205, message: "Edit Key-Color" })
        }
    }

    stripOpts = {
        isFreeze: stripOpts.isFreeze,
        freezeOpts: {
            rgba: {
                red: stripOpts.freezeOpts.rgba.red,
                green: stripOpts.freezeOpts.rgba.green,
                blue: stripOpts.freezeOpts.rgba.blue,
                alpha: alpha
            },
            duration: stripOpts.freezeOpts.duration
        },
        isBgColorOnOff: stripOpts.isBgColorOnOff,
        isBgColor: bgColor,
        bgColorOpts: {
            rgba: {
                red: stripOpts.bgColorOpts.rgba.red,
                green: stripOpts.bgColorOpts.rgba.green,
                blue: stripOpts.bgColorOpts.rgba.blue,
                alpha: alpha
            }
        }
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

                        stripOpts = {
                            isFreeze: stripOpts.isFreeze,
                            freezeOpts: {
                                rgba: {
                                    red: red,
                                    green: green,
                                    blue: blue,
                                    alpha: alpha
                                },
                                duration: stripOpts.freezeOpts.duration
                            },
                            isBgColor: stripOpts.isBgColor,
                            isBgColorOnOff: stripOpts.isBgColorOnOff,
                            bgColorOpts: {
                                rgba: {
                                    red: red,
                                    green: green,
                                    blue: blue,
                                    alpha: alpha
                                }
                            }
                        }
                        ledStrip.setBgLight(stripOpts)
                    }
                    ledStrip.lightOn(msg.note,red,green,blue,alpha)
                }
            }else {
                if(msg.note === msg.note) {
                    ledStrip.lightOff(msg.note, stripOpts)
                }
            }
        })
    }
})

colorApp.listen(colorAppConfig.server.port, "0.0.0.0")
