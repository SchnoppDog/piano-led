const scaleNotes    = ['C', 'C-Flat', 'D','D-Flat', 'E', 'F', 'F-Flat', 'G', 'G-Flat', 'A', 'A-Flat', 'B']
const scaleLength   = scaleNotes.length
const baseScale     = 2     // Base note is C0, but C0 === 24 as note. So scale needs to be 0 with: 24 / scaleLength (12) - 2 = 0
                            // Getting higher i.e. C1 === 36: 36 / 12 - 2 = 1 and so on...

function _convertToPianoScale(note) {
    let scale
    let stringNote
    let noteInScaleNotes

    noteInScaleNotes    = note % scaleLength
    stringNote          = scaleNotes[noteInScaleNotes]
    scale               = note / scaleLength - baseScale
    scale               = Math.floor(scale)
    stringNote          = `${stringNote} ${scale}`

    return stringNote
}

function _returnPianoScaleNum(note) {
    let scale

    scale = Math.floor(note / scaleLength - baseScale)

    return scale
}

function _returnPianoStringNote(note) {
    let stringNote
    let noteInScaleNotes

    noteInScaleNotes    = note % scaleLength
    stringNote          = scaleNotes[noteInScaleNotes]

    return stringNote
}

module.exports.convertToPianoScale = (note) => {
    return _convertToPianoScale(note)
}

module.exports.getPianoScaleNum = (note) => {
    return _returnPianoScaleNum(note)
}

module.exports.getPianoStringNote = (note) => {
    return _returnPianoStringNote(note)
}