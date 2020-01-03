const pianoMidi = require('easymidi')
const usbDetect = require('usb-detection')
const keyNames  = require('../expModules/keyNames')
const ledStrip  = require('../expModules/lightStrip')

usbDetect.startMonitoring()
usbDetect.on('add',(device) => { 
    if(device.deviceName === "Digital_Piano") {
        console.log("Piano connected!")
        const midiInput = new pianoMidi.Input('Digital Piano:Digital Piano MIDI 1 20:0')
        midiInput.on('noteon', (msg) => {
            if(msg.velocity > 0 ) {
                if(keyNames.getKeyName(msg.note) === keyNames.getKeyName(msg.note)) {
                    ledStrip.lightOn(msg.note)
                }
            }else {
                if(keyNames.getKeyName(msg.note) === keyNames.getKeyName(msg.note)) {
                    ledStrip.lightOff(msg.note)
                }
            }
        })
    }
})

usbDetect.on('remove',(device) => {
    if(device.deviceName === "Digital_Piano") {
        console.log('Piano disconnected!')
    }
})
    // })

/*if-statement like above isn't needed necessary.
you can write also: 
if(msg.note === msg.note) {
    //do somehting
}
*/