
// Track moving x,y coordinates
let current_x = 2;
let current_y = 2;



input.onButtonPressed(Button.AB, () => {

    // Create a sprite at position x:2, y:2 (center)
    let moving_led = game.createSprite(current_x, current_y)
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
    
    pause(500)
    moving_led.on()
    moving_led.setBlink(300)
    pause(500)

    // The (B) button controlls the X axis
    input.onButtonPressed(Button.B, () => {
        music.playTone(Note.C5, 50)
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

    // The (A) button controlls the Y axis
    input.onButtonPressed(Button.A, () => {
        music.playTone(Note.B5, 50)
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
});