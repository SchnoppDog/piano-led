module.exports = function (stripOpts) {
    const router    = require('express').Router()
    const ledStrip  = require('../../lib/expModules/lightStrip')

    // Setting general background-color to on or off
    router.post('/bg-lighting-on-off', (req, res) => {
        let bgColorOnOff = req.query.bgColorOnOff
    
        if(bgColorOnOff === 'true') {
            if(stripOpts.bgColorOpts.bgColorOnOff % 2 === 0) {
                bgColorOnOff                            = 'true'
                stripOpts.isBgColorOnOff                = bgColorOnOff
                stripOpts.bgColorOpts.bgColorOnOff      = 1

                res.json({ statusCode: 200, message: "BG-Color turned On!", bgState: bgColorOnOff })

            } else {
                bgColorOnOff                        = 'false'
                stripOpts.isBgColorOnOff            = bgColorOnOff
                stripOpts.bgColorOpts.bgColorOnOff  = 0
                stripOpts.bgColorOpts.rgba.red      = 0
                stripOpts.bgColorOpts.rgba.green    = 0
                stripOpts.bgColorOpts.rgba.blue     = 0
    
                ledStrip.setBgLight(stripOpts)

                res.json({ statusCode: 400, message: "BG-Color turned Off!", bgState: bgColorOnOff })
            }
        }
    })

    // Setting the state for the background-color
    router.post('/bg-lighting', (req, res) => {
        let bgColor = req.query.bgColor
        
        if(bgColor === 'true') {
            if(stripOpts.bgColorOpts.counterBgColor % 2 === 0) {
                stripOpts.isBgColor                     = 'true'
                stripOpts.bgColorOpts.counterBgColor    = 1

                res.json({ statusCode: 200, message: "Edit Background-Color" })
            } else {
                stripOpts.isBgColor                     = 'false'
                stripOpts.bgColorOpts.counterBgColor    = 0

                res.json({ statusCode: 205, message: "Edit Key-Color" })
            }
        }
    })

    return router
}