//Making a post to set the random-color
//Different response-cases are shown in different ways

//global variables:
let counterBgColorOnOff = 1

//Setting the random-color for the keys
async function randomColor() {
    let res = await fetch(`/random-color`, {
        method: 'post'
    }).then((response) => {
        return response.json()
    })
    const showAlertId = document.getElementById('show-alert-colorEffects')

    if(res.statusCode === 200) {
        createAlert(showAlertId, res.message, 'success')
    } else {
        createAlert(showAlertId, res.message, 'danger')
    }
}

//Set the css-style and behaviour of the random-color-button
function randomColorButton() {
    let buttonId        = document.getElementById("randomColor")
    let bgLightButtonId = document.getElementById("bg-lighting-rand-color")
    let r,g,b
    let red = [], green = [], blue = []

    for(let i = 0; i < 4; i++) {
        r = Math.round(Math.random()*255)
        g = Math.round(Math.random()*255)
        b = Math.round(Math.random()*255)

        red.push(r)
        green.push(g)
        blue.push(b)
    }
    
    let css = 
    `#randomColor { background-color: rgb(${red[0]},${green[1]},${blue[2]}); color: white; }
    #randomColor:hover { background-image: linear-gradient(120deg, rgb(${red[0]},${green[0]},${blue[0]}), rgb(${red[1]},${green[1]},${blue[1]}), rgb(${red[2]},${green[2]},${blue[2]}), rgb(${red[3]},${green[3]},${blue[3]})); }
    #bg-lighting-rand-color { background-color: rgb(${red[0]},${green[1]},${blue[2]}); color: white; }
    #bg-lighting-rand-color:hover { background-image: linear-gradient(120deg, rgb(${red[0]},${green[0]},${blue[0]}), rgb(${red[1]},${green[1]},${blue[1]}), rgb(${red[2]},${green[2]},${blue[2]}), rgb(${red[3]},${green[3]},${blue[3]})); }`

    let style = document.createElement("style")
    if(style.styleSheet) {
        style.styleSheet.cssText = css
    } else {
        style.appendChild(document.createTextNode(css))
    }
    buttonId.appendChild(style)
    bgLightButtonId.appendChild(style)
}

//Setting and deactivating the freeze-option
//Ads a response-handler
async function keyFreeze(event) {
    const showAlertId = document.getElementById('key-freeze-alert')
    let isFreeze
    let freezeTime
    let res
    if(!event) {
        isFreeze   = false
        freezeTime = 0
        res        = await fetch(`key-freeze?freeze_time=${freezeTime}&is_freeze=${isFreeze}`, {
            method: 'post'
        }).then((response) => {
            return response.json()
        })
        console.log(false)
    } else {
        event.preventDefault()
        let inputField = document.getElementById("timeFreeze")
        freezeTime     = inputField.value
        isFreeze       = true
        res            = await fetch(`key-freeze?freeze_time=${freezeTime}&is_freeze=${isFreeze}`, {
            method: 'post'
        }).then((response) => {
            return response.json()
        })
        inputField.value = ''
    }

    if(res.statusCode === 200) {
        createAlert(showAlertId, res.message, 'success')
    } else if(res.statusCode === 205) {
        createAlert(showAlertId, res.message, 'warning')
    } else {
        createAlert(showAlertId, res.message, 'danger')
    }
}

//Setting either general background-lighting to on or off and setting the color
async function setBgLighting(btnValue) {
    const showAlertId = document.getElementById('show-alert-bgLighting')
    let res
    if(btnValue === 'BG-Color') {
        let bgColor = true
        res         = await fetch(`/bg-lighting?bgColor=${bgColor}`, {
            method: 'post'
        }).then((response) => {
            return response.json()
        })

        if(res.statusCode === 200) {
            createAlert(showAlertId, res.message, 'success')
        } else {
            createAlert(showAlertId, res.message, 'warning')
        }
    } else if(btnValue === 'BG-Color-On-Off') {
        counterBgColorOnOff++

        let bgColorOnOff    = true
        res                 = await fetch(`/bg-lighting-on-off?bgColorOnOff=${bgColorOnOff}`, {
            method: 'post'
        }).then((response) => {
            return response.json()
        })

        //Button-Behaviour if for each background-button-on/off press
        if(res.bgState === 'true') {
            document.getElementById('change-bg-lighting').removeAttribute('disabled')
            document.getElementById('bg-lighting-rand-color').removeAttribute('disabled')
            document.getElementById('bgColorPicker').removeAttribute('disabled')
            document.getElementById('change-bg-lighting').style.cursor      = 'auto'
            document.getElementById('bg-lighting-rand-color').style.cursor  = 'auto'
            document.getElementById('bgColorPicker').style.cursor           = 'auto'
            
        } else {
            document.getElementById('change-bg-lighting').setAttribute('disabled', "true")
            document.getElementById('bg-lighting-rand-color').setAttribute('disabled', 'true')
            document.getElementById('bgColorPicker').setAttribute('disabled', 'true')
            document.getElementById('change-bg-lighting').style.cursor      = "wait"
            document.getElementById('bg-lighting-rand-color').style.cursor  = "wait"
            document.getElementById('bgColorPicker').style.cursor           = 'wait'
        }

        if(res.statusCode === 200) {
            createAlert(showAlertId, res.message, 'success')
        } else {
            createAlert(showAlertId, res.message, 'danger')
        }
    }
}

//Setting the random color as background-color
async function setBgRandomLighting() {
    const showAlertId = document.getElementById('show-alert-bgLighting')
    let res           = await fetch('/bg-lighting-random', {
        method: 'post'
    }).then((response) => {
        return response.json()
    })
    console.log(res.message)
    if(res.statusCode === 200) {
        createAlert(showAlertId, res.message, 'success')
    } else {
        createAlert(showAlertId, res.message, 'danger')
    }
}

document.addEventListener('DOMContentLoaded', () => {
    randomColorButton()
})
