input.onButtonPressed(Button.AB, function () {
    moving_led.delete()
    moving_led = game.createSprite(2, 2)
    basic.showAnimation(`
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
. .#. . . .#. . . .#. . . .#. . . .#. . . .#. .
.#.#. .# # #. .#.#. .# # #. .#.#. .# # #.
. .#. . . .#. . . .#. . . .#. . . .#. . . .#. .
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
`, 500)
pause(500)
moving_led.on()
moving_led.setBlink(600)
input.onButtonPressed(Button.B, () => {
        //music.playTone(Note.C5, 50)
        if (current_x >= 4) {
            
            // Reset the X counter
            current_x = 0;

            moving_led.goTo(current_x, current_y)
            
        } else {
            moving_led.changeXBy(1);
            // Increase X counter
            current_x++;
        }
        serial.writeLine(JSON.stringify("X: " + current_x))
        
    })
input.onButtonPressed(Button.A, () => {
        //music.playTone(Note.B4, 50)
        if (current_y >= 4) {
            
            // Reset the Y counter
            current_y = 0;
            
            moving_led.goTo(current_x, current_y)
            
        } else {
            moving_led.changeYBy(1);
            
            // Increase Y counter
            current_y++;
        }
        serial.writeLine(JSON.stringify("Y: " + current_y))
    })
basic.forever(() => {
        // // The (A) button or the (B) button on long press, selects the LED 
        // if((input.buttonIsPressed(Button.B) || (input.buttonIsPressed(Button.A)))) {
        //     //TODO: if the selected LED is already on, toggle it off
        //     //TODO: add sound for either buttons
        //     // Create a new Sprite and check if it's touching the old one
        //     let new_led = game.createSprite(current_x, current_y)

        //     if (new_led.isTouching(moving_led)) {
        //         new_led.delete()
        //         moving_led.delete()
        //     }

        // }


        input.onButtonPressed(Button.A, function() {
            TouchButtonEvent.LongPressed
        })
    })
})
let moving_led: game.LedSprite = null
// Track moving x,y coordinates
let current_x = 2
let current_y = 2
// Create a sprite at position x:2, y:2 (center)
moving_led = game.createSprite(current_x, current_y)
moving_led.off()
