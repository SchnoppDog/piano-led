module.exports = function (express) {
    const router            = require('express').Router()
    const colorAppConfig    = require('../../config')

    router.use(express.static(colorAppConfig.html.public))

    router.get('/', (req, res) => {
        res.redirect('/color-page')
    })

    router.get('/color-page', (req, res) => {
        res.sendFile(`${config.html.views}/colorPage.html`)
    })

    return router
}