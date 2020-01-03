// const usb = require('child_process').exec


// function runShellCommand(command, callback) {
//     usb(command,(err,stdout,stderr) => {
//         let content = stdout
//         let contentData = content.includes("Yamaha")
//         let isPiano
//         if(contentData === true) {
//             isPiano = true
//             return callback(isPiano)
//         } else {
//             isPiano = false 
//             return callback(isPiano)
//         }
//     })
// }

// runShellCommand("lsusb",(res) => {
//     if(res === true) {
//         console.log("res true")
//     } else {
//         console.log("res false")
//     }
// })

const usb = require('usb-detection')
usb.startMonitoring()
usb.on('add',(device) => {
    //console.log('add',device)
    if(device.deviceName === "Digital_Piano") {
        console.log("Piano connected")
    }
})
usb.on('remove',(device) => {
    //console.log('remove',device)
    if(device.deviceName === "Digital_Piano") {
        console.log("Piano removed")
    }
    usb.stopMonitoring()
})