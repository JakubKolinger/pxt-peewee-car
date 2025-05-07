radio.setGroup(43)
radio.setTransmitPower(7)

let servo = ServoHelper.createServo()
let L: number = 0;
let P: number = 0;

radio.onReceivedString(function (received) {
    let casti = received.split("|")

    if (casti.length === 4 && casti[0] === "S") {
        let klicPrijaty = parseInt(casti[1])
        if (klicPrijaty === 43) {
            L = parseInt(casti[2])
            P = parseInt(casti[3])
            
            
            
        }
    }
})

while (P < 0 || P > 0 || L < 0 || L > 0) {
    basic.showIcon(IconNames.Yes)
}

basic.forever(function() {
    
    PCAmotor.MotorRun(PCAmotor.Motors.M1, L)

    PCAmotor.MotorRun(PCAmotor.Motors.M4, P * -1)
})
