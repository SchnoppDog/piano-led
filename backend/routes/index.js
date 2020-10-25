module.exports = function(stripOpts, express) {
    const router = require('express').Router()

    router.use(require('./colorPage')(express))
    router.use(require('./setColor')(stripOpts))
    router.use(require('./randomColor')(stripOpts))
    router.use(require('./randColPerPress')(stripOpts))
    router.use(require('./customColor')(stripOpts))
    router.use(require('./keyFreeze')(stripOpts))
    router.use(require('./bgColor')(stripOpts))
    router.use(require('./colorShuffle')(stripOpts))

    return router
}