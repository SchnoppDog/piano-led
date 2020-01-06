//Old Test file no need for it
const isPiano = require('../expModules/existPiano')
const childProcess = require('child_process')

setInterval(() => {
    isPiano.getPiano("lsusb",(res) => {
        if(res === true) {
            runScript("./../main/index.js")
        }
    })
},5000)

function runScript(scriptPath) {
    let process = childProcess.fork(scriptPath)
}