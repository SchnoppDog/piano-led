module.exports = function(stripOpts) {
    const router = require('express').Router()

    router.use(require('./test')(stripOpts))

    return router
}