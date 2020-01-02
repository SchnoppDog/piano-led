const pianoMidi = require('easymidi')
const keyNames  = require('../expModules/keyNames')
const ledStrip  = require('../expModules/lightStrip')
const isPiano   = require('../expModules/existPiano')
const pianoAvail = isPiano.getPiano("lsusb",(res) => {
})
console.log(pianoAvail)

// if(pianoAvail === true) {
//     const midiInput = new pianoMidi.Input('Digital Piano:Digital Piano MIDI 1 20:0')
//     midiInput.on('noteon', (msg) => {
//         if(msg.velocity > 0 ) {
//             if(keyNames.getKeyName(msg.note) === keyNames.getKeyName(msg.note)) {
//                 ledStrip.lightOn(msg.note)
//             }
//         }else {
//             if(keyNames.getKeyName(msg.note) === keyNames.getKeyName(msg.note)) {
//                 ledStrip.lightOff(msg.note)
//             }
//         }
//     })
// } else {
//     console.log("No Piano found!")
// }

/*if-statement like above isn't needed necessary.
you can write also: 
if(msg.note === msg.note) {
    //do somehting
}
*/