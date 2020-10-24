/*
    This file only contains the yet to be created button in the "choose your color"-tab. 
    It is also setting each color to either background-lighting or key-color
*/

document.addEventListener("DOMContentLoaded", () => {
    buildColorButtons()

    const colorButtons = document.getElementsByClassName("colorButtonsClass")

    Array.from(colorButtons).forEach(element => {
        element.addEventListener('click', setColor)
    })
})

//Function for generating each preset-color, random-color and random-color per press
function buildColorButtons() {
    const colorButtonsName = ["Red","Green","Blue","Orange","Purple","Cyan","Yellow","Scooter","Wine Berry",
                            "Bahama Blue","Tropical Forest","Crimson","Jade","Cerulean","Radical Red","Limeade","Grassy Green","Grenadier","LEDs Off","Default", "Random", "Rand p. Press"]
    const colorCodes       = ["#800000","#008000","#000080","#ff6600","#800080","#008888","#ffff00","#2ab7ca","#651e3e",
                            "#005b96","#00664d","#d11141","#00b159","#00aedb","#ff3377","#4db300","#1eb300","#c94300","#000000","#808080", "none", "none"]
    const bgColors         = ["#880000","#008800","#000088","#ff6600","#880088","#00ffff","#ffff00","#2ab7ca","#651e3e",
                            "#005b96","#00664d","#d11141","#00b159","#00aedb","#ff3377","#4db300","#1eb300","#c94300","#000000","#ffffff", "none", "none"]
    const styleBtnIds      = ["btnRed","btnGreen","btnBlue","btnOrange","btnPurple","btnCyan","btnYellow","btnScooter","btnWBerry",
                            "btnBBlue","btnTropForest","btnCrimson","btnJade","btnCerulean","btnRRed","btnLimeade","btnGraGreen","btnGrenadier","btnOff","btnDefault", "randomColor", "randPerPress"]
    const colorButtonsId   = document.getElementById("colorButtons")
    //const customColPicker  = document.getElementById("customColorPicker")

    for(let counter = 0; counter < colorCodes.length; counter++) {
        let button      = document.createElement("button")
        let node        = colorButtonsName[counter]
        let value       = colorCodes[counter]

        button.setAttribute("class", "btn m-1")
        button.setAttribute("id", `${styleBtnIds[counter]}`)
        button.setAttribute("style", `background-color: ${bgColors[counter]};`)
        button.setAttribute("type", "button")
        button.setAttribute("value", value)
        button.appendChild(document.createTextNode(node))
        colorButtonsId.appendChild(button)
    }
    let customColorButton   = document.createElement("button")
    let customColorNode     = "Color Picker"
    let customColorId       = "colorPicker"     
    
    customColorButton.setAttribute("class", "btn m-1")
    customColorButton.setAttribute("id", `${customColorId}`)
    customColorButton.setAttribute("type", "button")
    customColorButton.appendChild(document.createTextNode(customColorNode))
}

//function for setting each color with a post-request
//added response handler for user note
async function setColor(event) {
    const showAlertId       = document.getElementById('show-alert')
    let splitHashtag        = event.target.value
    let statusMessage

    if(event.target.id === "randomColor") {
        statusMessage = await fetch(`/random-color`, {
            method: 'post'
        }).then((response) => {
            return response.json()
        })

    } else if(event.target.id === "randPerPress") {
        statusMessage = await fetch(`/random-color-per-press`, {
            method: 'post'
        }).then((response) => {
            return response.json()
        })
    } else if(event.target.id === "colorButtons") {

    } else {
        if(splitHashtag !== undefined) { 
            let buttonColorValue = splitHashtag.split("#")[1]
            statusMessage = await fetch(`/set-color?colorValue=${buttonColorValue}`, {
                method: 'post'
            }).then((response) => {
                return response.json()
            })
        }
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