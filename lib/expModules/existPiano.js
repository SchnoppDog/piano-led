const usbDetect = require('usb-detection')
const exec = require('child_process').exec

exports.getPiano = (command,cb) => {
    // usbDetect.find().then((devices) => {
    //     let stringData = JSON.stringify(devices)
    //     let isPiano = stringData.includes("Digital Piano")
        
    //     if(isPiano === true) {
    //         return true
    //     } else {
    //         return false
    //     }
    // })abc
    exec(command,(err,stdout,stderr) => {
        let data = stdout
        let content = data.includes("Yamaha")
        let isPiano

        if(content === true) {
            isPiano = true
            return cb(isPiano)
        } else {
            isPiano
            return cb(isPiano)
        }
    })
}