/*
  This file matches the set color to the correct key-led.
  It also sets the background-light
*/
const dotstar                   = require('dotstar')
const SPI                       = require('pi-spi')
const spi                       = SPI.initialize('/dev/spidev0.1')    //Pins: SCLK: 23 | MOSI: 19
const stripLength               = 144   //max LED number
const strip                     = new dotstar.Dotstar(spi, {
    length: stripLength
})
const maxKeys                   = 72    //Maximum Keys for all LEDs (each key 2 LEDs, but first and last key has only 1 LED)
const firstRangeKey             = 31    //First Key-number for first LED
const lastRangeKey              = firstRangeKey + maxKeys    //Last Key-Number for last LED
//Static values for lighten up the corresponding LED to each key
//Beware: keyLED1 and keyLED2 needs to be adjusted if firstRangeKey is a other key-number than 31
//Adjusting like: keyLed1 = firstRangeKey | keyLed2 = firstRangeKey + 1
const keyLed1                   = 31    
const keyLed2                   = 32
let colorShuffleCounterLightOn  = 0
let colorShuffleCounterLightOff = 0
let keyFreezeRandomShuffle      = 0

//Setting the backround-light for the strip
exports.setBgLight = function(bgOptions) {
  let red     = bgOptions.bgColorOpts.rgba.red
  let green   = bgOptions.bgColorOpts.rgba.green
  let blue    = bgOptions.bgColorOpts.rgba.blue
  let alpha   = bgOptions.bgColorOpts.rgba.alpha

  strip.all(red, green, blue, alpha)
  strip.sync()
}

// if the color-shuffle is on colors are shuffled.
exports.lightOn = function(keyNote, options) {                 // r, g, b, a
    const ledNum1 = keyNote - keyLed1 + (keyNote - keyLed2)   //I.E: 31-31+(31-32)=-1
    const ledNum2 = keyNote - keyLed1 + (keyNote - keyLed1)   //31-31+(31-31)=0 etc...
    let r, g, b, a
    let shuffleArrayLength
    let randomShufflePosition

    if(options.isColorShuffle === 'true') {
      shuffleArrayLength    = options.colorShuffleOpts.rgba.arrayRed.length

      if(options.isColorShuffleRandom === 'true') {
        randomShufflePosition = Math.floor(Math.random() * shuffleArrayLength)

        r                     = options.colorShuffleOpts.rgba.arrayRed[randomShufflePosition]
        g                     = options.colorShuffleOpts.rgba.arrayGreen[randomShufflePosition]
        b                     = options.colorShuffleOpts.rgba.arrayBlue[randomShufflePosition]
        a                     = options.colorShuffleOpts.rgba.alpha

        keyFreezeRandomShuffle = randomShufflePosition

      } else {

        if(colorShuffleCounterLightOn >= shuffleArrayLength) {
          colorShuffleCounterLightOn = 0

        }

        r                     = options.colorShuffleOpts.rgba.arrayRed[colorShuffleCounterLightOn]
        g                     = options.colorShuffleOpts.rgba.arrayGreen[colorShuffleCounterLightOn]
        b                     = options.colorShuffleOpts.rgba.arrayBlue[colorShuffleCounterLightOn]
        a                     = options.colorShuffleOpts.rgba.alpha  
        
        colorShuffleCounterLightOn++

      }
    } else {

      r = options.lightOnColorOpts.rgba.red
      g = options.lightOnColorOpts.rgba.green
      b = options.lightOnColorOpts.rgba.blue
      a = options.lightOnColorOpts.rgba.alpha

    }

    if(keyNote >= firstRangeKey && keyNote <= lastRangeKey) {
      if(ledNum1 === -1) {    //is needed so strip.set() doesn't end in an error
        strip.set(ledNum2,r,g,b,a)
        strip.sync()
      } else if(ledNum2 === 144) {  //is also needed so strip.set() doesn't end in an error
          strip.set(ledNum1,r,g,b,a)
          strip.sync()
      } else {
          strip.set(ledNum1,r,g,b,a)
          strip.set(ledNum2,r,g,b,a)
          strip.sync()
      }
    }
}

