radio.setGroup(43)
radio.setTransmitPower(7)
radio.setFrequencyBand(81)
radio.setTransmitSerialNumber(true)

let servo = ServoHelper.createServo()

let L: number = 0;
let P: number = 0;



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





basic.forever(function() {
    let strip1 = neopixel.create(DigitalPin.P0, 9, NeoPixelMode.RGB)
    let strip2 = neopixel.create(DigitalPin.P16, 9, NeoPixelMode.RGB)

    if (L < P){
        strip1.setPixelColor(0, neopixel.colors(NeoPixelColors.Orange))
        strip1.setPixelColor(1, neopixel.colors(NeoPixelColors.Orange))
        strip1.setPixelColor(2, neopixel.colors(NeoPixelColors.Orange))
    }
    if (P < L){
        strip1.setPixelColor(6, neopixel.colors(NeoPixelColors.Orange))
        strip1.setPixelColor(7, neopixel.colors(NeoPixelColors.Orange))
        strip1.setPixelColor(8, neopixel.colors(NeoPixelColors.Orange))
    }
    
    strip1.show()
})

