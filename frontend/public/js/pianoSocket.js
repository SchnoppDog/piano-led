/*
    This file takes care of the real-time function between the server and the piano keys hit.
    It also manages other components directly intertwined with this feature like setting real-time-play on and off.
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

// Creating buttons with individual functions for each real-time pianoplay-feature
function createPianoSocketButtons() {
    let btnGroups       = 1
    let btnCountGroup   = [2]
    let btnNames        = [['Enable Pianoplay', 'Disable Pianoplay']]
    let btnClass        = [['btn btn-primary', 'btn btn-danger ml-2']]
    let btnValue        = [['enable', 'disable']]
    let clickFunktions  = ['changePianoSocketState(this.value)']
    let getDocumentId   = document.getElementById('pianoOptions')
    let btnGroupDiv
    let btn

    for(let groupCounter = 0; groupCounter < btnGroups; groupCounter++) {
        btnGroupDiv = document.createElement('div')
        btnGroupDiv.setAttribute('class', 'mt-3')

        for(let btnCounter = 0; btnCounter < btnCountGroup[groupCounter]; btnCounter++) {
            btn = document.createElement('button')

            btn.setAttribute('class', `${btnClass[groupCounter][btnCounter]}`)
            btn.setAttribute('value', `${btnValue[groupCounter][btnCounter]}`)
            btn.setAttribute('type', 'button')
            btn.setAttribute('onclick', `${clickFunktions[groupCounter]}`)
            btn.innerHTML = `${btnNames[groupCounter][btnCounter]}`

            btnGroupDiv.appendChild(btn)
        }
        getDocumentId.append(btnGroupDiv)
    }
}

// Setting the real-time pianoplay on or off
async function changePianoSocketState(btnValue) {
    let changePianoSocketState
    let statusMessage
    let showAlertId = document.getElementById('piano-options-alert')

    if(btnValue === 'enable') {
        changePianoSocketState  = true
        statusMessage           = await fetch(`/changePianoSocketState?pianoSocketState=${changePianoSocketState}`, {
            method: 'post'
        }).then((response) => {
            return response.json()
        })
    } else {
        changePianoSocketState  = false
        statusMessage           = await fetch(`/changePianoSocketState?pianoSocketState=${changePianoSocketState}`, {
            method: 'post'
        }).then((response) => {
            return response.json()
        })
    }

    if(statusMessage !== undefined) {
        if(statusMessage.statusCode >= 200 && statusMessage.statusCode <= 299) {
            createAlert(showAlertId, `${statusMessage.message}`, 'success')
        } else if(statusMessage.statusCode >= 300 && statusMessage.statusCode <= 399) {
            createAlert(showAlertId, statusMessage.message, 'warning')
        } else if(statusMessage.statusCode >= 400 && statusMessage.statusCode <= 499) {
            createAlert(showAlertId, `${statusMessage.message}`, 'danger')
        }
    }
}

createPianoLayout()
createPianoSocketButtons()

//### Socket Connections ###
// Initializing the socket.io connection to the backend
// const socket = io()
const cssKeyColorSocket = io.connect('/cssKeyColorSocket')
const pianoMainSocket   = io.connect('/mainPianoSocket')
let red = 128, green = 128, blue = 128
let randShufPos = 0

cssKeyColorSocket.on('setCssKeyColorVars', (pianoColorConfig, r, g, b) => {
    red = r
    green = g
    blue = b
    console.log(pianoColorConfig)
    console.log(r, g, b)
})

// Changing the class of a key-div to active
pianoMainSocket.on('pianoKeyPress', (pianoNote) => {
    let pianoKeys = document.querySelectorAll('.pianoKey')
    console.log(red, green, blue)

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
pianoMainSocket.on('pianoKeyRelease', (pianoNote) => {
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
// socket.on('pianoConnect', (isConnected) => {
//     if(isConnected) {
//         location.reload()
//     }
// })