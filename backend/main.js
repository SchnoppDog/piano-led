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
const alpha                 = 0.5
let red                     = 128
let green                   = 128
let blue                    = 128
let randomColor             = false
let randColOnOff            = 0
let counterBgColor          = 1
let counterBgColorOnOff     = 1
let freezeTime              = 0
let stripOpts               = {
    lightOnColorOpts: {
        rgba: {
            red: red,
            green: green,
            blue: blue,
            alpha: alpha
        },
    },
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
    isRandColPerKey: 'false',
    isBgColor: 'false',
    isBgColorOnOff: 'false',
    bgColorOpts: {
        rgba: {
            red: 0,
            green: 0,
            blue: 0,
            alpha: alpha
        }
    },
    isColorShuffle: 'false',
    isColorShuffleRandom: 'false',
    colorShuffleOpts: {
        rgba: {
            arrayRed: [],
            arrayGreen: [],
            arrayBlue: [],
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

// Redirection to the color-page if root-route is typed in
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

    /* Setting various options for various behaviours such as:
        - Is the general On-Off-Button for the Background-Color turned on or off?
        - Is the Background-Button set to "Edit-Key-Color" or something else?
        - Is the freeze-Option set?
        - Is the Color-Shuffle-Option set?
        ...
        Notice: Booleans must be Strings since they are handled here as Strings
        This has to do with the route-paths: In the route-paths the boolean-value is stored but they are sent as a String.
        Since it is a bit complicated to turn Strings into booleans the booleans will be represented as Strings.
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
            /*
                If "isRandColPerKey" or "isColorShuffle" set to true you can't access the key-color. You  have to deactivate either function first!
            */
            if(stripOpts.isRandColPerKey === 'true') {
                res.json({ statusCode: 409, message: 'Turn OFF Random-Color per press!' })
            } else if(stripOpts.isColorShuffle === 'true') {
                res.json({ statusCode: 409, message: 'Turn OFF Color-Shuffle first!' })
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

                stripOpts.lightOnColorOpts.rgba.red      = red
                stripOpts.lightOnColorOpts.rgba.gren     = green
                stripOpts.lightOnColorOpts.rgba.blue     = blue

                res.json({ statusCode: 200, message: "Color set!"})
            }
        }
    } else {
        if(stripOpts.isRandColPerKey === 'true') {
            res.json({ statusCode: 409, message: 'Turn OFF Random-Color per press!' })
        } else if(stripOpts.isColorShuffle === 'true') {
            res.json({ statusCode: 409, message: 'Turn OFF Color-Shuffle first!' })
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

            stripOpts.lightOnColorOpts.rgba.red      = red
            stripOpts.lightOnColorOpts.rgba.gren     = green
            stripOpts.lightOnColorOpts.rgba.blue     = blue

            res.json({ statusCode: 200, message: "Color set!"})
        }
    }
})

//setting the random color for keys
colorApp.post("/random-color", (req, res) => {
    let randRgbValues               = colorEffects.getRandomColor()
    let randRed                     = randRgbValues[0]
    let randGreen                   = randRgbValues[1]
    let randBlue                    = randRgbValues[2]

    if(stripOpts.isBgColorOnOff === "true") {
        if(stripOpts.isBgColor === "true") {
            stripOpts.bgColorOpts.rgba.red          = randRed / 6
            stripOpts.bgColorOpts.rgba.green        = randGreen / 6
            stripOpts.bgColorOpts.rgba.blue         = randBlue / 6 
            ledStrip.setBgLight(stripOpts)

            res.json({ statusCode: 200, message: `Random Color Set! Color is RGB ${randRed}, ${randGreen}, ${randBlue}` })
        } else {
            red     = randRed
            green   = randGreen
            blue    = randBlue

            stripOpts.lightOnColorOpts.rgba.red      = red
            stripOpts.lightOnColorOpts.rgba.gren     = green
            stripOpts.lightOnColorOpts.rgba.blue     = blue

            res.json({ statusCode: 200, message: `Random Color Set! Color is RGB ${randRed}, ${randGreen}, ${randBlue}` })
        }
    } else {
        red     = randRed
        green   = randGreen
        blue    = randBlue

        stripOpts.lightOnColorOpts.rgba.red      = red
        stripOpts.lightOnColorOpts.rgba.gren     = green
        stripOpts.lightOnColorOpts.rgba.blue     = blue

        res.json({ statusCode: 200, message: `Random Color Set! Color is RGB ${randRed}, ${randGreen}, ${randBlue}` })
    }
})

