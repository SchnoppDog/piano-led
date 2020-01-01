const dotstar = require('dotstar')
const SPI = require('pi-spi')
const spi = SPI.initialize('/dev/spidev0.1')
const stripLength = 144
const strip = new dotstar.Dotstar(spi, {
    length: stripLength
})
const red = 255
const blue = 255
const green = 255
const alpha = 1
const maxKeys = 72
const firstRangeKey = 31
const lastRangeKey = firstRangeKey + maxKeys
const keyLed1 = 31
const keyLed2 = 32

exports.lightOn = function(keyNote) {
    const ledNum1 = keyNote - keyLed1 + (keyNote - keyLed2)
    const ledNum2 = keyNote - keyLed1 + (keyNote - keyLed1)
    if(keyNote >= firstRangeKey && keyNote <= lastRangeKey) {
      if(ledNum1 === -1) {
        strip.set(ledNum2,red,green,blue,alpha)
        strip.sync()
      } else if(ledNum2 === 144) {
          strip.set(ledNum1,red,green,blue,alpha)
          strip.sync()
      } else {
          strip.set(ledNum1,red,green,blue,alpha)
          strip.set(ledNum2,red,green,blue,alpha)
          strip.sync()
      }
    }
}

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

// 31 = keyNote
// 72 = maxKeys
// 31 = firstKey
// 72 + 31 = 103 = lastKey
// 31 >= firstKey && 31 <= lastKey
//     base1 = firstKey +1 //(32)
//     base2 = firstKey  //(31)
//     ledNum1 = keyNote - base1 //31-32= -1
//     ledNum2 = keyNote - base2 + (keyNote - base1) 
//                                                   //31-31+(31-32)=-1
//                                                   //31-31+(31-31)=0
//                                                   //32-31+(32-32)=1
//                                                   //32-31+(32-31)=2
//                                                   //33-31+(33-32)=3
//                                                   //33-31+(33-31)=4
//                                                   //103-31+(103-32)=143