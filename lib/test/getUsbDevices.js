// const usbDetect = require('usb-detection')
// //const isPiano = require('../expModules/existPiano')
// const fs = require('fs')

// function writePiano() {
//     usbDetect.find().then((devices) => {
//         let stringData = JSON.stringify(devices)
//         fs.truncateSync("logTest.txt",0)
//         fs.writeFileSync("logTest.txt",stringData)
//     })
// }

// async function isPiano() {
//     await writePiano()
//     fs.readFileSync("logTest.txt",(data) => {
//         console.log(data)
//     })
// }

// isPiano()

const usb = require('child_process').exec

// function lsusb(err,stdout,stderr) {
//     let data = stdout
//     let content = data.includes("Yamaha")
//     let isPiano
//     if(content === true) {
//         //console.log("Piano found")
//         isPiano = true
//         return isPiano
//     } else {
//         //console.log("Piano not found")
//         isPiano = false
//         return isPiano
//     }
// }
// usb("lsusb",lsusb)
// console.log(lsusb())
// let data = usb("lsusb",(err,stdout,stderr) => {
//     let content = stdout
//     let contentData = content.includes("Yamaha")
//     let isPiano
//     if(contentData === true) {
//         isPiano = true
//         console.log(isPiano)
//     } else {
//         isPiano = false
//         console.log(isPiano)
//     }
// })
// if(data === true) {
//     console.log("Piano found!")
// } else {
//     console.log("Piano no found")
// }

function runShellCommand(command, callback) {
    usb(command,(err,stdout,stderr) => {
        let content = stdout
        let contentData = content.includes("Yamaha")
        let isPiano
        if(contentData === true) {
            isPiano = true
            return callback(isPiano)
        } else {
            isPiano = false 
            return callback(isPiano)
        }
    })
}

runShellCommand("lsusb",(res) => {
    //return res
    console.log(res)
})