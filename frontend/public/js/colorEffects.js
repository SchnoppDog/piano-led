async function randomColor() {
    let res = await fetch(`/random-color`, {
        method: 'post'
    }).then((response) => {
        return response.json()
    })
    const showAlertId = document.getElementById('show-alert-randomColor')

    if(res.statusCode === 200) {
        const alertSuccess = document.createElement("div")
        alertSuccess.setAttribute("class", "alert alert-success alert-dismissible show fade mx-auto alert-sd")
        alertSuccess.setAttribute("role", "alert")
        alertSuccess.setAttribute("id", "alertSuccess")
        alertSuccess.textContent = res.message
        showAlertId.appendChild(alertSuccess)
    } else {
        const alertWarning = document.createElement("div")
        alertWarning.setAttribute("class", "alert alert-danger alert-dismissible show fade mx-auto alert-sd")
        alertWarning.setAttribute("role", "alert")
        alertWarning.textContent = res.message
        showAlertId.appendChild(alertWarning)
    }
    const targetAlerts = document.getElementsByClassName("alert-sd")
    setTimeout(() => {
        $(targetAlerts).fadeOut()
    }, 3000)
}

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
        const alertSuccess = document.createElement("div")
        alertSuccess.setAttribute("class", "alert alert-success alert-dismissible show fade mx-auto alert-sd")
        alertSuccess.setAttribute("role", "alert")
        alertSuccess.setAttribute("id", "alertSuccess")
        alertSuccess.textContent = res.message
        showAlertId.appendChild(alertSuccess)
    } else if(res.statusCode === 205) {
        const alertWarning = document.createElement("div")
        alertWarning.setAttribute("class", "alert alert-warning alert-dismissible show fade mx-auto alert-sd")
        alertWarning.setAttribute("role", "alert")
        alertWarning.textContent = res.message
        showAlertId.appendChild(alertWarning)
    } else {
        const alertDanger = document.createElement("div")
        alertDanger.setAttribute("class", "alert alert-danger alert-dismissible show fade mx-auto alert-sd")
        alertDanger.setAttribute("role", "alert")
        alertDanger.textContent = res.message
        showAlertId.appendChild(alertDanger)
    }
    const targetAlerts = document.getElementsByClassName("alert-sd")
    setTimeout(() => {
        $(targetAlerts).fadeOut()
    }, 3000)
}

randomColorButton()