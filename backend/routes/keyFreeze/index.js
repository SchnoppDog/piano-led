//setting key-freeze option
module.exports = function (stripOpts) {
    const router                = require('express').Router()
    
    router.post("/key-freeze", (req, res) => {
        let isFreeze                     = req.query.is_freeze
        freezeTime                       = parseInt(req.query.freeze_time) * 1000 
        stripOpts.isFreeze               = isFreeze
        stripOpts.freezeOpts.duration    = freezeTime
    
        if(isFreeze === 'false') {
            return res.json({ statusCode: 210, message: "Freeze is now off!"})
        }
        //response if criteria for freeze-option is not met
        if(freezeTime > 5000 || freezeTime < 0) {
            res.json({ statusCode: 205, message: "Your time is too high/low!"})
        } else {
            res.json({ statusCode: 200, message: "Freeze has been set!"})
        }
    })

    return router
}