document.addEventListener("DOMContentLoaded", () => {
    buildColorButtons()

    const colorButtons = document.getElementsByClassName("colorButtonsClass")

    Array.from(colorButtons).forEach(element => {
        element.addEventListener('click', setColor)
    })
})

//Function for generating each preset-color-button
function buildColorButtons() {
    const colorButtonsName = ["Red","Green","Blue","Orange","Purple","Cyan","Yellow","Scooter","Wine Berry",
                            "Bahama Blue","Tropical Forest","Crimson","Jade","Cerulean","Radical Red","Limeade","Grassy Green","Grenadier","LEDs Off","Default"]
    const colorCodes       = ["#800000","#008000","#000080","#ff6600","#800080","#008888","#ffff00","#2ab7ca","#651e3e",
                            "#005b96","#00664d","#d11141","#00b159","#00aedb","#ff3377","#4db300","#1eb300","#c94300","#000000","#808080"]
    const bgColors         = ["#880000","#008800","#000088","#ff6600","#880088","#00ffff","#ffff00","#2ab7ca","#651e3e",
                            "#005b96","#00664d","#d11141","#00b159","#00aedb","#ff3377","#4db300","#1eb300","#c94300","#000000","#ffffff"]
    const styleBtnIds      = ["btnRed","btnGreen","btnBlue","btnOrange","btnPurple","btnCyan","btnYellow","btnScooter","btnWBerry",
                            "btnBBlue","btnTropForest","btnCrimson","btnJade","btnCerulean","btnRRed","btnLimeade","btnGraGreen","btnGrenadier","btnOff","btnDefault"]
    const colorButtonsId   = document.getElementById("colorButtons")

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
}

//function for setting each color with a post-request
//added response handler for user note
async function setColor(event) {
    const showAlertId = document.getElementById('show-alert')
    let splitHashtag = event.target.value
    if(splitHashtag === undefined) {
    } else {
        let buttonColorValue = splitHashtag.split("#")[1]
        console.log(buttonColorValue)
        let statusMessage = await fetch(`/set-color?colorValue=${buttonColorValue}`, {
            method: 'post'
        }).then((response) => {
            return response.json()
        })
        
        if(statusMessage.statusCode === 200) {
            const alertSuccess = document.createElement("div")
            alertSuccess.setAttribute("class", "alert alert-success alert-dismissible show fade mx-auto alert-sd")
            alertSuccess.setAttribute("role", "alert")
            alertSuccess.setAttribute("id", "alertSuccess")
            alertSuccess.textContent = statusMessage.message
            showAlertId.appendChild(alertSuccess)
        } else {
            const alertWarning = document.createElement("div")
            alertWarning.setAttribute("class", "alert alert-warning alert-dismissible show fade mx-auto alert-sd")
            alertWarning.setAttribute("role", "alert")
            alertWarning.textContent = statusMessage.message
            showAlertId.appendChild(alertWarning)
        }
        const targetAlerts = document.getElementsByClassName("alert-sd")
        setTimeout(() => {
            $(targetAlerts).fadeOut()
        }, 3000)
    }
}