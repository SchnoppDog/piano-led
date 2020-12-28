/*
    Here you can set the custom color for either background-lighting or key-color.
    The key-color is only accessible if the color-shuffle is turned off
*/
module.exports = function (stripOpts, pianoSocketOpts, socket) {
    const router        = require('express').Router()
    const ledStrip      = require('../../lib/expModules/lightStrip')

    router.post("/custom-color", (req, res) => {
        let customRed       = Math.round(req.query.red)
        let customGreen     = Math.round(req.query.green)
        let customBlue      = Math.round(req.query.blue)
        let red, green, blue
    
        if(stripOpts.isBgColorOnOff === 'true') {
            if(stripOpts.isBgColor === 'true') {
                stripOpts.bgColorOpts.rgba.red      = customRed / 6
                stripOpts.bgColorOpts.rgba.green    = customGreen / 6
                stripOpts.bgColorOpts.rgba.blue     = customBlue / 6
    
                ledStrip.setBgLight(stripOpts)
                res.json({ statusCode: 200, message: 'Your color has been set successfully!' })
            } else if(stripOpts.isColorShuffle === 'true') {
                res.json({ statusCode: 403, message: 'Color-Shuffle is ON! Deactivate Color-Shuffle!' })
            } else {
    
                red                                         = customRed
                green                                       = customGreen
                blue                                        = customBlue
    
                stripOpts.lightOnColorOpts.rgba.red         = red
                stripOpts.lightOnColorOpts.rgba.gren        = green
                stripOpts.lightOnColorOpts.rgba.blue        = blue

                pianoSocketOpts.colorConfig.isRandColPerKey         = false
                pianoSocketOpts.colorConfig.isColorShuffle          = false
                pianoSocketOpts.colorConfig.isColorShuffleRandom    = false
                pianoSocketOpts.colorConfig.isCustomColor           = false
                pianoSocketOpts.colorConfig.isRandomColor           = true

                socket.emit('setCssKeyColorVars', pianoSocketOpts.colorConfig, red, green, blue)
    
                res.json({ statusCode: 200, message: 'Your color has been set successfully!' })
            } 
        } else {
            if(stripOpts.isColorShuffle === 'true') {
                res.json({ statusCode: 403, message: 'Color-Shuffle is ON! Deactivate Color-Shuffle!' })
            } else {
                red                                         = customRed
                green                                       = customGreen
                blue                                        = customBlue
    
                stripOpts.lightOnColorOpts.rgba.red         = red
                stripOpts.lightOnColorOpts.rgba.gren        = green
                stripOpts.lightOnColorOpts.rgba.blue        = blue

                pianoSocketOpts.colorConfig.isRandColPerKey         = false
                pianoSocketOpts.colorConfig.isColorShuffle          = false
                pianoSocketOpts.colorConfig.isColorShuffleRandom    = false
                pianoSocketOpts.colorConfig.isCustomColor           = false
                pianoSocketOpts.colorConfig.isRandomColor           = true

                socket.emit('setCssKeyColorVars', pianoSocketOpts.colorConfig, red, green, blue)
    
                res.json({ statusCode: 200, message: 'Your color has been set successfully!' })
            }
        }
    })

    return router
}