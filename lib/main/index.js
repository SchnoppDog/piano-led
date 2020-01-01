const pianoMidi = require('easymidi')
const keyNames = require('../expModules/keyNames')
const ledStrip = require('../expModules/lightStrip')
// const dotstar = require('dotstar')
// const SPI = require('pi-spi')
// const spi = SPI.initialize('/dev/spidev0.1')
const midiInput = new pianoMidi.Input('Digital Piano:Digital Piano MIDI 1 20:0')
// const stripLength = 144
// const strip = new dotstar.Dotstar(spi, {
//     length: stripLength
// })

// strip.all(0,0,0)
// strip.sync()
midiInput.on('noteon', (msg) => {
    if(msg.velocity > 0 ) {
        if(keyNames.getKeyName(msg.note) === keyNames.getKeyName(msg.note)) {
            //console.log(`LED HIGH; Note: ${keyNames.getKeyName(msg.note)}`)
            //strip.set(143,0,0,0)
            // strip.all(255,0,255)
            // strip.sync()
            ledStrip.lightOn(msg.note)
        }
    }else {
        if(keyNames.getKeyName(msg.note) === keyNames.getKeyName(msg.note)) {
            //console.log(`LED LOW; Note: ${keyNames.getKeyName(msg.note)}\n`)
            //strip.set(143,255,0,255,0.5)
            // strip.all(0,0,0)
            // strip.sync()
            ledStrip.lightOff(msg.note)
        }
    }
})
// strip.all(0,0,0)
// strip.sync()