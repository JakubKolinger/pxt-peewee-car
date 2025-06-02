radio.setGroup(43)
radio.setTransmitPower(7)
radio.setFrequencyBand(81)
radio.setTransmitSerialNumber(true)

let strip1 = neopixel.create(DigitalPin.P16, 4, NeoPixelMode.RGB)
let strip2 = neopixel.create(DigitalPin.P0, 9, NeoPixelMode.RGB)



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

basic.forever(function () {

    PCAmotor.MotorRun(PCAmotor.Motors.M1, L)

    PCAmotor.MotorRun(PCAmotor.Motors.M4, P * -1)

})

basic.forever(function () {
    speedLED = Math.map(speed, -9, 9, -4, 4)
    speedLED = Math.round(speedLED)
    speedLED = Math.abs(speedLED)
})



basic.forever(function () {




    if (speedLED === 1) {
        strip1.setPixelColor(3, neopixel.colors(NeoPixelColors.Green))
    }
    if (speedLED === 2) {
        strip1.setPixelColor(2, neopixel.colors(NeoPixelColors.Green))
        strip1.setPixelColor(3, neopixel.colors(NeoPixelColors.Green))
    }
    if (speedLED === 3) {
        strip1.setPixelColor(1, neopixel.colors(NeoPixelColors.Green))
        strip1.setPixelColor(2, neopixel.colors(NeoPixelColors.Green))
        strip1.setPixelColor(3, neopixel.colors(NeoPixelColors.Green))
    }
    if (speedLED === 4) {
        strip1.setPixelColor(0, neopixel.colors(NeoPixelColors.Green))
        strip1.setPixelColor(1, neopixel.colors(NeoPixelColors.Green))
        strip1.setPixelColor(2, neopixel.colors(NeoPixelColors.Green))
        strip1.setPixelColor(3, neopixel.colors(NeoPixelColors.Green))
    }

    strip1.show()
    strip1.clear()
})








basic.forever(function () {

    if (P < L && speedLED > 0) {
        strip2.setPixelColor(6, neopixel.colors(NeoPixelColors.Orange))
        strip2.setPixelColor(7, neopixel.colors(NeoPixelColors.Orange))
        strip2.setPixelColor(8, neopixel.colors(NeoPixelColors.Orange))
    }
    if (L < P && speedLED > 0) {
        strip2.setPixelColor(0, neopixel.colors(NeoPixelColors.Orange))
        strip2.setPixelColor(1, neopixel.colors(NeoPixelColors.Orange))
        strip2.setPixelColor(2, neopixel.colors(NeoPixelColors.Orange))
    }
    if (P > 5 && L > 20) {
        strip2.setPixelColor(3, neopixel.colors(NeoPixelColors.Red))
        strip2.setPixelColor(4, neopixel.colors(NeoPixelColors.Red))
        strip2.setPixelColor(5, neopixel.colors(NeoPixelColors.Red))
    }



    strip2.show()
    strip2.clear()
})
