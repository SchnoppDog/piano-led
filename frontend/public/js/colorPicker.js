/*
    This section is for the two color-picker for background-color and key-color.
    For more information read here: https://github.com/Simonwep/pickr#readme
*/
// ############################## Color Picker for Custom Background- and Key-Color #####################
function customColor() {
    let colorPickerDivId            = document.getElementById('colorPickerDiv')
    let showAlertId                 = document.getElementById('show-alert')
    let colorPickerButton           = document.createElement('button')
    let colorClear                  = false
    let colPickButtonNode           = 'Color Picker'
    colorPickerButton.style.color   = 'white'

    colorPickerButton.setAttribute('class', 'btn m-1')
    colorPickerButton.setAttribute('type', 'button')
    colorPickerButton.appendChild(document.createTextNode(colPickButtonNode))

    const colorPicker               = new Pickr({
        el: colorPickerButton,
        container: 'div',
        theme: 'classic',
        default: '#000000',
        defaultRepresentation: 'RGBA',
        useAsButton: true,
        position: 'right-start',
        swatches: [
            'rgba(255,255,255,1)',
            'rgba(255,0,0,1)',
            'rgba(0,255,0,1)',
            'rgba(0,0,255,1)',
            'rgba(255,102,0,1)',
            'rgba(255,0,255,1)',
            'rgba(0,255,255,1)',
            'rgba(255,255,0,1)',
            'rgba(42,183,202,1)',
            'rgba(101,30,62,1)',
            'rgba(0,91,150,1)',
            'rgba(0,102,77,1)',
            'rgba(209,17,65,1)',
            'rgba(0,177,89,1)',
            'rgba(0,174,219,1)',
            'rgba(255,51,119,1)',
            'rgba(77,179,0,1)',
            'rgba(30,179,0,1)',
            'rgba(201,67,0,1)'
        ],

        components: {
            preview: true,
            opacity: false,
            hue: true,

            // Input / output Options
            interaction: {
                hex: false,
                rgba: true,
                hsla: false,
                hsva: false,
                cmyk: false,
                input: true,
                cancel: true,
                clear: true,
                save: true
            }
        }
    })

    colorPickerDivId.appendChild(colorPickerButton)

    colorPicker.on('init', pickr => {
        colorPickerButton.style.backgroundColor    = pickr.getColor().toRGBA().toString(0)
    }).on('change', (color, pickr) => {
        colorPickerButton.style.backgroundColor    = pickr.getColor().toRGBA().toString(0)
    }).on('clear', pickr => {
        // colorPickerButton.innerHTML                = pickr.getColor().toRGBA().toString(0)
        colorPickerButton.style.backgroundColor    = '#000000'
        colorClear                              = true
        pickr.setColor('#000000')
        pickr.show()
    }).on('cancel', pickr => {
        pickr.hide()
    }).on('save', async (color, pickr) => {
        let colorRgba

        if(colorClear === true) {
            colorClear      = false
            colorRgba       = [0, 0, 0]

            let res         = await fetch(`custom-color?red=${colorRgba[0]}&green=${colorRgba[1]}&blue=${colorRgba[2]}`, {
                method: 'post'
            }).then((response) => {
                return response.json()
            })

            createAlert(showAlertId, res.message, 'success')
        } else {
            if(color === null) {
                colorRgba       = [0, 0, 0]
            } else {
                colorRgba       = pickr.getSelectedColor().toRGBA()

                let res         = await fetch(`custom-color?red=${colorRgba[0]}&green=${colorRgba[1]}&blue=${colorRgba[2]}`, {
                    method: 'post'
                }).then((response) => {
                    return response.json()
                })

                createAlert(showAlertId, res.message, 'success')
                pickr.hide()
            }
        }
    })
}

// #################################### Form-Color-Picker ###################################

