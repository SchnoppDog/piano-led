/*
    This file takes care of the real-time function between the server and the piano keys hit.
*/

// Creating the 88 Key-Layout of a standard piano.
function createPianoLayout() {
    const totalKeys     = 88
    const pianoDiv      = document.getElementById('pianoLayout')
    let pianoKey        = 9
    let pianoKeyPattern = ['white', 'black', 'white', 'black', 'white', 'white', 'black', 'white', 'black', 'white', 'black', 'white']
    let pianoNote       = 21

    for(counter = 1; counter <= totalKeys; counter++) {
        if(pianoKey === pianoKeyPattern.length) {
            pianoKey = 0
        }

        let pianoKeyDiv = document.createElement('div')
        pianoKeyDiv.setAttribute('class', `pianoKey ${pianoKeyPattern[pianoKey]}`)
        $(pianoKeyDiv).data("pianoNote", pianoNote) // Using JQuery here to set an arbitary data-value needed for the active-keys
        pianoDiv.appendChild(pianoKeyDiv)
        pianoKey++
        pianoNote++
    }
}

createPianoLayout()

// Initializing the socket.io connection to the backend
const socket = io()

// Changing the class of a key-div to active
socket.on('pianoKeyPress', (pianoNote) => {
    console.log(pianoNote)
    let pianoKeys = document.querySelectorAll('.pianoKey')

    pianoKeys.forEach(key => {
        if($(key).data('pianoNote') === pianoNote) {
            if(key.className.includes('white')) {
                key.setAttribute('class', 'pianoKey onHitWhite')
            } else {
                key.setAttribute('class', 'pianoKey onHitBlack')
            }
        }
    })
})

// Changing the class of a key-div to normal
socket.on('pianoKeyRelease', (pianoNote) => {
    let pianoKeys = document.querySelectorAll('.pianoKey')

    pianoKeys.forEach(key => {
        if($(key).data('pianoNote') == pianoNote) {
            if(key.className.includes('onHitWhite')) {
                key.setAttribute('class', 'pianoKey white')
            } else {
                key.setAttribute('class', 'pianoKey black')
            }
        }
    })
})

// Reloading page when piano has connected
socket.on('pianoConnect', (isConnected) => {
    if(isConnected) {
        location.reload()
    }
})