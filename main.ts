let moving_led: game.LedSprite = null;
// Track moving x,y coordinates
let current_x = 2;
let current_y = 2;
// Create a sprite at position x:2, y:2 (center)
moving_led = game.createSprite(current_x, current_y);
moving_led.off();

input.onButtonPressed(Button.AB, function () {
    moving_led.delete();
    moving_led = game.createSprite(2, 2);
    basic.showAnimation(
                `
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . .#. . . .#. . . .#. . . .#. . . .#. . . .#. .
        .#.#. .# # #. .#.#. .# # #. .#.#. .# # #.
        . .#. . . .#. . . .#. . . .#. . . .#. . . .#. .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        `,
            500
    );
    
    pause(500);
    moving_led.on();
    moving_led.setBlink(600);
    
    input.onButtonPressed(Button.B, () => {
        //music.playTone(Note.C5, 50)
        if (current_x >= 4) {
            // Reset the X counter
            current_x = 0;

            moving_led.goTo(current_x, current_y);
        } else {
            moving_led.changeXBy(1);
            // Increase X counter
            current_x++;
        }
        serial.writeLine(JSON.stringify("X: " + current_x));
    });

    let longPressDuration = 1000; // 1 second
    let buttonPressStartTime = 0;
    let buttonPressDuration = 0;

    basic.forever(() => {

        // Button (A)
        if (input.buttonIsPressed(Button.A)) {
            // Button A is being held down
            if (buttonPressStartTime == 0) {
                // This is the first iteration of the loop where the button is being held down
                buttonPressStartTime = input.runningTime();
            }
            buttonPressDuration = input.runningTime() - buttonPressStartTime;
            if (buttonPressDuration >= longPressDuration) {
                // Button A has been held down for more than 1 second
                // TODO: Handle long press
                
                buttonPressStartTime = 0;
                buttonPressDuration = 0;
            }
        } else {
            // Button A is not being held down
            if (buttonPressDuration > 0 && buttonPressDuration < longPressDuration) {
                // Button A was released before 1 second
                // Handle short press
                //music.playTone(Note.B4, 50)
                if (current_y >= 4) {
                    // Reset the Y counter
                    current_y = 0;
                    moving_led.goTo(current_x, current_y);
                } else {
                    moving_led.changeYBy(1);
                    
                    // Increase Y counter
                    current_y++;
                }
            }
            buttonPressStartTime = 0;
            buttonPressDuration = 0;
        }

        // Button (B)
        if (input.buttonIsPressed(Button.B)) {
            // Button B is being held down
            if (buttonPressStartTime == 0) {
                // This is the first iteration of the loop where the button is being held down
                buttonPressStartTime = input.runningTime();
            }
            buttonPressDuration = input.runningTime() - buttonPressStartTime;
            if (buttonPressDuration >= longPressDuration) {
                // Button B has been held down for more than 1 second
                // TODO: Handle long press
                
                buttonPressStartTime = 0;
                buttonPressDuration = 0;
            }
        } else {
            // Button B is not being held down
            if (buttonPressDuration > 0 && buttonPressDuration < longPressDuration) {
                // Button B was released before 1 second
                // Handle short press
                //music.playTone(Note.C5, 50)
                if (current_x >= 4) {
                    // Reset the X counter
                    current_x = 0;

                    moving_led.goTo(current_x, current_y);
                } else {
                    moving_led.changeXBy(1);
                    // Increase X counter
                    current_x++;
                }
            }
            
            buttonPressStartTime = 0;
            buttonPressDuration = 0;
        }
    });
});
