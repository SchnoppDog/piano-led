// Here the state of the real-time pianoplay is handled. 

module.exports = (pianoSocketOpts) => {
    const router = require('express').Router()

    router.post('/changePianoSocketState', (req, res) => {
        if (req.query.pianoSocketState === 'true') {
            if(pianoSocketOpts.buttonConfig.realTimePlayState === true) {
                res.json({ statusCode: 300, message: 'Pianoplay is already turned on!' })
            } else {
                pianoSocketOpts.buttonConfig.realTimePlayState = true
                res.json({ statusCode: 200, message: 'Pianoplay turned on!' })
            }
        } else {
            if(pianoSocketOpts.buttonConfig.realTimePlayState === false) {
                res.json({ statusCode: 300, message: 'Pianoplay is already turned off!' })
            } else {
                pianoSocketOpts.buttonConfig.realTimePlayState = false
                res.json({ statusCode: 403, message: 'Pianoplay turned off!' })
            }
        }
    })

    return router
}