/*
    This section is for the two color-picker for background-color and key-color.
    For more information read here: https://github.com/Simonwep/pickr#readme
*/
// ############################## Color Picker for Custom Background- and Key-Color #####################
let colorPickerDivId            = document.getElementById('colorPickerDiv')
let showAlertId                 = document.getElementById('show-alert')
let colorPickerButton           = document.createElement('button')
let colorClear                  = false
let colPickButtonNode           = 'Color Picker'
colorPickerButton.style.color   = 'white'

colorPickerButton.setAttribute('class', 'btn m-1')
colorPickerButton.setAttribute('type', 'button')
colorPickerButton.appendChild(document.createTextNode(colPickButtonNode))

const colorPicker               = Pickr.create({
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

// #################################### Form-Color-Picker ###################################

