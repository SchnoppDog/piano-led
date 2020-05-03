document.addEventListener("DOMContentLoaded", () => {
    generateColorButtons()

    const colorButtons = document.getElementsByClassName("colorButtonsClass")

    Array.from(colorButtons).forEach(element => {
        element.addEventListener('click', setColor)
    })
})

function generateColorButtons() {
    const colorButtonsName = ["Red","Green","Blue","Orange","Purple","Cyan","Yellow","LEDs Off","Default"]
    const colorCodes       = ["#800000","#008000","#000080","#ff6600","#800080","#008888","#ffff00","#000000","#808080"]
    const bgColors         = ["#880000","#008800","#000088","#ff6600","#880088","#00ffff","#ffff00","#000000","#ffffff"]
    const styleBtnIds      = ["btnRed","btnGreen","btnBlue","btnOrange","btnPurple","btnCyan","btnYellow","btnOff","btnDefault"]
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

async function setColor(event) {
    let splitHashtag     = event.target.value
    if(splitHashtag === undefined) {
    } else {
        let buttonColorValue = splitHashtag.split("#")[1]
        console.log(buttonColorValue)
        let res              = await fetch(`/setColor/${buttonColorValue}`)
        // let statusCode       = res.json()
    }
}