function _getRandomColor() {
    let round       = Math.round
    let random      = Math.random
    let rgbMaxValue = 255
    let r,g,b

    r = round(random()*rgbMaxValue)
    g = round(random()*rgbMaxValue)
    b = round(random()*rgbMaxValue)

    let res = [r,g,b]

    return res
}

exports.getRandomColor = () => {
    return _getRandomColor()
}