function createColorShuffleForm(event) {
    const showAlertId       = document.getElementById("colorShuffleAlert")
    let getShuffleInputId   = document.getElementById("shuffleColorInputs")
    let shuffleInput        = document.getElementById("shuffleInputNumber")
    let inputNumber         = shuffleInput.value
    let isColorShuffle      = false
    let colorArrayRed       = []
    let colorArrayGreen     = []
    let colorArrayBlue      = []
    let colorRGBA           = []

    //console.log(event.submitter.id)

    if(!event) {
        console.log("No Event! isColorShuffle set to false")
        isColorShuffle = false
        shuffleInput.value = ''
        getShuffleInputId.innerHTML = ''

    } else {
        if(inputNumber < 2) {
            event.preventDefault()
            shuffleInput.value          = ''
            createAlert(showAlertId, 'Input-number is too low! Choose a higher number!', 'warning')
        } else if(inputNumber > 6) {
            event.preventDefault()
            shuffleInput.value          = ''
            createAlert(showAlertId, 'Input-number it too high! Choose a lower number!', 'warning')
        } else {
            console.log("An Event happend! isColorShuffle set to true")
            event.preventDefault()

            let createForm              = document.createElement("form")
            let createSubmitButton      = document.createElement("button")
            let createDivFormGroup      = document.createElement("div")
            let createDivFormRow
            let shufflePicker
            let createShuffleColorInput
            let shuffleInputArray       = []

            shuffleInput.value          = ''
            getShuffleInputId.innerHTML = ''
            isColorShuffle              = true
            createDivFormGroup.setAttribute("class", "form-group")

            for(let counter = 0; counter < inputNumber; counter++) {
                if(counter % 3 === 0) {
                    createDivFormRow    = document.createElement("div")
                    createDivFormRow.setAttribute("class", "form-row")
                    createDivFormGroup.appendChild(createDivFormRow)
                }

                let createDivCol            = document.createElement("div")
                createShuffleColorInput     = document.createElement("input")
                shuffleInputArray[counter]  = createShuffleColorInput

                createShuffleColorInput.setAttribute("type", "button")
                createShuffleColorInput.setAttribute("class", "form-control mt-1 mb-1")
                createShuffleColorInput.setAttribute("value", `Color ${counter+1}`)
                createShuffleColorInput.style.color = 'white'
                createDivCol.setAttribute("class", "col-sm")
                createDivCol.appendChild(shuffleInputArray[counter])
                createDivFormRow.appendChild(createDivCol)

                $(createShuffleColorInput).data('inputNumber', counter+1)

                createSubmitButton.setAttribute("type", "button")
                createSubmitButton.setAttribute("class", "btn btn-primary mb-2")
                createSubmitButton.innerHTML = 'Submit'
                createForm.appendChild(createDivFormGroup)
                createForm.appendChild(createSubmitButton)
                getShuffleInputId.appendChild(createForm)

                shufflePicker               = Pickr.create({
                    el: shuffleInputArray[counter],
                    container: 'div',
                    theme: 'classic',
                    default: '#000000',
                    defaultRepresentation: 'RGBA',
                    useAsButton: true,
                    position: 'right-start',
                    swatches: [
                        'rgba(255,255,255,1)',
                        'rgba(255,0,0,1)',
                        'rgba(0,255,0,1)',
                        'rgba(0,0,255,1)',
                        'rgba(255,102,0,1)',
                        'rgba(255,0,255,1)',
                        'rgba(0,255,255,1)',
                        'rgba(255,255,0,1)',
                        'rgba(42,183,202,1)',
                        'rgba(101,30,62,1)',
                        'rgba(0,91,150,1)',
                        'rgba(0,102,77,1)',
                        'rgba(209,17,65,1)',
                        'rgba(0,177,89,1)',
                        'rgba(0,174,219,1)',
                        'rgba(255,51,119,1)',
                        'rgba(77,179,0,1)',
                        'rgba(30,179,0,1)',
                        'rgba(201,67,0,1)'
                    ],
            
                    components: {
                        preview: true,
                        opacity: false,
                        hue: true,
            
                        // Input / output Options
                        interaction: {
                            hex: false,
                            rgba: true,
                            hsla: false,
                            hsva: false,
                            cmyk: false,
                            input: true,
                            cancel: true,
                            clear: true,
                            save: true
                        }
                    }
                })

                shufflePicker.on('init', pickr => {
                    shuffleInputArray[counter].style.backgroundColor    = pickr.getColor().toRGBA().toString(0)
                }).on('clear', pickr => {
                    shuffleInputArray[counter].style.backgroundColor    = '#000000'
                    pickr.setColor('#000000')
                    pickr.show()
                }).on('cancel', pickr => {
                    pickr.hide()
                }).on('save', (color, pickr) => {
                    if(pickr !== null) {
                        shuffleInputArray[counter].style.backgroundColor    = pickr.getColor().toRGBA().toString(0)
                        colorRGBA                                           = pickr.getSelectedColor().toRGBA()
                    } else {
                        shuffleInputArray[counter].style.backgroundColor    = '#000000'
                        colorRGBA                                           = [0, 0, 0]
                    }
                    // console.log("Array-Element No: ", $(shuffleInputArray[counter]).data('inputNumber'), " With Color-RGBA: ", pickr.getColor().toRGBA())


                    /*
                        Idee funktioniert soweit, muss dann noch weiter bearbeitet werden. Nächster Schritt wäre die Color-Values so aufzubereiten, dass diese mittels submit-button und vllt einer neuen Funktion an eine Route verschickt werden.
                    */
                    colorArrayRed[$(shuffleInputArray[counter]).data('inputNumber')]    = colorRGBA[0]
                    colorArrayGreen[$(shuffleInputArray[counter]).data('inputNumber')]  = colorRGBA[1]
                    colorArrayBlue[$(shuffleInputArray[counter]).data('inputNumber')]   = colorRGBA[2]

                    console.log("Array-Element No: ", $(shuffleInputArray[counter]).data('inputNumber'), " With Color-RGBA: ", colorArrayRed[$(shuffleInputArray[counter]).data('inputNumber')], " ", colorArrayGreen[$(shuffleInputArray[counter]).data('inputNumber')], " ", colorArrayBlue[$(shuffleInputArray[counter]).data('inputNumber')])

                    pickr.hide()
                })
            }

        }
    }

}

// ################################## Color Picker Test ############################

function addNewColorPicker() {
    const container = document.getElementById("picker")
    const newElement = document.createElement("div")

    container.appendChild(newElement)

    const pickr = new Pickr({
        el: newElement,
        default: '#42445A',
        theme: 'classic',
        lockOpacity: true,

        swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)',
        'rgba(255, 193, 7, 1)'
        ],

        components: {
        preview: true,
        opacity: true,
        hue: true,

        interaction: {
            hex: true,
            rgba: true,
            hsva: true,
            input: true,
            clear: true,
            save: true
        }
        }
  })
  pickr.on('save', (color, picker) => {
      console.log('save', color, picker)
  })
}



// #################################### Call all functions ################################
customColor()