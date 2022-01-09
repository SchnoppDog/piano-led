/*
    Here you can set the custom color for either background-lighting or key-color.
    The key-color is only accessible if the color-shuffle is turned off
*/
module.exports = function (stripOpts, pianoSocketOpts, socketio) {
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
                
                // Setting the color for the backend led-strip
                stripOpts.lightOnColorOpts.rgba.red         = red
                stripOpts.lightOnColorOpts.rgba.gren        = green
                stripOpts.lightOnColorOpts.rgba.blue        = blue

                // Setting the color for the frontend liveColor-piano-feature
                pianoSocketOpts.colorConfig.isColorShuffle          = false
                pianoSocketOpts.colorConfig.isColorShuffleRandom    = false
                pianoSocketOpts.colorConfig.rgbColor.red            = red
                pianoSocketOpts.colorConfig.rgbColor.green          = green
                pianoSocketOpts.colorConfig.rgbColor.blue           = blue

                socketio.of('/cssKeyColorSocket').emit('setCssKeyColorVars', pianoSocketOpts.colorConfig)
    
                res.json({ statusCode: 200, message: 'Your color has been set successfully!' })
            } 
        } else {
            if(stripOpts.isColorShuffle === 'true') {
                res.json({ statusCode: 403, message: 'Color-Shuffle is ON! Deactivate Color-Shuffle!' })
            } else {
                red                                         = customRed
                green                                       = customGreen
                blue                                        = customBlue
                
                // Setting the color for the backend led-strip
                stripOpts.lightOnColorOpts.rgba.red         = red
                stripOpts.lightOnColorOpts.rgba.green       = green
                stripOpts.lightOnColorOpts.rgba.blue        = blue

                // Setting the color for the frontend liveColor-piano-feature
                pianoSocketOpts.colorConfig.isColorShuffle          = false
                pianoSocketOpts.colorConfig.isColorShuffleRandom    = false
                pianoSocketOpts.colorConfig.rgbColor.red            = red
                pianoSocketOpts.colorConfig.rgbColor.green          = green
                pianoSocketOpts.colorConfig.rgbColor.blue           = blue

                socketio.of('/cssKeyColorSocket').emit('setCssKeyColorVars', pianoSocketOpts.colorConfig)
    
                res.json({ statusCode: 200, message: 'Your color has been set successfully!' })
            }
        }
    })

    return router
}