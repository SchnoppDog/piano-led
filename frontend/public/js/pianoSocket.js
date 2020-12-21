const socket = io()

socket.on('pianoKeyPress', (pianoNote, pianoScale, stringNote) => {
    console.log('Piano-Note: ', pianoNote)
    console.log('Piano-Scale: ', pianoScale)
    console.log('String-Note: ', stringNote)
})