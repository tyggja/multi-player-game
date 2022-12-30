let filter = 200; // default 205 from

let start_x = 2 // |
let start_y = 2 // |----> to start in the middle of the board (center-point)

input.onButtonPressed(Button.AB, () => {
        
    basic.clearScreen()
    pause(500)

    basic.forever(function () {
    
        // start in the center of the LED array (x = 2)
        if (input.acceleration(Dimension.X) >= 0) {
            led.plot(start_x + Math.ceil(input.acceleration(Dimension.X) / filter), 2)
        }
        if (input.acceleration(Dimension.X) <= 0) {
            led.plot(start_x + Math.ceil(input.acceleration(Dimension.X) / filter), 2)
        }

        pause(100)
        serial.writeLine("x-raw: " + input.acceleration(Dimension.X))
        serial.writeLine("x-proc: " + (start_x + Math.ceil(
            input.acceleration(Dimension.X)) / filter))
        //serial.writeLine("y: " + input.acceleration(Dimension.Y) / filter)
    })  
})