const pianoMidi = require('easymidi')
const pianoUsb = require('usb-detection')
console.log(pianoMidi.getInputs())
pianoUsb.startMonitoring()
pianoUsb.find((err, devices) => {
    console.log(devices)
})