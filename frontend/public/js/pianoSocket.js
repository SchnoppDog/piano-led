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
    let btnGroups       = 2
    let btnCountGroup   = [2, 2]
    let btnNames        = [['Enable Pianoplay', 'Disable Pianoplay'], ['Enable Live Colors', 'Disable Live Colors']]
    let btnClass        = [['btn btn-primary', 'btn btn-danger ml-2'], ['btn btn-primary ml-5', 'btn btn-danger ml-2']]
    let btnValue        = [['enable', 'disable'], ['enable', 'disable']]
    let clickFunktions  = ['changePianoSocketState(this.value)', 'changeLiveColorState(this.value)']
    let getDocumentId   = document.getElementById('pianoOptions')
    let btnGroupDiv
    let btn

    btnGroupDiv = document.createElement('div')
    btnGroupDiv.setAttribute('class', 'mt-3')

    for(let groupCounter = 0; groupCounter < btnGroups; groupCounter++) {
        

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

async function changeLiveColorState(btnValue) {
    let changeLiveColorState
    let statusMessage
    let showAlertId = document.getElementById('piano-options-alert')

    if(btnValue === 'enable') {
        changeLiveColorState = true
        statusMessage = await fetch(`/changeLiveColorState?liveColorState=${changeLiveColorState}`, {
            method: 'post'
        }).then((response) => {
            return response.json()
        })
    } else {
        changeLiveColorState = false
        statusMessage = await fetch(`/changeLiveColorState?liveColorState=${changeLiveColorState}`, {
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

function createOnHitStyle(red, green, blue) {
    let style               = document.createElement('style')
    let whiteblbbRed        = red, whiteblbbGreen = green, whiteblbbBlue = blue
    let whitebs1Red         = red, whitebs1Green = green, whitebs1Blue = blue
    let whitebs2Red         = red, whitebs2Green = green, whitebs2Blue = blue
    let whiteblg1Red        = red, whiteblg1Green = green, whiteblg1Blue = blue
    let whiteblg2Red        = red, whiteblg2Green = green, whiteblg2Blue = blue
    let blackbRed           = red, blackbGreen = green, blackbBlue = blue
    let blackbs1Red         = red, blackbs1Green = green, blackbs1Blue = blue 
    let blackblg1Red        = red, blackblg1Green = green, blackblg1Blue = blue
    let blackblg2Red        = red, blackblg2Green = green, blackblg2Blue = blue
    let css

    whiteblbbRed - 15 <= 0 ? whiteblbbRed = 0 : whiteblbbRed = whiteblbbRed - 15
    whiteblbbGreen - 15 <= 0 ? whiteblbbGreen = 0 : whiteblbbGreen = whiteblbbGreen - 15
    whiteblbbBlue - 15 <= 0 ? whiteblbbBlue = 0 : whiteblbbBlue = whiteblbbBlue - 15

    whitebs1Red + 35 >= 255 ? whiteb1Red = 255 : whitebs1Red = whitebs1Red + 35
    whitebs1Green + 35 >= 255 ? whiteb1Green = 255 : whitebs1Green = whitebs1Green + 35
    whitebs1Blue + 35 >= 255 ? whiteb1Blue = 255 : whitebs1Blue = whitebs1Blue + 35

    whitebs2Red - 35 <= 0 ? whitebs2Red = 255 : whitebs2Red = whitebs2Red + 35
    whitebs2Green - 35 <= 0 ? whitebs2Green = 255 : whitebs2Green = whitebs2Green + 35
    whitebs2Blue - 35 <= 0 ? whitebs2Blue = 255 : whitebs2Blue = whitebs2Blue + 35

    whiteblg1Red - 75 <= 0 ? whiteblg1Red = 0 : whiteblg1Red = whiteblg1Red - 75
    whiteblg1Green - 75 <= 0 ? whiteblg1Green = 0 : whiteblg1Green = whiteblg1Green - 75
    whiteblg1Blue - 75 <= 0 ? whiteblg1Blue = 0 : whiteblg1Blue = whiteblg1Blue - 75

    whiteblg2Red + 75 >= 255 ? whiteblg2Red = 255 : whiteblg2Red = whiteblg2Red + 75
    whiteblg2Green + 75 >= 255 ? whiteblg2Green = 255 : whiteblg2Green = whiteblg2Green + 75
    whiteblg2Blue + 75 >= 255 ? whiteblg2Blue = 255 : whiteblg2Blue = whiteblg2Blue + 75

    blackbRed - 25 <= 0 ? blackbRed = 0 : blackbRed = blackbRed - 25
    blackbGreen - 25 <= 0 ? blackbGreen = 0 : blackbGreen = blackbGreen - 25
    blackbBlue - 25 <= 0 ? blackbBlue = 0 : blackbBlue = blackbBlue - 25

    blackbs1Red + 40 >= 255 ? blackbs1Red = 255 : blackbs1Red = blackbs1Red + 40
    blackbs1Green + 40 >= 255 ? blackbs1Green = 255 : blackbs1Green = blackbs1Green + 40
    blackbs1Blue + 40 >= 255 ? blackbs1Blue = 255 : blackbs1Blue = blackbs1Blue + 40

    blackblg1Red - 50 <= 0 ? blackblg1Red = 0 : blackblg1Red = blackblg1Red - 50
    blackblg1Green - 50 <= 0 ? blackblg1Green = 0 : blackblg1Green = blackblg1Green - 50
    blackblg1Blue - 50 <= 0 ? blackblg1Blue = 0 : blackblg1Blue = blackblg1Blue - 50

    blackblg2Red + 50 >= 255 ? blackblg2Red = 255 : blackblg2Red = blackblg2Red + 50
    blackblg2Green + 50 >= 255 ? blackblg2Green = 255 : blackblg2Green = blackblg2Green + 50
    blackblg2Blue + 50 >= 255 ? blackblg2Blue = 255 : blackblg2Blue = blackblg2Blue + 50

    css = `.onHitWhiteDyn {
        width: 1.5rem;
        height: 6.0rem;
        border-left: 1px solid rgba(${whiteblbbRed}, ${whiteblbbGreen}, ${whiteblbbBlue}, 1.0);
        border-bottom: 1px solid rgba(${whiteblbbRed}, ${whiteblbbGreen}, ${whiteblbbBlue}, 1.0);
        border-radius: 0 0 5px 5px;
        box-shadow: -1px 0 0 rgba(${whitebs1Red}, ${whitebs1Green}, ${whitebs1Blue},0.8) inset,0 0 5px rgba(${whitebs2Red}, ${whitebs2Green}, ${whitebs2Blue}, 0.5) inset,0 0 3px rgba(0, 0, 0, 0.2);
        background: linear-gradient(to bottom,rgba(${whiteblg2Red}, ${whiteblg2Green}, ${whiteblg2Blue}, 0.4) 0%,rgba(${whiteblg1Red}, ${whiteblg1Green}, ${whiteblg1Blue}, 1.0) 100%);
        z-index: 1;
    }
    .onHitBlackDyn {
        width: 0.8rem;
        height: 4.0rem;
        border: 1px solid rgba(${blackbRed}, ${blackbGreen}, ${blackbBlue}, 0.8);
        border-radius: 0 0 3px 3px;
        box-shadow: -1px -1px 2px rgba(${blackbs1Red}, ${blackbs1Green}, ${blackbs1Blue},0.8) inset,0 -5px 2px 3px rgba(${red}, ${green}, ${blue},0.6) inset,0 2px 4px rgba(${red}, ${green}, ${blue},0.5);
        background: linear-gradient(to bottom,rgba(${blackblg1Red}, ${blackblg1Green}, ${blackblg1Blue}, 0.4) 0%, rgba(${blackblg2Red}, ${blackblg2Green}, ${blackblg2Blue}, 1.0) 100%);
        margin-left: -0.4rem;
        margin-right: -0.4rem;
        z-index: 2;
    }`

    style.appendChild(document.createTextNode(css))

    document.head.appendChild(style)
}

createPianoLayout()
createPianoSocketButtons()

//### Socket Connections ###
// Initializing the socket.io connection to the backend
const pianoMainSocket   = io.connect('/mainPianoSocket')
const cssKeyColorSocket = io.connect('/cssKeyColorSocket')
let red                 = 128
let green               = 128
let blue                = 128
let randShufPos         = 0
let shufflePos          = 0
let isShuffle           = false
let isRandomShuffle     = false
let isLiveColor         = false

createOnHitStyle(red, green, blue)

cssKeyColorSocket.on('setCssKeyColorVars', (pianoColorConfig) => {
    if(isLiveColor) {
        red     = pianoColorConfig.rgbColor.red
        green   = pianoColorConfig.rgbColor.green
        blue    = pianoColorConfig.rgbColor.blue

        if(pianoColorConfig.isColorShuffle) {
            isShuffle = true
        } else {
            isShuffle = false
            createOnHitStyle(red, green, blue)
        }

        if(pianoColorConfig.isColorShuffleRandom) {
            isRandomShuffle = true
            randShufPos     = pianoColorConfig.randomShufflePos 
        } else {
            isRandomShuffle = false
            randShufPos     = 0
        }
    }
})

cssKeyColorSocket.on('setKeyColorButtonConfig', (pianoButtonConfig) => {
    if(pianoButtonConfig.liveColorState) {
        isLiveColor = true
    } else {
        isLiveColor = false
    }
})

// Changing the class of a key-div to active
pianoMainSocket.on('pianoKeyPress', (pianoNote) => {
    let pianoKeys = document.querySelectorAll('.pianoKey')
    let classNameWhite
    let classNameBlack

    if(isLiveColor) {
        classNameWhite = 'onHitWhiteDyn'
        classNameBlack = 'onHitBlackDyn'

        if(isShuffle) {
            if(isRandomShuffle) {
                createOnHitStyle(red, green, blue)
            }
            createOnHitStyle(red, green, blue)
        }
    } else {
        classNameWhite = 'onHitWhite'
        classNameBlack = 'onHitBlack'
    }

    pianoKeys.forEach(key => {
        if($(key).data('pianoNote') === pianoNote) {
            if(key.className.includes('white')) {
                key.setAttribute('class', `pianoKey ${classNameWhite}`)
            } else {
                key.setAttribute('class', `pianoKey ${classNameBlack}`)
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