//same goes for lightOff the LEDs for each key
//if freezeoption is set the pressed keys stay lit after given time has passed
// if the color-shuffle is on colors are shuffled. This also applies to the key-freeze
//if background-color set to true color after the key press remains on the set background-color
exports.lightOff = function(keyNote, options) {
  let r,g,b,a
  let durationTime
  let freeze
  let bgRed, bgGreen, bgBlue, bgAlpha
  let isBgColor
  let shuffleArrayLength

    if(options) {
      if(options.isFreeze === 'true') {
        if(options.isColorShuffle === 'true') {
          shuffleArrayLength = options.colorShuffleOpts.rgba.arrayRed.length

          if(options.isColorShuffleRandom === 'true') {
            r                     = options.colorShuffleOpts.rgba.arrayRed[keyFreezeRandomShuffle]
            g                     = options.colorShuffleOpts.rgba.arrayGreen[keyFreezeRandomShuffle]
            b                     = options.colorShuffleOpts.rgba.arrayBlue[keyFreezeRandomShuffle]
            a                     = options.colorShuffleOpts.rgba.alpha

          } else {

            if(colorShuffleCounterLightOff >= shuffleArrayLength) {
              colorShuffleCounterLightOff = 0
            }

            r = options.colorShuffleOpts.rgba.arrayRed[colorShuffleCounterLightOff]
            g = options.colorShuffleOpts.rgba.arrayGreen[colorShuffleCounterLightOff]
            b = options.colorShuffleOpts.rgba.arrayBlue[colorShuffleCounterLightOff]
            a = options.colorShuffleOpts.rgba.alpha

            colorShuffleCounterLightOff++
          }
        } else {
          r        = options.freezeOpts.rgba.red
          g        = options.freezeOpts.rgba.green
          b        = options.freezeOpts.rgba.blue
          a        = options.freezeOpts.rgba.alpha

        }
        durationTime = options.freezeOpts.duration
        freeze   = true

      } else {
        freeze = false
        durationTime = 0
      }
      if(options.isBgColorOnOff === 'true') {
        bgRed       = options.bgColorOpts.rgba.red
        bgGreen     = options.bgColorOpts.rgba.green
        bgBlue      = options.bgColorOpts.rgba.blue
        bgAlpha     = options.bgColorOpts.rgba.alpha
        isBgColor   = options.isBgColorOnOff
      } else {
        bgRed       = 0
        bgGreen     = 0
        bgBlue      = 0
        bgAlpha     = 0
      }
    }
    const ledNum1 = keyNote - keyLed1 + (keyNote - keyLed2)
    const ledNum2 = keyNote - keyLed1 + (keyNote - keyLed1)
    if(keyNote >= firstRangeKey && keyNote <= lastRangeKey) {
      if(ledNum1 === -1) {
        if(freeze) {
          strip.set(ledNum2,r,g,b,a)
          setTimeout(() => {
            strip.set(ledNum2,bgRed,bgGreen,bgBlue,bgAlpha)
            strip.sync()
          }, durationTime)
          strip.set(ledNum2,bgRed,bgGreen,bgBlue,bgAlpha)
          strip.sync()
        } else {
          strip.set(ledNum2,bgRed,bgGreen,bgBlue,bgAlpha)
          strip.sync()
        }
      } else if(ledNum2 === 144) {
        if(freeze) {
          strip.set(ledNum2,r,g,b,a)
          setTimeout(() => {
            strip.set(ledNum2,bgRed,bgGreen,bgBlue,bgAlpha)
            strip.sync()
          }, durationTime)
          strip.set(ledNum2,bgRed,bgGreen,bgBlue,bgAlpha)
          strip.sync()
        } else {
          strip.set(ledNum2,bgRed,bgGreen,bgBlue,bgAlpha)
          strip.sync()
        }
      } else {
        if(freeze) {
          strip.set(ledNum1,r,g,b,a)
          strip.set(ledNum2,r,g,b,a)
          strip.sync()
          setTimeout(() => {
            strip.set(ledNum1,bgRed,bgGreen,bgBlue,bgAlpha)
            strip.set(ledNum2,bgRed,bgGreen,bgBlue,bgAlpha)
            strip.sync()
          }, durationTime)
        } else {
          strip.set(ledNum1,bgRed,bgGreen,bgBlue,bgAlpha)
          strip.set(ledNum2,bgRed,bgGreen,bgBlue,bgAlpha)
          strip.sync()
        }
      }
    }
}