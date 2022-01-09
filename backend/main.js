/*
    This is the main-file containing all necessary routes to make the project work
*/

const pianoMidi         = require('easymidi')
const fs                = require('fs')
const usbDetect         = require('usb-detection')
const express           = require('express')
const bodyParser        = require('body-parser')

const ledStrip          = require('../backend/lib/expModules/lightStrip.js')
const colorEffects      = require('../backend/lib/expModules/colorEffects.js')
const colorAppConfig    = require('./config')
let stripOpts           = require('../backend/configs/stripOpts.js')
let pianoSocketOpts     = require('../backend/configs/pianoSocketOpts.js')

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

// Variable for later initialized piano-midi device
let piano               = null
// Handling if the piano is connected or not to reduce errors
let pianoConnected      = false

//Default Values if Script fails or has to restart
let red                     = 128
let green                   = 128
let blue                    = 128

// Maximum Client-Connections
mainPianoSocket.setMaxListeners(5)
cssKeyColorSocket.setMaxListeners(5)

colorApp.use(require('./routes')(stripOpts, pianoSocketOpts, express, io))
colorApp.use(bodyParser.urlencoded({extended: false}))

// Starting Monitoring Service for piano
// You need to edit the first "if"-Statemant if your piano has a other name than shown here
usbDetect.startMonitoring()

// Listens on a usb-connection event, if the device-name of the connected device equals 'Digital_Piano' the device is added as new midi-input device.
usbDetect.on('add', (device) => {
    if(device.deviceName === "Digital_Piano") {
        console.log("Piano is connected!")
        console.log('Creating piano as midi-input device...')

        // Put your midi-piano device-name which you got from the "yourPianoName.js"-script in here
        piano = new pianoMidi.Input('Digital Piano:Digital Piano MIDI 1 24:0')
        pianoConnected = true
        
        // The lights will only light up when the piano is connected and initialized as midi-device.
        if(pianoConnected === true) {
            piano.on('noteon', (msg) => {
                if(msg.velocity > 0 ) {
                    if(msg.note === msg.note) {
                        // setting the options for random color if freezeTime is set to 0 from before freeze will be deactivated
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
                            mainPianoSocket.emit('pianoKeyPress', msg.note)
                        }
                    }
                } else {
                    if(msg.note === msg.note) {
                        ledStrip.lightOff(msg.note, stripOpts)

                        // Sending piano-note-off-event to client only if 'realTimePlay' is set to true
                        if(pianoSocketOpts.buttonConfig.realTimePlayState === true) {
                            mainPianoSocket.emit('pianoKeyRelease', msg.note)
                        }
                    }
                }
            })
        }
        else {
            console.log('Piano is not connected! Consider turning it on!')
        }
    }
})

usbDetect.on('remove', (device) => {
    if(device.deviceName === "Digital_Piano") {
        console.log("Piano has been disconnected!")
        console.log('Removing piano as midi-device...')
        piano.close()
    }
})

mainPianoSocket.on('connection', (socket) => {
    console.log('Client is connected!')

    socket.on('disconnect', () => {
        console.log('Client has been disconnected!')
    })
})

pianoServer.listen(colorAppConfig.server.port, colorAppConfig.server.ipPi) //"0.0.0.0" | "127.0.0.1" | colorAppConfig.server.ipPi