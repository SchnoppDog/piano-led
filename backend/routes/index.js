module.exports = function(stripOpts, pianoSocketOpts, express, socketio) {
    const router = require('express').Router()
    const cssKeyColorSocket = socketio.of('/cssKeyColorSocket')

    router.use(require('./colorPage')(express))
    router.use(require('./keyFreeze')(stripOpts))
    router.use(require('./bgColor')(stripOpts))
    router.use(require('./randColPerPress')(stripOpts))
    router.use(require('./realTimePiano')(pianoSocketOpts))

    cssKeyColorSocket.on('connection', (socket) => {
        console.log("cssKeyColor-Connect")
        router.use(require('./setColor')(stripOpts, pianoSocketOpts, socket))
        router.use(require('./randomColor')(stripOpts, pianoSocketOpts, socket))
        router.use(require('./customColor')(stripOpts, pianoSocketOpts, socket))
        router.use(require('./colorShuffle')(stripOpts, pianoSocketOpts, socket))
    })

    return router
}