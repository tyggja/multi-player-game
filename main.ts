
//1). Create a menu 
    // game.createSprite(0, 2)
    // game.createSprite(1, 2)
    
//2). Move pixel by tilting the board
    // plot(x,y) --> turn on LED on x,y position
    // unplot(x,y) --> turn off LED on x,y position
    // 1024 % 5 = 204.8 (205)
//let filter = 170; // default 205 from
//let last_x = 0;
//let last_y = 0;
let center_sprite = game.createSprite(2, 2);
basic.forever(function () {
    //last_x = input.acceleration(Dimension.X) / filter
    //last_y = input.acceleration(Dimension.Y) / filter
    //led.plot(last_x, last_y)
    //pause(200)
    //if((last_x != input.acceleration(Dimension.X) / filter) && 
    //  (last_y != input.acceleration(Dimension.Y) / filter)) {
    //      led.unplot(last_x, last_y)
    //  }
    if(input.acceleration(Dimension.X) < 0) {
        center_sprite.change(LedSpriteProperty.X, -1)
        pause(200)
    }
    if(input.acceleration(Dimension.X) > 0) {
        center_sprite.change(LedSpriteProperty.X, 1)
        pause(200)
    }
    if(input.acceleration(Dimension.Y) < 0) {
        center_sprite.change(LedSpriteProperty.Y, -1)
        pause(200)
    }
    if(input.acceleration(Dimension.Y) > 0) {
        center_sprite.change(LedSpriteProperty.Y, 1)
        pause(200)
    }
    

    //music.playTone(440, 50)
    //led.unplot(input.acceleration(Dimension.X) / filter,
            //input.acceleration(Dimension.Y) / filter)

})

input.onLogoEvent(TouchButtonEvent.Touched, () => {
    basic.clearScreen();
    //game.createSprite(2, 2)

})
input.onButtonPressed(Button.B, () => {
    //game.createSprite(center_sprite.x, Dimension.Y)
})
