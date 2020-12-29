module.exports = function(stripOpts, pianoSocketOpts, express, socketio) {
    const router = require('express').Router()

    router.use(require('./colorPage')(express))
    router.use(require('./keyFreeze')(stripOpts))
    router.use(require('./bgColor')(stripOpts))
    router.use(require('./randColPerPress')(stripOpts))
    router.use(require('./realTimePiano')(pianoSocketOpts))
    router.use(require('./setColor')(stripOpts, pianoSocketOpts, socketio))
    router.use(require('./randomColor')(stripOpts, pianoSocketOpts, socketio))
    router.use(require('./customColor')(stripOpts, pianoSocketOpts, socketio))
    router.use(require('./colorShuffle')(stripOpts, pianoSocketOpts, socketio))

    return router
}