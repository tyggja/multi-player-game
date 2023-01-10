// Track moving x,y coordinates
let current_x = 0
let current_y = 0

// Number of LED selections a player can make 
let slec_number = 3

// Array that holds all the LED selections
let sel_array: Led[] = []

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

    // Clean the led array with each A+B button-press

    // Create sound effects
    // let jss = music.createSoundEffect(WaveShape.Square, 1, 2419, 255, 138, 100, 
    //             SoundExpressionEffect.Warble, InterpolationCurve.Linear)
    // let sls = music.createSoundEffect(WaveShape.Sine, 2909, 635, 255, 129, 200, 
    //             SoundExpressionEffect.None, InterpolationCurve.Linear)

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
        sw = pins.digitalReadPin(DigitalPin.P2)

        // Joystick goes up
        if (val_x == 0) {
            pause(300)
            moving_led.changeYBy(-1)
            //music.playSoundEffect(jss, SoundExpressionPlayMode.InBackground)
            current_y--
            pause(300)
        }
        
        // Joystick goes down
        if (val_x > 1020) {
            pause(300)
            moving_led.changeYBy(1)
            //music.playSoundEffect(jss, SoundExpressionPlayMode.InBackground)
            current_y++
            pause(300)
        }

        // Joystick goes right
        if (val_y > 1020) {
            pause(300)
            moving_led.changeXBy(-1)
            //music.playSoundEffect(jss, SoundExpressionPlayMode.InBackground)
            current_x--
            pause(300)
        }

        // Joystick goes left
        if (val_y == 0) {
            pause(300)
            moving_led.changeXBy(1)
            //music.playSoundEffect(jss, SoundExpressionPlayMode.InBackground)
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
            if (slec_number > 0) {
                let led_sel = game.createSprite(current_x, current_y)
                music.playMelody("D5 G5", 800)
                let vtp = new Led(3, 3)
                sel_array.push(vtp)
                slec_number--
            } else {
                music.playMelody("G5 D5", 500)
                basic.showIcon(IconNames.No)
                basic.pause(300)
            }
            sel_array.forEach(function(t_ar) {
                serial.writeLine(JSON.stringify(t_ar))
            })
        }

        // Logo is pressed (BLT construct)
        if(input.logoIsPressed()) {
            // Set the BLT group
            radio.setGroup(128)
        }
    })
})

// Class for LED
class Led {
    private x_val: number
    private y_val: number

    constructor(x_val: number, y_val: number) {
        this.x_val = x_val
        this.y_val = y_val
    }
    public get_x() {
        return this.x_val
    }
    public get_y() {
        return this.y_val
    }
}