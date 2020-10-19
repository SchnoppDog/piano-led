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

//For future implementation needed
// let onPressOpts             = {
//     color: {
//         rgba: {
//             red: red,
//             green: green,
//             blue: blue,
//             alpha: alpha
//         }
//     }
// }


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
    //Dimming the background-light
    bgRed            = ((arrayRGB[0] / 2) / 2) / 2
    bgGreen          = ((arrayRGB[1] / 2) / 2) /2
    bgBlue           = ((arrayRGB[2] / 2) / 2) /2
    console.log(arrayRGB)

    /* Setting various options for various behaviours such as:
        - Is the general On-Off-Button for the Background-Color turned on or off?
        - Is the Background-Button set to "Edit-Key-Color" or something else?
        - Is the freeze-Option set?
        ...
        Notice: Booleans must be String since they are handled here as Strings
    */
    if(stripOpts.isBgColorOnOff === 'true') {
        /* 
            If true color for background-lighting can be set
            If false color is set to 0 and background-options are inaccessible
        */
        if(stripOpts.isBgColor === 'true') {
            /*
                If true Background-Color can be set
                If false Background-Color is deactivated and key-color can be set
            */
            stripOpts.bgColorOpts.rgba.red      = bgRed
            stripOpts.bgColorOpts.rgba.green    = bgGreen
            stripOpts.bgColorOpts.rgba.blue     = bgBlue
            stripOpts.bgColorOpts.rgba.alpha    = alpha
            ledStrip.setBgLight(stripOpts)
        } else {
            red     = arrayRGB[0]
            green   = arrayRGB[1]
            blue    = arrayRGB[2]

            if(stripOpts.isFreeze === 'true') {
                stripOpts.freezeOpts.rgba.red       = red
                stripOpts.freezeOpts.rgba.green     = green
                stripOpts.freezeOpts.rgba.blue      = blue
                stripOpts.freezeOpts.rgba.alpha     = alpha
            }
        }
    } else {
        red     = arrayRGB[0]
        green   = arrayRGB[1]
        blue    = arrayRGB[2]

        if(stripOpts.isFreeze === 'true') {
            stripOpts.freezeOpts.rgba.red       = red
            stripOpts.freezeOpts.rgba.green     = green
            stripOpts.freezeOpts.rgba.blue      = blue
            stripOpts.freezeOpts.rgba.alpha     = alpha
        }
    }
    res.json({ statusCode: 200, message: "Color set!"})
})

colorApp.post("/your-key-color", (req, res) => {
    red         = Math.round(req.query.red)     //yourRed
    green       = Math.round(req.query.green)   //yourGreen
    blue        = Math.round(req.query.blue)    //yourBlue

    //Needed for future implementation
    // onPressOpts         = {
    //     color: {
    //         rgba: {
    //             red: yourRed,
    //             green: yourGreen,
    //             blue: yourBlue,
    //             alpha: alpha
    //         }
    //     }
    // }
    
    res.json({ statusCode: 200, message: 'Your color has been set!' })
})

//setting the random color for keys
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
    let isFreeze                     = req.query.is_freeze
    freezeTime                       = parseInt(req.query.freeze_time) * 1000 
    stripOpts.isFreeze               = isFreeze
    stripOpts.freezeOpts.duration    = freezeTime

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

//Setting general background-color to on or off
colorApp.post('/bg-lighting-on-off', (req, res) => {
    let bgColorOnOff = req.query.bgColorOnOff

    if(bgColorOnOff === 'true') {
        counterBgColorOnOff++
        if(counterBgColorOnOff % 2 === 0) {
            bgColorOnOff = 'true'
            res.json({ statusCode: 200, message: "BG-Color turned On!", bgState: bgColorOnOff })
        } else {
            bgColorOnOff                        = 'false'
            stripOpts.isBgColorOnOff            = bgColorOnOff
            stripOpts.bgColorOpts.rgba.red      = 0
            stripOpts.bgColorOpts.rgba.green    = 0
            stripOpts.bgColorOpts.rgba.blue     = 0

            ledStrip.setBgLight(stripOpts)
            res.json({ statusCode: 400, message: "BG-Color turned Off!", bgState: bgColorOnOff })
        }
    }
    stripOpts.isBgColorOnOff = bgColorOnOff
})

//Setting the state for the background-color
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
    stripOpts.isBgColor = bgColor
})

//Setting a random color to the background-color for the entire strip
colorApp.post("/bg-lighting-random", (req, res) => {
    let randRgbValues                   = colorEffects.getRandomColor()
    let randRed                         = randRgbValues[0] / 6
    let randGreen                       = randRgbValues[1] / 6
    let randBlue                        = randRgbValues[2] / 6

    stripOpts.bgColorOpts.rgba.red      = randRed
    stripOpts.bgColorOpts.rgba.green    = randGreen
    stripOpts.bgColorOpts.rgba.blue     = randBlue
    ledStrip.setBgLight(stripOpts)

    res.json({ statusCode: 200, message: "Random Color Applied!" })
})

//Setting the custom-color of the user as background-color
colorApp.post("/your-bg-color", (req, res) => {
    let yourBgRed                           = Math.round(req.query.red) / 6
    let yourBgGreen                         = Math.round(req.query.green) / 6
    let yourBgBlue                          = Math.round(req.query.blue) / 6

    stripOpts.bgColorOpts.rgba.red          = yourBgRed
    stripOpts.bgColorOpts.rgba.green        = yourBgGreen
    stripOpts.bgColorOpts.rgba.blue         = yourBgBlue

    ledStrip.setBgLight(stripOpts)
    res.json({ statusCode: 200, message: 'Your color has been set!' })    
})

//Starting Monitoring Service for piano
//You need to edit the first "if"-Statemant if your piano has a other name than shown here
usbDetect.startMonitoring()
usbDetect.on('add',(device) => { 
    if(device.deviceName === "Digital_Piano") {
        console.log("Device found!")
        
        //Edit this variable if your input-name of your piano is different than shown here
        const midiInput = new pianoMidi.Input('Digital Piano:Digital Piano MIDI 1 20:0')
        midiInput.on('noteon', (msg) => {
            if(msg.velocity > 0 ) {
                if(msg.note === msg.note) {
                    //setting the options for random color if freezeTime is set to 0 from before freeze will be deactivated
                    if(randomColor === true) {
                        let rgbValues                       = colorEffects.getRandomColor()
                        red                                 = rgbValues[0]
                        green                               = rgbValues[1]
                        blue                                = rgbValues[2]

                        stripOpts.freezeOpts.rgba.red       = red
                        stripOpts.freezeOpts.rgba.green     = green
                        stripOpts.freezeOpts.rgba.blue      = blue
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