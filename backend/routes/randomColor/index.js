module.exports = function (stripOpts, pianoSocketOpts, cssKeyColorSocket) {
    const router        = require('express').Router()
    const colorEffects  = require('../../lib/expModules/colorEffects')
    const ledStrip      = require('../../lib/expModules/lightStrip')

    router.post('/random-color', (req, res) => {
        let randRgbValues               = colorEffects.getRandomColor()
        let randRed                     = randRgbValues[0]
        let randGreen                   = randRgbValues[1]
        let randBlue                    = randRgbValues[2]
        let red, green, blue
    
        if(stripOpts.isBgColorOnOff === "true") {
            if(stripOpts.isBgColor === "true") {
                stripOpts.bgColorOpts.rgba.red          = randRed / 6
                stripOpts.bgColorOpts.rgba.green        = randGreen / 6
                stripOpts.bgColorOpts.rgba.blue         = randBlue / 6 
                ledStrip.setBgLight(stripOpts)
    
                res.json({ statusCode: 200, message: `Random Color Set! Color is RGB ${randRed}, ${randGreen}, ${randBlue}` })
            } else {
                red     = randRed
                green   = randGreen
                blue    = randBlue
    
                stripOpts.lightOnColorOpts.rgba.red      = red
                stripOpts.lightOnColorOpts.rgba.gren     = green
                stripOpts.lightOnColorOpts.rgba.blue     = blue

                pianoSocketOpts.colorConfig.isRandColPerKey         = false
                pianoSocketOpts.colorConfig.isColorShuffle          = false
                pianoSocketOpts.colorConfig.isColorShuffleRandom    = false
                pianoSocketOpts.colorConfig.isCustomColor           = false
                pianoSocketOpts.colorConfig.isRandomColor           = true

                cssKeyColorSocket.emit('setCssKeyColorVars', pianoSocketOpts.colorConfig, red, green, blue)
    
                res.json({ statusCode: 200, message: `Random Color Set! Color is RGB ${randRed}, ${randGreen}, ${randBlue}` })
            }
        } else {
            red     = randRed
            green   = randGreen
            blue    = randBlue
    
            stripOpts.lightOnColorOpts.rgba.red      = red
            stripOpts.lightOnColorOpts.rgba.gren     = green
            stripOpts.lightOnColorOpts.rgba.blue     = blue

            pianoSocketOpts.colorConfig.isRandColPerKey         = false
            pianoSocketOpts.colorConfig.isColorShuffle          = false
            pianoSocketOpts.colorConfig.isColorShuffleRandom    = false
            pianoSocketOpts.colorConfig.isCustomColor           = false
            pianoSocketOpts.colorConfig.isRandomColor           = true

            cssKeyColorSocket.emit('setCssKeyColorVars', pianoSocketOpts.colorConfig, red, green, blue)
    
            res.json({ statusCode: 200, message: `Random Color Set! Color is RGB ${randRed}, ${randGreen}, ${randBlue}` })
        }
    })

    return router
}