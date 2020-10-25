/*
    This function is only intended for the key-color. After every key-press a new random color is generated.
    The true generation of the color is handled quite at the of the code.
    This function is only accessible when the key-color is choosen instead of the background-lighting. Also the shuffle-color has to be off
*/
module.exports = function (stripOpts) {
    const router = require('express').Router()

    router.post("/random-color-per-press", (req, res) => {
        let red, green, blue

        if(stripOpts.isBgColorOnOff === "true") {
            if(stripOpts.isBgColor === "true") {
                res.json({ statusCode: 403, message: "Background-Color Active! Switch to Key-Color to activate this function!" })
            } else if(stripOpts.isColorShuffle === 'true') {
                res.json({ statusCode: 403, message: 'Color-Shuffle is ON! Deactivate Color-Shuffle!' })
            } else {    
                if(stripOpts.randColPerKeyOpts.randColOnOff % 2 === 0) {
                    stripOpts.isRandColPerKey                   = 'true'
                    stripOpts.randColPerKeyOpts.randColOnOff    = 1     //need for sending the correct respond message
    
                    res.json({ statusCode: 200, message: "Random-Color per Press ON!" })

                } else {
                    red                                         = 128
                    green                                       = 128
                    blue                                        = 128
                    stripOpts.isRandColPerKey                   = 'false'
                    stripOpts.randColPerKeyOpts.randColOnOff    = 0     //need for sending the correct respond message
                    stripOpts.lightOnColorOpts.rgba.red         = red
                    stripOpts.lightOnColorOpts.rgba.gren        = green
                    stripOpts.lightOnColorOpts.rgba.blue        = blue
                    
                    res.json({ statusCode: 418, message: "Random-Color per Press OFF!" })
                }
            }
        } else {
            if(stripOpts.isColorShuffle === 'true') {
                res.json({ statusCode: 403, message: 'Color-Shuffle is ON! Deactivate Color-Shuffle!' })
            } else {
                // randColOnOff++      //need for sending the correct respond message
                if(stripOpts.randColPerKeyOpts.randColOnOff % 2 === 0) {
                    stripOpts.isRandColPerKey                   = 'true'
                    stripOpts.randColPerKeyOpts.randColOnOff    = 1     //need for sending the correct respond message
    
                    res.json({ statusCode: 200, message: "Random-Color per Press ON!" })
                    
                } else {
                    red                                         = 128
                    green                                       = 128
                    blue                                        = 128
                    stripOpts.isRandColPerKey                   = 'false'
                    stripOpts.randColPerKeyOpts.randColOnOff    = 0     //need for sending the correct respond message
                    stripOpts.lightOnColorOpts.rgba.red         = red
                    stripOpts.lightOnColorOpts.rgba.gren        = green
                    stripOpts.lightOnColorOpts.rgba.blue        = blue
                    
                    res.json({ statusCode: 418, message: "Random-Color per Press OFF!" })
                }
            }
        }
    })

    return router
}