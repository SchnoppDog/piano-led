module.exports = function(stripOpts) {
    const router = require('express').Router()

    router.get('/test', (req, res) => {
        console.log(req.query.name)
        res.send(stripOpts)
    })

    return router
}