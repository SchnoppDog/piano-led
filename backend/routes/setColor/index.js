module.exports = function (stripOpts, pianoSocketOpts, socketio) {
    const router        = require('express').Router()
    const convert       = require('color-convert')
    const ledStrip      = require('../../lib/expModules/lightStrip')

    router.post("/set-color", (req, res) => {
        const colorValue = req.query.colorValue
        const arrayRGB   = convert.hex.rgb(colorValue)
        let bgRed, bgGreen, bgBlue
        let red, green, blue

        //Dimming the background-light
        bgRed            = ((arrayRGB[0] / 2) / 2) / 2
        bgGreen          = ((arrayRGB[1] / 2) / 2) /2
        bgBlue           = ((arrayRGB[2] / 2) / 2) /2
        
    
        /* Setting various options for various behaviours such as:
            - Is the general On-Off-Button for the Background-Color turned on or off?
            - Is the Background-Button set to "Edit-Key-Color" or something else?
            - Is the freeze-Option set?
            - Is the Color-Shuffle-Option set?
            ...
            Notice: Booleans must be Strings since they are handled here as Strings
            This has to do with the route-paths: In the route-paths the boolean-value is stored but they are sent as a String.
            Since it is a bit complicated to turn Strings into booleans the booleans will be represented as Strings.
        */
        if(stripOpts.isBgColorOnOff === 'true') {
            /* 
                If true color for background-lighting can be set
                If false color is set to 0 and background-options are inaccessible
            */
            if(stripOpts.isBgColor === 'true') {
                /*
                    If true Background-Color can be set
                    If false Background-Color is deactivated and key-color can be set
                */
                stripOpts.bgColorOpts.rgba.red      = bgRed
                stripOpts.bgColorOpts.rgba.green    = bgGreen
                stripOpts.bgColorOpts.rgba.blue     = bgBlue
                ledStrip.setBgLight(stripOpts)

                res.json({ statusCode: 200, message: 'Background-Color set!' })
            } else {
                /*
                    If "isRandColPerKey" or "isColorShuffle" set to true you can't access the key-color. You  have to deactivate either function first!
                */
                if(stripOpts.isRandColPerKey === 'true') {
                    res.json({ statusCode: 409, message: 'Turn OFF Random-Color per press!' })
                } else if(stripOpts.isColorShuffle === 'true') {
                    res.json({ statusCode: 409, message: 'Turn OFF Color-Shuffle first!' })
                } else {
                    red     = arrayRGB[0]
                    green   = arrayRGB[1]
                    blue    = arrayRGB[2]
    
                    if(stripOpts.isFreeze === 'true') {
                        stripOpts.freezeOpts.rgba.red       = red
                        stripOpts.freezeOpts.rgba.green     = green
                        stripOpts.freezeOpts.rgba.blue      = blue
                    }
                    
                    stripOpts.lightOnColorOpts.rgba.red                 = red
                    stripOpts.lightOnColorOpts.rgba.green               = green
                    stripOpts.lightOnColorOpts.rgba.blue                = blue

                    pianoSocketOpts.colorConfig.isColorShuffle          = false
                    pianoSocketOpts.colorConfig.isColorShuffleRandom    = false
                    pianoSocketOpts.colorConfig.rgbColor.red            = red
                    pianoSocketOpts.colorConfig.rgbColor.green          = green
                    pianoSocketOpts.colorConfig.rgbColor.blue           = blue

                    socketio.of('/cssKeyColorSocket').emit('setCssKeyColorVars', pianoSocketOpts.colorConfig)
    
                    res.json({ statusCode: 200, message: "Color set!"})
                }
            }
        } else {
            if(stripOpts.isRandColPerKey === 'true') {
                res.json({ statusCode: 409, message: 'Turn OFF Random-Color per press!' })
            } else if(stripOpts.isColorShuffle === 'true') {
                res.json({ statusCode: 409, message: 'Turn OFF Color-Shuffle first!' })
            } else {
                red     = arrayRGB[0]
                green   = arrayRGB[1]
                blue    = arrayRGB[2]
    
                if(stripOpts.isFreeze === 'true') {
                    stripOpts.freezeOpts.rgba.red       = red
                    stripOpts.freezeOpts.rgba.green     = green
                    stripOpts.freezeOpts.rgba.blue      = blue
                }
    
                stripOpts.lightOnColorOpts.rgba.red      = red
                stripOpts.lightOnColorOpts.rgba.green    = green
                stripOpts.lightOnColorOpts.rgba.blue     = blue

                pianoSocketOpts.colorConfig.isColorShuffle          = false
                pianoSocketOpts.colorConfig.isColorShuffleRandom    = false
                pianoSocketOpts.colorConfig.rgbColor.red            = red
                pianoSocketOpts.colorConfig.rgbColor.green          = green
                pianoSocketOpts.colorConfig.rgbColor.blue           = blue

                socketio.of('/cssKeyColorSocket').emit('setCssKeyColorVars', pianoSocketOpts.colorConfig)
    
                res.json({ statusCode: 200, message: "Color set!"})
            }
        }
    })

    return router
}