// import Picker from 'vanilla-picker'
const picker = require('vanilla-picker')
const pickerId = document.getElementById("colorPicker")
picker = new picker(pickerId)

picker.setOptions({
    parent: pickerId,
    popup: false,
    alpha: true,
    editor: true,
    editorFormat: 'hex',
    onChange: function(color) {
        console.log(color)
    }
})