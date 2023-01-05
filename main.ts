// Track moving x,y coordinates
let current_x = 0
let current_y = 0

// Number of LED selections a player can make 
let slec_number = 3

// Set joystick pins &  variables
pins.analogReadPin(AnalogPin.P0)
pins.analogReadPin(AnalogPin.P1)
pins.digitalReadPin(DigitalPin.P2)
pins.setPull(DigitalPin.P2, PinPullMode.PullUp)

let moving_led: game.LedSprite = null;

let val_x, val_y, sw = 0;

input.onButtonPressed(Button.AB, () => {

    // Set initial location for X and Y
    current_x = 2
    current_y = 2

    // Clear/reset the number of LED selections
    slec_number = 3

    // Clean the moving_led sprite in-between cycles if it already exists
    if (moving_led) {
        moving_led.delete()
    }

    // Create a sprite at position x:2, y:2 (center)
    moving_led = game.createSprite(current_x, current_y)
    moving_led.off()

    basic.clearScreen()
    // music.playSoundEffect(
    //     music.builtinSoundEffect(soundExpression.spring), SoundExpressionPlayMode.InBackground)
    basic.showAnimation(`
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
. .#. . . .#. . . .#. . . .#. . . .#. . . .#. .
.#.#. .# # #. .#.#. .# # #. .#.#. .# # #.
. .#. . . .#. . . .#. . . .#. . . .#. . . .#. .
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
`, 500)

    pause(200)
    moving_led.on()
    moving_led.setBlink(300)
    pause(200)

    basic.forever(() => {

        val_x = pins.analogReadPin(AnalogPin.P0)
        val_y = pins.analogReadPin(AnalogPin.P1)
        sw = pins.digitalReadPin(DigitalPin.P2)

        // Joystick goes up
        if (val_x == 0) {
            pause(300)
            moving_led.changeYBy(-1)
            current_y--
            pause(300)
        }
        
        // Joystick goes down
        if (val_x > 1020) {
            pause(300)
            moving_led.changeYBy(1)
            current_y++
            pause(300)
        }

        // Joystick goes right
        if (val_y > 1020) {
            pause(300)
            moving_led.changeXBy(-1)
            current_x--
            pause(300)
        }

        // Joystick goes left
        if (val_y == 0) {
            pause(300)
            moving_led.changeXBy(1)
            current_x++
            pause(300)
        }

        // Joystick is pressed (0 is pressed)
        if (!sw) {
            pause(400)
            //TODO: ----------------------------------------
            // Check if the current selection overlaps
            // if this position has already been selected, toggle
            // else create new one sprite
            //----------------------------------------------

            //TODO: ----------------------------------------
            // Give the user only 3 dots/selections to make,
            // after each selection show a brief animation with the decreasing
            // number of left LED(s) available to select: "2, 1, Error/X"

            if (slec_number != 0) {
                let led_sel = game.createSprite(current_x, current_y)
                slec_number--
            } else {
                //TODO: Show error animation
            }

            //TODO: ----------------------------------------
            // Add newly created LED/sprite to an array to latter send over
            // BLT to another 'player'
            //----------------------------------------------

            serial.writeLine("x:" + current_x + " y:" + current_y)
            serial.writeLine("selec_num: " + slec_number)
        }
    })
})