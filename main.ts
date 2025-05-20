radio.setGroup(43)
radio.setTransmitPower(7)
radio.setFrequencyBand(81)
radio.setTransmitSerialNumber(true)

let servo = ServoHelper.createServo()
let L: number = 0;
let P: number = 0;

basic.showIcon(IconNames.Happy)

radio.onReceivedString(function (received) {
    let casti = received.split("|")

    if (casti.length === 3 && casti[0] === "S") {
        let serial: number = radio.receivedPacket(RadioPacketProperty.SerialNumber)

        if (serial === -978678300) {
            L = parseInt(casti[1])
            P = parseInt(casti[2])
        }
            
            
            
            
        
    }
})



basic.forever(function() {
    
    PCAmotor.MotorRun(PCAmotor.Motors.M1, L)

    PCAmotor.MotorRun(PCAmotor.Motors.M4, P * -1)
})



//radio.setGroup(234) //tomáš
//const heslo: string = "njimok@<>"
//radio.setGroup(37) //roman
//radio.setGroup(1) //tonda
//radio.setGroup(77) //tobi
//radio.setGroup(253) //marek
//radio.setGroup(15) //vilém
//radio.setGroup(21) //martin
//radio.setGroup(173) //kuba
//radio.setGroup(12) //roman
//radio.setGroup(23) //jára
//radio.setGroup(22) //martin
//radio.setTransmitPower(7)
//radio.setFrequencyBand(50)
 
//basic.forever(function () {
 
//let leftMotor: number = 250
//let rightMotor: number = 0
 
    //let hacker = "S|" + leftMotor + "|" + rightMotor
 
    //radio.sendString(hacker)
 
//})
