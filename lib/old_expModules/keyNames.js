exports.getKeyName = function (keyNote) {
    let keyNameArray = ["C","Cis","D","Dis","E","F","Fis","G","Gis","A","Ais","H"]      //12 Noten
    let keyCount = 12       //12 Notes for one Octave
    let keyNumber           //Octave
    let keyName             
    let keyField            //keyCount * n => n = Octave
    let keyNameFromArray    //Name from Array

    //if-Ranges for each Octave on a 88-key piano
    if(keyNote <= 23) {
        keyField = keyNote - keyCount   //I.E: 22 - 12 = 10
        keyNumber = -1
        keyNameFromArray = keyNameArray[keyField]       //10 -> Gis
        keyName = `${keyNameFromArray}${keyNumber}`     //Gis-1 -> Repeat for all other if-loops
        return keyName
    }
    if(keyNote >= 24 && keyNote <= 35) {
        keyField = keyNote - (keyCount * 2)     
        keyNumber = 0
        keyNameFromArray = keyNameArray[keyField]
        keyName = `${keyNameFromArray}${keyNumber}`
        return keyName
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