colorApp.post("/random-color-per-press", (req, res) => {
    if(stripOpts.isBgColorOnOff === "true") {
        if(stripOpts.isBgColor === "true") {
            res.json({ statusCode: 403, message: "Background-Color Active! Switch to Key-Color to activate this function!" })
        } else if(stripOpts.isColorShuffle === 'true') {
            res.json({ statusCode: 403, message: 'Color-Shuffle is ON! Deactivate Color-Shuffle!' })
        } else {
            randColOnOff++      //need for sending the correct respond message
            if(randColOnOff % 2 === 0) {
                red                                         = 128
                green                                       = 128
                blue                                        = 128
                randomColor                                 = false
                stripOpts.isRandColPerKey                   = 'false'
                stripOpts.lightOnColorOpts.rgba.red         = red
                stripOpts.lightOnColorOpts.rgba.gren        = green
                stripOpts.lightOnColorOpts.rgba.blue        = blue
                
                res.json({ statusCode: 418, message: "Random-Color per Press OFF!" })
            } else {
                randomColor = true
                stripOpts.isRandColPerKey = 'true'

                res.json({ statusCode: 200, message: "Random-Color per Press ON!" })
            }
        }
    } else {
        if(stripOpts.isColorShuffle === 'true') {
            res.json({ statusCode: 403, message: 'Color-Shuffle is ON! Deactivate Color-Shuffle!' })
        } else {
            randColOnOff++      //need for sending the correct respond message
            if(randColOnOff % 2 === 0) {
                red                                         = 128
                green                                       = 128
                blue                                        = 128
                randomColor                                 = false
                stripOpts.isRandColPerKey                   = 'false'
                stripOpts.lightOnColorOpts.rgba.red         = red
                stripOpts.lightOnColorOpts.rgba.gren        = green
                stripOpts.lightOnColorOpts.rgba.blue        = blue
                
                res.json({ statusCode: 418, message: "Random-Color per Press OFF!" })
            } else {
                randomColor = true
                stripOpts.isRandColPerKey = 'true'

                res.json({ statusCode: 200, message: "Random-Color per Press ON!" })
            }
        }
    }
})

