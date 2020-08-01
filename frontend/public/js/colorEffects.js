//Making a post to set the random-color
//Different response-cases are shown in different ways

//global variables:
let counterBgColorOnOff = 1

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
    let buttonId = document.getElementById("randomColor")
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
    `#randomColor { background-color: rgb(${red[0]},${green[1]},${blue[2]});
                    color: white; }
    #randomColor:hover { background-image: linear-gradient(120deg, rgb(${red[0]},${green[0]},${blue[0]}), rgb(${red[1]},${green[1]},${blue[1]}), rgb(${red[2]},${green[2]},${blue[2]}), rgb(${red[3]},${green[3]},${blue[3]})); }`

    let style = document.createElement("style")
    if(style.styleSheet) {
        style.styleSheet.cssText = css
    } else {
        style.appendChild(document.createTextNode(css))
    }
    buttonId.appendChild(style)
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
        console.log(isFreeze)
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
        console.log(true)
    }

    if(res.statusCode === 200) {
        createAlert(showAlertId, res.message, 'success')
    } else if(res.statusCode === 205) {
        createAlert(showAlertId, res.message, 'warning')
    } else {
        createAlert(showAlertId, res.message, 'danger')
    }
}

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

        if(counterBgColorOnOff % 2 === 0) {
            document.getElementById('change-bg-lighting').removeAttribute('disabled')
        } else {
            document.getElementById('change-bg-lighting').setAttribute('disabled', "true")
        }

        let bgColorOnOff    = true
        res                 = await fetch(`/bg-lighting-on-off?bgColorOnOff=${bgColorOnOff}`, {
            method: 'post'
        }).then((response) => {
            return response.json()
        })

        if(res.statusCode === 200) {
            createAlert(showAlertId, res.message, 'success')
        } else {
            createAlert(showAlertId, res.message, 'danger')
        }
    }
}

randomColorButton()