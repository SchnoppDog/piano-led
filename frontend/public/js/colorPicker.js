let keyColorPicker              = document.getElementById('keyColorPicker')
let bgColorPicker               = document.getElementById('bgColorPicker')
let showKeyAlertId              = document.getElementById('show-alert-key-picker')
let showBgAlertId               = document.getElementById('show-alert-bgLighting')
let keyClear                    = false
let bgClear                     = false
bgColorPicker.style.color       = 'white'
keyColorPicker.style.color      = 'white'

const keyPickr                  = Pickr.create({
    el: keyColorPicker,
    container: 'div',
    theme: 'classic', // or 'monolith', or 'nano'
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
        'rgba(255,255,0,1)'
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

const bgPickr = Pickr.create({
    el: bgColorPicker,
    container: 'div',
    theme: 'classic', // or 'monolith', or 'nano'
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
        'rgba(255,255,0,1)'
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

keyPickr.on('init', pickr => {
    keyColorPicker.style.backgroundColor  = pickr.getColor().toRGBA().toString(0)
}).on('change', (color, pickr) => {
    keyColorPicker.style.backgroundColor  = pickr.getColor().toRGBA().toString(0)
}).on('clear', pickr => {
    keyColorPicker.innerHTML              = pickr.getColor().toRGBA().toString(0)
    keyColorPicker.style.backgroundColor  = '#000000'
    keyClear                              = true
    pickr.setColor('#000000')
    pickr.show()
}).on('save', async (color, pickr) => {
    let colorRgba
    if(keyClear === true) {
        keyClear        = false
        colorRgba       = [0, 0, 0]

        let res         = await fetch(`/your-key-color?red=${colorRgba[0]}&green=${colorRgba[1]}&blue=${colorRgba[2]}`, {
            method: 'post'
        }).then((response) => {
            return response.json()
        })

        createAlert(showKeyAlertId, 'Color cleared!', 'success')
        pickr.show()
    } else {
        if(color === null) {
            colorRgba = [0, 0, 0]
        } else {
            colorRgba       = pickr.getSelectedColor().toRGBA()

            let res         = await fetch(`/your-key-color?red=${colorRgba[0]}&green=${colorRgba[1]}&blue=${colorRgba[2]}`, {
                method: 'post'
            }).then((response) => {
                return response.json()
            })
        
            createAlert(showKeyAlertId, res.message, 'success')
            pickr.hide()
        }
    }
})

bgPickr.on('init', pickr => {
    bgColorPicker.style.backgroundColor = pickr.getColor().toRGBA().toString(0)
}).on('change', (color, pickr) => {
    bgColorPicker.style.backgroundColor = pickr.getColor().toRGBA().toString(0)
}).on('clear', pickr => {
    bgColorPicker.innerHTML              = pickr.getColor().toRGBA().toString(0)
    bgColorPicker.style.backgroundColor  = '#000000'
    bgClear                              = true
    pickr.setColor('#000000')
    pickr.show()
}).on('save', async (color, pickr) => {
    let colorRgba
    if(bgClear === true) {
        bgClear        = false
        colorRgba       = [0, 0, 0]

        let res         = await fetch(`/your-bg-color?red=${colorRgba[0]}&green=${colorRgba[1]}&blue=${colorRgba[2]}`, {
            method: 'post'
        }).then((response) => {
            return response.json()
        })

        createAlert(showBgAlertId, 'Color cleared!', 'success')
        pickr.show()
    } else {
        if(color === null) {
            colorRgba = [0, 0, 0]
        } else {
            colorRgba       = pickr.getSelectedColor().toRGBA()

            let res         = await fetch(`/your-bg-color?red=${colorRgba[0]}&green=${colorRgba[1]}&blue=${colorRgba[2]}`, {
                method: 'post'
            }).then((response) => {
                return response.json()
            })
        
            createAlert(showBgAlertId, res.message, 'success')
            pickr.hide()
        }
    }
})