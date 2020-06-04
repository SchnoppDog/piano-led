const dotstar = require("dotstar")
const SPI = require("pi-spi")
const spi = SPI.initialize('/dev/spidev0.1')
const stripLength = 144
const strip = new dotstar.Dotstar(spi, {
    length: stripLength
})

let ledNum1 = 44
let ledNum2 = 46

setInterval(() => {
    setTimeout(() => {
        strip.set(ledNum1, 201, 67, 0, 0.5)
        strip.set(ledNum2, 201, 67, 0, 0.5)
        strip.sync()
    }, 3000)
    strip.set(ledNum1, 0, 0, 0, 0)
    strip.set(ledNum2, 0, 0, 0, 0)
    strip.sync()
}, 5000)

/*
    colors:
    42, 183, 202 Scooter #2ab7ca
    0, 91, 150 Bahama Blue #005b96
    101, 30, 62 Wine Berry #651e3e
    0, 102, 77 Tropical Forest #00664d
    209, 17, 65 Crimson #d11141
    0, 177, 89 Jade #00b159
    0, 174, 219 Cerulean #00aedb
    255, 51, 119 Radical Red #ff3377
    115, 0, 153 Purple #730099
    77, 179, 0 Limeade #4db300
    30, 179, 0 grassy green #1eb300
    201, 67, 0 Grenadier #c94300

*/