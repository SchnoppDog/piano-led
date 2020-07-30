const dotstar       = require('dotstar')
const SPI           = require('pi-spi')
const spi           = SPI.initialize('/dev/spidev0.1')    //Pins: SCLK: 23 | MOSI: 19
const stripLength   = 144   //max LED number
const strip         = new dotstar.Dotstar(spi, {
    length: stripLength
})

let red         = [128, 128, 0, 0]
let green       = [128, 0, 128, 0]
let blue        = [128, 0, 0, 128]
let i           = 0
let colorLength = red.length

// while(true) {
//     if(i === colorLength) {
//         i = 0
//     }

//     setTimeout(() => {
//         strip.all(red[i], green[i], blue[i], 1)
//         strip.sync()
//         i++
//     }, 3000)
//     console.log(i)
// }
// strip.all(red[0], green[0], blue[0], 1)
// strip.sync()
// strip.all(0, 0, 0, 1)
// strip.sync()


// setInterval(() => {
//     if(i === colorLength) {
//         i = 0
//     }
//     strip.all(red[i], green[i], blue[i])
//     strip.sync()
//     if(i >= 1) {
//         strip.set(i-1, 0, 0, 0)
//         strip.sync()
//     }
    
//     i++
// }, 1000)

// strip.all(0,0,0,0)
// strip.sync()
if(1%2===0) {
    console.log(true)
} else {
    console.log(false)
}