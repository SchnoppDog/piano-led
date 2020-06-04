//Generating new colors every key-press
function _getRandomColor() {
    let round       = Math.round
    let random      = Math.random
    let rgbMaxValue = 254
    let rgbMinValue = 0
    let r,g,b
    let lowerRed = 40, lowerGreen = 40
    let higherRed = 40, higherGreen = 40

    r = round(random()* (rgbMaxValue - rgbMinValue + 1)) + rgbMinValue
    lowerRed = r - 40
    higherRed = r + 40
    if(higherRed > 255) {
        higherRed = 255
    } 
    if(lowerRed < 0) {
        lowerRed = 0
    }

    g = round(random()* (rgbMaxValue - rgbMinValue + 1)) + rgbMinValue
    lowerGreen = g - 40
    higherGreen = g + 40
    if(lowerGreen < 0) {
        lowerGreen = 0
    } 
    if(higherGreen > 255) {
        higherGreen = 255
    }

    b = round(random()* (rgbMaxValue - rgbMinValue + 1)) + rgbMinValue

    if(g >= lowerRed && g <= r) {
        g = round(random()* (lowerRed - rgbMinValue + 1)) + rgbMinValue
        if(g < 0) {
            g = 0
        } else if(g > 255) {
            g = 255
        }
    } else if(g >= r && g <= higherRed) {
        g = round(random()* (rgbMaxValue - higherRed + 1)) + higherRed
        if(g < 0) {
            g = 0
        } else if(g > 255) {
            g = 255
        }
    }

    // if(g >= lowerRed && g <= r) {
    //     g = round(random()* (lowerRed - rgbMinValue + 1)) + rgbMinValue
    //     if(g < 0) {
    //         g = 0
    //     } else if(g > 255) {
    //         g = 255
    //     }
    //     b = round(random()* (lowerRed - rgbMinValue + 1)) + rgbMinValue
    //     if(b >= lowerGreen && b <= g) {
    //         b = round(random()* (lowerGreen+20 - rgbMinValue + 1)) + rgbMinValue
    //         if(b < 0) {
    //             b = 0
    //         } else if(b > 255) {
    //             b = 255
    //         }
    //     }
    // } else if(g >= r && g <= higherRed) {
    //     g = round(random()* (rgbMaxValue - higherRed + 1)) + higherRed
    //     if(g < 0) {
    //         g = 0
    //     } else if(g > 255) {
    //         g = 255
    //     }
    //     b = round(random()* (rgbMaxValue - higherRed + 1)) + higherRed
    //     if(b >= g && b <= higherGreen) {
    //         b = round(random()* (rgbMaxValue - higherGreen + 1)) + higherGreen
    //         if(b < 0) {
    //             b = 0
    //         } else if(b > 255) {
    //             b = 255
    //         }
    //     }
    // }

    b = round(random()* (rgbMaxValue - rgbMinValue + 1)) + rgbMinValue

    if(b >= lowerGreen && b <= g) {
        b = round(random()* (lowerGreen - rgbMinValue + 1)) + rgbMinValue
        if(b < 0) {
            b = 0
        } else if(b > 255) {
            b = 255
        }
    } else if(b >= g && b <= higherGreen) {
        b = round(random()* (rgbMaxValue - higherGreen + 1)) + higherGreen
        if(b < 0) {
            b = 0
        } else if(b > 255) {
            b = 255
        }
    }

    // if(r >= 200) {
    //     g = round(random()* (199 - 100 + 1)) + 100
    //     b = round(random()* (99 - 1 + 1)) + 1
    // } else if(r >= 100 && r < 200) {
    //     g = round(random()* (99 - 1 + 1)) + 1
    //     b = round(random()* (254 - 200 + 1)) + 200
    // } else {
    //     g = round(random()* (254 - 200 + 1)) + 200
    //     b = round(random()* (199 - 100 + 1)) + 100
    // }

    // if(g >= 200) {
    //     b = round(random()* (199 - 100 + 1)) + 100
    // } else if(g >= 100 && g < 200) {
    //     b = round(random()* (99 - 1 + 1)) + 1
    // } else {
    //     b = round(random()* (254 - 200 + 1)) + 200
    // }

    let res = [r,g,b]
    console.log(res)

    return res
}

exports.getRandomColor = () => {
    return _getRandomColor()
}