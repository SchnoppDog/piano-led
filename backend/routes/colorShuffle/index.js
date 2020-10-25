module.exports = function (stripOpts) {
    const router        = require('express').Router()
    const colorEffects  = require('../../lib/expModules/colorEffects')

    /*
        Here the colors for the shuffle-function are set
        Since each rgb-array is send in string-format we need to map these into numbers since this function works with colors as numbers
    */
    router.post("/set-shuffle-colors", (req, res) => {
        let colorArrayRed       = []
        let colorArrayGreen     = []
        let colorArrayBlue      = []
        let isColorShuffle      = req.query.isColorShuffle
        let numberOfInputs      = parseInt(req.query.genShufInput)
    
        if(stripOpts.isBgColorOnOff === 'true') {
            if(stripOpts.isBgColor === 'true') {
                res.json({ statusCode: 409, message: 'Switch to "Change Key-Color"' })
            } else {
                if(stripOpts.isRandColPerKey === 'true') {
                    res.json({ statusCode: 409, message: 'Turn OFF "random-color per press"!' })
                } else {
                    if(isColorShuffle === 'true') {
                        colorArrayRed       = req.query.colorArrayRed.split(',').map(Number)
                        colorArrayGreen     = req.query.colorArrayGreen.split(',').map(Number)
                        colorArrayBlue      = req.query.colorArrayBlue.split(',').map(Number)
                
                        for(let counter = 0; counter < numberOfInputs; counter++) {
                            colorArrayRed[counter]      = Math.round(colorArrayRed[counter])
                            colorArrayGreen[counter]    = Math.round(colorArrayGreen[counter])
                            colorArrayBlue[counter]     = Math.round(colorArrayBlue[counter])
                        }
    
                        stripOpts.isColorShuffle                        = isColorShuffle
                        stripOpts.colorShuffleOpts.rgba.arrayRed        = colorArrayRed
                        stripOpts.colorShuffleOpts.rgba.arrayGreen      = colorArrayGreen
                        stripOpts.colorShuffleOpts.rgba.arrayBlue       = colorArrayBlue
                
                        res.json({ statusCode: 200, message: 'Colors for Color-Shuffle set. Color-Shuffle is ON!' })
    
                    } else {
                        stripOpts.isColorShuffle                        = isColorShuffle
                        stripOpts.colorShuffleOpts.rgba.arrayRed        = []
                        stripOpts.colorShuffleOpts.rgba.arrayGreen      = []
                        stripOpts.colorShuffleOpts.rgba.arrayBlue       = []
                        
                        res.json({ statusCode: 403, message: 'Color-Shuffle is OFF!' })
                    }
                }
            }
        } else {
            if(stripOpts.isRandColPerKey === 'true') {
                res.json({ statusCode: 409, message: 'Turn OFF "random-color per press"!' })
            } else {
                if(isColorShuffle === 'true') {
                    colorArrayRed       = req.query.colorArrayRed.split(',').map(Number)
                    colorArrayGreen     = req.query.colorArrayGreen.split(',').map(Number)
                    colorArrayBlue      = req.query.colorArrayBlue.split(',').map(Number)
            
                    for(let counter = 0; counter < numberOfInputs; counter++) {
                        colorArrayRed[counter]      = Math.round(colorArrayRed[counter])
                        colorArrayGreen[counter]    = Math.round(colorArrayGreen[counter])
                        colorArrayBlue[counter]     = Math.round(colorArrayBlue[counter])
                    }
            
                    stripOpts.isColorShuffle                        = isColorShuffle
                    stripOpts.colorShuffleOpts.rgba.arrayRed        = colorArrayRed
                    stripOpts.colorShuffleOpts.rgba.arrayGreen      = colorArrayGreen
                    stripOpts.colorShuffleOpts.rgba.arrayBlue       = colorArrayBlue
            
                    res.json({ statusCode: 200, message: 'Colors for Color-Shuffle set. Color-Shuffle is ON!' })
                } else {
                    stripOpts.isColorShuffle                        = isColorShuffle
                    stripOpts.colorShuffleOpts.rgba.arrayRed        = []
                    stripOpts.colorShuffleOpts.rgba.arrayGreen      = []
                    stripOpts.colorShuffleOpts.rgba.arrayBlue       = []
                    
                    res.json({ statusCode: 403, message: 'Color-Shuffle is OFF!' })
                }
            }
        }
    })

    // Here the option for a randomized shuffle-color-order is set
    router.post('/set-random-shuffle-order', (req, res) => {
        if(stripOpts.colorShuffleOpts.randomShuffleOrderOnOff % 2 === 0) {
            stripOpts.isColorShuffleRandom                      = 'true'
            stripOpts.colorShuffleOpts.randomShuffleOrderOnOff  = 1

            res.json({ statusCode: 200, message: 'Random Shuffle Order is now ON!' })

        } else {
            stripOpts.isColorShuffleRandom                      = 'false'
            stripOpts.colorShuffleOpts.randomShuffleOrderOnOff  = 0

            res.json({ statusCode: 403, message: 'Random Shuffle Order is now OFF!' })

        }
    })

    // Here are the random shuffle-colors generated and packed into the needed options-field
    router.post('/set-random-shuffle-colors', (req, res) => {
        let randArrayRed        = []
        let randArrayGreen      = []
        let randArrayBlue       = []
        let colorsMax           = parseInt(req.query.colors)
        let isColorShuffle      = req.query.isColorShuffle
        let randRbgValues

        if(stripOpts.isBgColorOnOff === 'true') {
            if(stripOpts.isBgColor === 'true') {
                res.json({ statusCode: 409, message: 'Switch to "Change Key-Color"' })
            } else {
                if(stripOpts.isRandColPerKey === 'true') {
                    res.json({ statusCode: 409, message: 'Turn OFF "random-color per press"!' })
                } else {
                    for(let counter = 0; counter < colorsMax; counter++) {
                        randRbgValues               = colorEffects.getRandomColor()
                        randArrayRed[counter]       = randRbgValues[0]
                        randArrayGreen[counter]     = randRbgValues[1]
                        randArrayBlue[counter]      = randRbgValues[2]
                    }

                    stripOpts.isColorShuffle                        = isColorShuffle
                    stripOpts.colorShuffleOpts.rgba.arrayRed        = randArrayRed
                    stripOpts.colorShuffleOpts.rgba.arrayGreen      = randArrayGreen
                    stripOpts.colorShuffleOpts.rgba.arrayBlue       = randArrayBlue

                    res.json({ statusCode: 200, message: 'Set Randomized Shuffle Colors!' })
                }
            }
        } else {
            for(let counter = 0; counter < colorsMax; counter++) {
                randRbgValues               = colorEffects.getRandomColor()
                randArrayRed[counter]       = randRbgValues[0]
                randArrayGreen[counter]     = randRbgValues[1]
                randArrayBlue[counter]      = randRbgValues[2]
            }

            stripOpts.isColorShuffle                        = isColorShuffle
            stripOpts.colorShuffleOpts.rgba.arrayRed        = randArrayRed
            stripOpts.colorShuffleOpts.rgba.arrayGreen      = randArrayGreen
            stripOpts.colorShuffleOpts.rgba.arrayBlue       = randArrayBlue

            res.json({ statusCode: 200, message: 'Set Randomized Shuffle Colors!' })
        }
    })

    return router
}