// Track moving x,y coordinates
let current_x = 0
let current_y = 0

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
    // Clean the moving_led sprite in-between cycles if it already exists
    if (moving_led) {
        moving_led.delete()
    }
    

    // Create a sprite at position x:2, y:2 (center)
    moving_led = game.createSprite(current_x, current_y)
    moving_led.off()

    basic.clearScreen()
    music.playSoundEffect(
        music.builtinSoundEffect(soundExpression.spring), SoundExpressionPlayMode.InBackground)
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
    }
}