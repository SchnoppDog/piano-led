/*
    This is the main-file containing all necessary routes to make the project work
*/

const pianoMidi         = require('easymidi')
const usbDetect         = require('usb-detection')
const ledStrip          = require('../backend/lib/expModules/lightStrip.js')
const colorEffects      = require('../backend/lib/expModules/colorEffects.js')
const express           = require('express')
const bodyParser        = require('body-parser')
const colorAppConfig    = require('../backend/config')
const colorApp          = express()
const pianoServer       = require('http').createServer(colorApp)
const io                = require('socket.io')(pianoServer)

//Default Values if Script fails or has to restart
const alpha                 = 0.5
let red                     = 128
let green                   = 128
let blue                    = 128
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
        randomShuffleOrderOnOff: 0
    }
}

colorApp.use(require('./routes')(stripOpts, express))
colorApp.use(bodyParser.urlencoded({extended: false}))

// Maximum Connections
io.setMaxListeners(5)

//Starting Monitoring Service for piano
//You need to edit the first "if"-Statemant if your piano has a other name than shown here
usbDetect.startMonitoring()
usbDetect.on('add',(device) => { 
    if(device.deviceName === "Digital_Piano") {
        console.log("Piano connected!")

        // Socket.io handling real-time piano-key hitting
        io.on('connection', (socket) => {
            console.log('Client connected!')

            // When Piano has connected the clients browser has to reload to make a connection
            // socket.emit('pianoConnect', true)

            //Edit this variable if your input-name of your piano is different than shown here
            const midiInput = new pianoMidi.Input('Digital Piano:Digital Piano MIDI 1 20:0')
            
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
                            stripOpts.lightOnColorOpts.rgba.gren        = green
                            stripOpts.lightOnColorOpts.rgba.blue        = blue
                        }

                        ledStrip.lightOn(msg.note,stripOpts)

                        // Sending piano-note-on-event to client
                        socket.emit('pianoKeyPress', msg.note)
                    }
                }else {
                    if(msg.note === msg.note) {
                        ledStrip.lightOff(msg.note, stripOpts)

                        // Sending piano-note-off-event to client
                        socket.emit('pianoKeyRelease', msg.note)
                    }
                }
            })

            socket.on('disconnect', () => {
                console.log("Client Disconnected")
            })
        })
    }
})


pianoServer.listen(colorAppConfig.server.port, "0.0.0.0")