/*
    This is the main-file containing all necessary routes to make the project work
*/

const pianoMidi         = require('easymidi')
const fs                = require('fs')
const usbDetect         = require('usb-detection')
const ledStrip          = require('../backend/lib/expModules/lightStrip.js')
const colorEffects      = require('../backend/lib/expModules/colorEffects.js')
const express           = require('express')
const bodyParser        = require('body-parser')
const colorAppConfig    = require('../backend/config')
const privKey           = fs.readFileSync('/usr/local/certs/keys/pianoled.local.pem')
const pubKey            = fs.readFileSync('/usr/local/certs/pianoled.local.pem')
const colorApp          = express()
// const pianoServer       = require('http').createServer(colorApp)
const pianoServer       = require('https').createServer({
    key: privKey,
    cert: pubKey
}, colorApp)
const io                = require('socket.io')(pianoServer)
const mainPianoSocket   = io.of('/mainPianoSocket') 
const cssKeyColorSocket = io.of('/cssKeyColorSocket')

//Default Values if Script fails or has to restart
const alpha                 = 0.5
let red                     = 128
let green                   = 128
let blue                    = 128

// Strip-values for each function
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
        duration: 0
    },
    isRandColPerKey: 'false',
    randColPerKeyOpts: {
        randColOnOff: 0
    },
    isBgColor: 'false',
    isBgColorOnOff: 'false',
    bgColorOpts: {
        rgba: {
            red: 0,
            green: 0,
            blue: 0,
            alpha: alpha
        },
        bgColorOnOff: 0,
        counterBgColor: 0
    },
    isColorShuffle: 'false',
    isColorShuffleRandom: 'false',
    colorShuffleOpts: {
        rgba: {
            arrayRed: [],
            arrayGreen: [],
            arrayBlue: [],
            alpha: alpha
        },
        randomShuffleOrderOnOff: 0,
    }
}

// Options for the real time pianoplay
let pianoSocketOpts = {
    buttonConfig: {
        realTimePlayState: true,
        liveColorState: false
    },
    colorConfig: {
        isColorShuffle: false,
        isColorShuffleRandom: false,
        rgbColor: {
            red: 0,
            green: 0,
            blue: 0
        },
        shufflePos: 0,
        randomShufflePos: 0
    }
}

// Maximum Client-Connections
mainPianoSocket.setMaxListeners(5)
cssKeyColorSocket.setMaxListeners(5)

colorApp.use(require('./routes')(stripOpts, pianoSocketOpts, express, io))
colorApp.use(bodyParser.urlencoded({extended: false}))



//Starting Monitoring Service for piano
//You need to edit the first "if"-Statemant if your piano has a other name than shown here
usbDetect.startMonitoring()
usbDetect.on('add',(device) => { 
    if(device.deviceName === "Digital_Piano") {
        console.log("Piano connected!")

        // Socket.io handling real-time piano-key hitting
        mainPianoSocket.on('connection', (socket) => {
            console.log('Client connected!')

            //Edit this variable if your input-name of your piano is different than shown here
            const midiInput = new pianoMidi.Input('Digital Piano:Digital Piano MIDI 1 24:0')
            // console.log(midiInput)
            
            midiInput.on('noteon', (msg) => {
                if(msg.velocity > 0 ) {
                    if(msg.note === msg.note) {
                        //setting the options for random color if freezeTime is set to 0 from before freeze will be deactivated
                        if(stripOpts.isRandColPerKey === 'true') {
                            let rgbValues                               = colorEffects.getRandomColor()
                            red                                         = rgbValues[0]
                            green                                       = rgbValues[1]
                            blue                                        = rgbValues[2]

                            stripOpts.freezeOpts.rgba.red               = red
                            stripOpts.freezeOpts.rgba.green             = green
                            stripOpts.freezeOpts.rgba.blue              = blue

                            stripOpts.lightOnColorOpts.rgba.red         = red
                            stripOpts.lightOnColorOpts.rgba.green       = green
                            stripOpts.lightOnColorOpts.rgba.blue        = blue

                            pianoSocketOpts.colorConfig.isColorShuffle          = false
                            pianoSocketOpts.colorConfig.isColorShuffleRandom    = false
                            pianoSocketOpts.colorConfig.rgbColor.red            = red
                            pianoSocketOpts.colorConfig.rgbColor.green          = green
                            pianoSocketOpts.colorConfig.rgbColor.blue           = blue

                            cssKeyColorSocket.emit('setCssKeyColorVars', pianoSocketOpts.colorConfig)
                        }

                        ledStrip.lightOn(msg.note, stripOpts, io, pianoSocketOpts.colorConfig)

                        // Sending piano-note-on-event to client only if 'realTimePlay' is set to true
                        if(pianoSocketOpts.buttonConfig.realTimePlayState === true) {
                            socket.emit('pianoKeyPress', msg.note)
                        }
                    }
                } else {
                    if(msg.note === msg.note) {
                        ledStrip.lightOff(msg.note, stripOpts)

                        // Sending piano-note-off-event to client only if 'realTimePlay' is set to true
                        if(pianoSocketOpts.buttonConfig.realTimePlayState === true) {
                            socket.emit('pianoKeyRelease', msg.note)
                        }
                    }
                }
            })
            socket.on('disconnect', () => {
                console.log("Client Disconnected")
            })
        })
    }
})

usbDetect.on('remove', (device) => {
    if(device.deviceName === "Digital_Piano") {
        console.log("Piano disconnected!")
        console.log("Restart usb-detection!")
        usbDetect.startMonitoring()
    }
})

pianoServer.listen(colorAppConfig.server.port, colorAppConfig.server.ipPi) //"0.0.0.0" | "127.0.0.1" | colorAppConfig.server.ipPi