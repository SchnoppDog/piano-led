const socket = io()

socket.on('pianoKeyPress', (msg) => {
    console.log(msg)
})