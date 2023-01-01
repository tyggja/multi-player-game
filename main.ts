let moving_led: game.LedSprite = null;
// Track moving x,y coordinates
let current_x = 2;
let current_y = 2;
// Create a sprite at position x:2, y:2 (center)
moving_led = game.createSprite(current_x, current_y);
moving_led.off();

let longPressDuration = 2000; // 1 second
let buttonAPressStartTime = 0;
let buttonAPressDuration = 0;
let buttonBPressStartTime = 0;
let buttonBPressDuration = 0;
let buttonABPressStartTime = 0;
let buttonABPressDuration = 0;

basic.forever(() => {
    
    // Button (A)
    if (input.buttonIsPressed(Button.A)) {
        // Button A is being held down
        if (buttonAPressStartTime == 0) {
            // This is the first iteration of the loop where the button is being held down
            buttonAPressStartTime = input.runningTime();
        }
        buttonAPressDuration = input.runningTime() - buttonAPressStartTime;
        if (buttonAPressDuration >= longPressDuration) {
            // Button A has been held down for more than 1 second
            // TODO: Handle long press

            buttonAPressStartTime = 0;
            buttonAPressDuration = 0;
        }
    } else {
        // Button A is not being held down
        if (buttonAPressDuration > 0 && buttonAPressDuration < longPressDuration) {
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
        buttonAPressStartTime = 0;
        buttonAPressDuration = 0;
    }

    // Button (B)
    if (input.buttonIsPressed(Button.B)) {
        // Button B is being held down
        if (buttonBPressStartTime == 0) {
            // This is the first iteration of the loop where the button is being held down
            buttonBPressStartTime = input.runningTime();
        }
        buttonBPressDuration = input.runningTime() - buttonBPressStartTime;
        if (buttonBPressDuration >= longPressDuration) {
            // Button B has been held down for more than 1 second
            // TODO: Handle long press

            buttonBPressStartTime = 0;
            buttonBPressDuration = 0;
        }
    } else {
        // Button B is not being held down
        if (buttonBPressDuration > 0 && buttonBPressDuration < longPressDuration) {
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

        buttonBPressStartTime = 0;
        buttonBPressDuration = 0;
    }

    // Button (A&B)
    if (input.buttonIsPressed(Button.AB)) {
        // Buttons AB are  being held down
        if (buttonABPressStartTime == 0) {
            // This is the first iteration of the loop where the buttons are being held down
            buttonABPressStartTime = input.runningTime();
        }
        buttonABPressDuration = input.runningTime() - buttonABPressStartTime;
        if (buttonABPressDuration >= longPressDuration) {
            // Buttons AB have been held down for more than 1 second
            // TODO: Handle long press
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
                300
            );

            moving_led.on();
            moving_led.setBlink(300);

            buttonABPressStartTime = 0;
            buttonABPressDuration = 0;
        }
    }
});
