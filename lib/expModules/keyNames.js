exports.getKeyName = function (keyNote) {
    // let arrayField = keyNote - 20
    // let keyNameArray = ["","A-1","Ais-1","H-1","C0","Cis0","D0","Dis0","E0","F0","Fis0","G0","Gis0","A0","Ais0",
    //                     "H0","C1","Cis1","D1","Dis1","E1","F1","Fis1","G1","Gis1","A1","Ais1","H1","C2","Cis2","D2","Dis2","E2","F2","Fis2","G2","Gis2","A2","Ais2","H2","C3","Cis3","D3","Dis3","E3","F3","Fis3","G3","Gis3","A3","Ais3","H3","C4","Cis4","D4","Dis4","E4","F4","Fis4","G4","Gis4","A4","Ais4","H4","C5","Cis5","D5","Dis5","E5","F5","Fis5","G5","Gis5","A5","Ais5","H5","C6","Cis6","D6","Dis6","E6","F6","Fis6","G6","Gis6","A6","Ais6","H6","C7"]
    // return keyNameArray[arrayField]
    // => Wählt Note aus dem Array

    let keyNameArray = ["C","Cis","D","Dis","E","F","Fis","G","Gis","A","Ais","H"]      //12 Noten
    let keyCount = 12       //12 Noten im Array (eine Oktave)
    let keyNumber           //Oktave
    let keyName             //Setzt sich aus keyNameFromArray und keyNumber zusammen
    let keyField            //Setzt sich aus keyNote und (keyCount *n) zusammen (n = Oktave)
    let keyNameFromArray    //Name, welcher vom Array zurückgegeben wird

    if(keyNote <= 23) {
        keyField = keyNote - keyCount
        keyNumber = -1
        keyNameFromArray = keyNameArray[keyField]
        keyName = `${keyNameFromArray}${keyNumber}`
        return keyName
    }
    if(keyNote >= 24 && keyNote <= 35) {
        keyField = keyNote - (keyCount * 2)
        keyNumber = 0
        keyNameFromArray = keyNameArray[keyField]
        keyName = `${keyNameFromArray}${keyNumber}`
        return console.log(keyName)
    }
    if(keyNote >= 36 && keyNote <= 47) {
        keyField = keyNote - (keyCount * 3)
        keyNumber = 1
        keyNameFromArray = keyNameArray[keyField]
        keyName = `${keyNameFromArray}${keyNumber}`
        return keyName
    }
    if(keyNote >= 48 && keyNote <= 59) {
        keyField = keyNote - (keyCount * 4)
        keyNumber = 2
        keyNameFromArray = keyNameArray[keyField]
        keyName = `${keyNameFromArray}${keyNumber}`
        return keyName
    }
    if(keyNote >= 60 && keyNote <= 71) {
        keyField = keyNote - (keyCount * 5)
        keyNumber = 3
        keyNameFromArray = keyNameArray[keyField]
        keyName = `${keyNameFromArray}${keyNumber}`
        return keyName
    }
    if(keyNote >= 72 && keyNote <= 83) {
        keyField = keyNote - (keyCount * 6)
        keyNumber = 4
        keyNameFromArray = keyNameArray[keyField]
        keyName = `${keyNameFromArray}${keyNumber}`
        return keyName
    }
    if(keyNote >= 84 && keyNote <= 95) {
        keyField = keyNote - (keyCount * 7)
        keyNumber = 5
        keyNameFromArray = keyNameArray[keyField]
        keyName = `${keyNameFromArray}${keyNumber}`
        return keyName
    }
    if(keyNote >= 96 && keyNote <= 107) {
        keyField = keyNote - (keyCount * 8)
        keyNumber = 6
        keyNameFromArray = keyNameArray[keyField]
        keyName = `${keyNameFromArray}${keyNumber}`
        return keyName
    }
    if(keyNote === 108) {
        keyField = keyNote - (keyCount * 9)
        keyNumber = 7
        keyNameFromArray = keyNameArray[keyField]
        keyName = `${keyNameFromArray}${keyNumber}`
        return keyName
    }
}