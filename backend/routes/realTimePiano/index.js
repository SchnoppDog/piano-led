// Here the state of the real-time pianoplay is handled. 

module.exports = (pianoSocketOpts, socketio) => {
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

    router.post('/changeLiveColorState', (req, res) => {
        if(req.query.liveColorState === 'true') {
            if(pianoSocketOpts.buttonConfig.liveColorState === true) {
                res.json({ statusCode: 300, message: 'Live-Color already on!' })
            } else {
                pianoSocketOpts.buttonConfig.liveColorState = true
                socketio.of('/cssKeyColorSocket').emit('setKeyColorButtonConfig', pianoSocketOpts.buttonConfig)
                socketio.of('/cssKeyColorSocket').emit('setCssKeyColorVars', pianoSocketOpts.colorConfig)
                res.json({ statusCode: 200, message: 'Live-Color turned on!' })
            }
        } else {
            if(pianoSocketOpts.buttonConfig.liveColorState === false) {
                res.json({ statusCode: 300, message: 'Live-Color already off!' })
            } else {
                pianoSocketOpts.buttonConfig.liveColorState = false
                socketio.of('/cssKeyColorSocket').emit('setKeyColorButtonConfig', pianoSocketOpts.buttonConfig)
                res.json({ statusCode: 409, message: 'Live-Color turned off!' })
            }
        }
    })

    return router
}