colorApp.post("/custom-color", (req, res) => {
    let customRed       = Math.round(req.query.red)
    let customGreen     = Math.round(req.query.green)
    let customBlue      = Math.round(req.query.blue)

    if(stripOpts.isBgColorOnOff === 'true') {
        if(stripOpts.isBgColor === 'true') {
            stripOpts.bgColorOpts.rgba.red      = customRed / 6
            stripOpts.bgColorOpts.rgba.green    = customGreen / 6
            stripOpts.bgColorOpts.rgba.blue     = customBlue / 6

            ledStrip.setBgLight(stripOpts)
            res.json({ statusCode: 200, message: 'Your color has been set successfully!' })
        } else {
            red                                         = customRed
            green                                       = customGreen
            blue                                        = customBlue

            stripOpts.lightOnColorOpts.rgba.red         = red
            stripOpts.lightOnColorOpts.rgba.gren        = green
            stripOpts.lightOnColorOpts.rgba.blue        = blue

            res.json({ statusCode: 200, message: 'Your color has been set successfully!' })
        } 
    } else {
        red                                         = customRed
        green                                       = customGreen
        blue                                        = customBlue

        stripOpts.lightOnColorOpts.rgba.red         = red
        stripOpts.lightOnColorOpts.rgba.gren        = green
        stripOpts.lightOnColorOpts.rgba.blue        = blue

        res.json({ statusCode: 200, message: 'Your color has been set successfully!' })
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


colorApp.post("/set-shuffle-colors", (req, res) => {
    // Next Step: Bei lightStrip.js programmieren!
    let colorArrayRed       = []
    let colorArrayGreen     = []
    let colorArrayBlue      = []
    let isColorShuffle      = req.query.isColorShuffle
    let numberOfInputs      = parseInt(req.query.genShufInput)

    if(stripOpts.isBgColorOnOff === 'true') {
        if(stripOpts.isBgColor === 'true') {
            res.json({ statusCode: 409, message: 'Switch to "Change Key-Color"' })
        } else {
            if(stripOpts.isRandColPerKey === 'true') {
                res.json({ statusCode: 409, message: 'Turn OFF "random-color per press"!' })
            } else {
                if(isColorShuffle === 'true') {
                    colorArrayRed       = req.query.colorArrayRed.split(',').map(Number)
                    colorArrayGreen     = req.query.colorArrayGreen.split(',').map(Number)
                    colorArrayBlue      = req.query.colorArrayBlue.split(',').map(Number)
            
                    for(let counter = 0; counter < numberOfInputs; counter++) {
                        colorArrayRed[counter]      = Math.round(colorArrayRed[counter])
                        colorArrayGreen[counter]    = Math.round(colorArrayGreen[counter])
                        colorArrayBlue[counter]     = Math.round(colorArrayBlue[counter])
                    }

                    stripOpts.isColorShuffle                        = isColorShuffle
                    stripOpts.colorShuffleOpts.rgba.arrayRed        = colorArrayRed
                    stripOpts.colorShuffleOpts.rgba.arrayGreen      = colorArrayGreen
                    stripOpts.colorShuffleOpts.rgba.arrayBlue       = colorArrayBlue
            
                    res.json({ statusCode: 200, message: 'Colors for Color-Shuffle set. Color-Shuffle is ON!' })

                } else {
                    stripOpts.isColorShuffle                        = isColorShuffle
                    stripOpts.colorShuffleOpts.rgba.arrayRed        = []
                    stripOpts.colorShuffleOpts.rgba.arrayGreen      = []
                    stripOpts.colorShuffleOpts.rgba.arrayBlue       = []
                    
                    res.json({ statusCode: 403, message: 'Color-Shuffle is OFF!' })
                }
            }
        }
    } else {
        if(stripOpts.isRandColPerKey === 'true') {
            res.json({ statusCode: 409, message: 'Turn OFF "random-color per press"!' })
        } else {
            if(isColorShuffle === 'true') {
                colorArrayRed       = req.query.colorArrayRed.split(',').map(Number)
                colorArrayGreen     = req.query.colorArrayGreen.split(',').map(Number)
                colorArrayBlue      = req.query.colorArrayBlue.split(',').map(Number)
        
                for(let counter = 0; counter < numberOfInputs; counter++) {
                    colorArrayRed[counter]      = Math.round(colorArrayRed[counter])
                    colorArrayGreen[counter]    = Math.round(colorArrayGreen[counter])
                    colorArrayBlue[counter]     = Math.round(colorArrayBlue[counter])
                }
        
                stripOpts.isColorShuffle                        = isColorShuffle
                stripOpts.colorShuffleOpts.rgba.arrayRed        = colorArrayRed
                stripOpts.colorShuffleOpts.rgba.arrayGreen      = colorArrayGreen
                stripOpts.colorShuffleOpts.rgba.arrayBlue       = colorArrayBlue
        
                res.json({ statusCode: 200, message: 'Colors for Color-Shuffle set. Color-Shuffle is ON!' })
            } else {
                stripOpts.isColorShuffle                        = isColorShuffle
                stripOpts.colorShuffleOpts.rgba.arrayRed        = []
                stripOpts.colorShuffleOpts.rgba.arrayGreen      = []
                stripOpts.colorShuffleOpts.rgba.arrayBlue       = []
                
                res.json({ statusCode: 403, message: 'Color-Shuffle is OFF!' })
            }
        }
    }
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
                        let rgbValues                               = colorEffects.getRandomColor()
                        red                                         = rgbValues[0]
                        green                                       = rgbValues[1]
                        blue                                        = rgbValues[2]

                        stripOpts.freezeOpts.rgba.red               = red
                        stripOpts.freezeOpts.rgba.green             = green
                        stripOpts.freezeOpts.rgba.blue              = blue

                        stripOpts.lightOnColorOpts.rgba.red         = red
                        stripOpts.lightOnColorOpts.rgba.gren        = green
                        stripOpts.lightOnColorOpts.rgba.blue        = blue
                    }
                    ledStrip.lightOn(msg.note,stripOpts)
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