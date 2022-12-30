
// Track moving x,y coordinates
let current_x = 2;
let current_y = 2;

// Create a sprite at position x:2, y:2 (center)
let moving_led = game.createSprite(current_x, current_y)
moving_led.off()

input.onButtonPressed(Button.AB, () => {
    basic.clearScreen()
    pause(500)
    moving_led.on()
    pause(500)

    // The (B) button controlls the X axis
    input.onButtonPressed(Button.B, () => {
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