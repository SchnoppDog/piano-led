const dotstar = require('dotstar')
const SPI = require('pi-spi')
const spi = SPI.initialize('/dev/spidev0.1')    //Pins: SCLK: 23 | MOSI: 19
const stripLength = 144   //max LED number
const strip = new dotstar.Dotstar(spi, {
    length: stripLength
})
//RGBA values has yet to set manually 
const red = 255
const blue = 255
const green = 255
const alpha = 1
const maxKeys = 72    //Maximum Keys for all LEDs (each key 2 LEDs, but first and last key has only 1 LED)
const firstRangeKey = 31    //First Key-number for first LED
const lastRangeKey = firstRangeKey + maxKeys    //Last Key-Number for last LED
//Static values for lighten up the corresponding LED to each key
//Beware: keyLED1 and keyLED2 needs to be adjusted if firstRangeKey is a other key-number than 31
//Adjusting like: keyLed1 = firstRangeKey | keyLed2 = firstRangeKey + 1
const keyLed1 = 31    
const keyLed2 = 32

exports.lightOn = function(keyNote) {
    const ledNum1 = keyNote - keyLed1 + (keyNote - keyLed2)   //I.E: 31-31+(31-32)=-1
    const ledNum2 = keyNote - keyLed1 + (keyNote - keyLed1)   //31-31+(31-31)=0 etc...
    if(keyNote >= firstRangeKey && keyNote <= lastRangeKey) {
      if(ledNum1 === -1) {    //is needed so strip.set() doesn't end in an error
        strip.set(ledNum2,red,green,blue,alpha)
        strip.sync()
      } else if(ledNum2 === 144) {  //is also needed so strip.set() doesn't end in an error
          strip.set(ledNum1,red,green,blue,alpha)
          strip.sync()
      } else {
          strip.set(ledNum1,red,green,blue,alpha)
          strip.set(ledNum2,red,green,blue,alpha)
          strip.sync()
      }
    }
}

//same goes for lightOff the LEDs for each key
exports.lightOff = function(keyNote) {
    const ledNum1 = keyNote - keyLed1 + (keyNote - keyLed2)
    const ledNum2 = keyNote - keyLed1 + (keyNote - keyLed1)
    if(keyNote >= firstRangeKey && keyNote <= lastRangeKey) {
      if(ledNum1 === -1) {
        strip.set(ledNum2,0,0,0,0)
        strip.sync()
      } else if(ledNum2 === 144) {
          strip.set(ledNum1,0,0,0,0)
          strip.sync()
      } else {
          strip.set(ledNum1,0,0,0,0)
          strip.set(ledNum2,0,0,0,0)
          strip.sync()
      }
    }
}