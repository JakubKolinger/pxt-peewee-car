radio.setGroup(43)
radio.setTransmitPower(7)
radio.setFrequencyBand(81)
radio.setTransmitSerialNumber(true)

let strip = neopixel.create(DigitalPin.P16, 4, NeoPixelMode.RGB)

strip.clear()

let servo = ServoHelper.createServo()

let L: number = 0;
let P: number = 0;
let speed: number = 0;
let speed1: number = 0;
let speedLED: number = 0;



radio.onReceivedString(function (received) {
    let casti = received.split("|")

    if (casti.length === 4 && casti[0] === "S") {
        let serial: number = radio.receivedPacket(RadioPacketProperty.SerialNumber)

        if (serial === -978678300) {
            L = parseInt(casti[1])
            P = parseInt(casti[2])
            speed = parseInt(casti[3])
        }
            
            
            
            
        
    }
})

basic.forever(function() {
    
    PCAmotor.MotorRun(PCAmotor.Motors.M1, L)

    PCAmotor.MotorRun(PCAmotor.Motors.M4, P * -1)
})





basic.forever(function() {
    

    speed1 = Math.map(speed, -250, 250, -4, 4)
    speedLED = Math.round(speed1)
    speedLED = Math.abs(speedLED)

    

    if (speedLED === 1){
        strip.setPixelColor(0, neopixel.colors(NeoPixelColors.Green))
    }
    if (speedLED === 2){
        strip.setPixelColor(1, neopixel.colors(NeoPixelColors.Green))
    }
    if (speedLED === 3) {
        strip.setPixelColor(2, neopixel.colors(NeoPixelColors.Green))
    }
    if (speedLED === 4) {
        strip.setPixelColor(3, neopixel.colors(NeoPixelColors.Green))
    }

    strip.show()
})




