
//1). Create a menu 
    // game.createSprite(0, 2)
    // game.createSprite(1, 2)
    
//2). Move pixel by tilting the board
    // plot(x,y) --> turn on LED on x,y position
    // unplot(x,y) --> turn off LED on x,y position
    // 1024 % 5 = 204.8 (205)
let filter = 170; // default 205 from
let last_x = 0;
let last_y = 0;

basic.forever(function () {
    last_x = input.acceleration(Dimension.X) / filter
    last_y = input.acceleration(Dimension.Y) / filter
    led.plot(last_x, last_y)
    pause(200)
    if((last_x != input.acceleration(Dimension.X) / filter) && 
      (last_y != input.acceleration(Dimension.Y) / filter)) {
          led.unplot(last_x, last_y)
      }
    
    

    //music.playTone(440, 50)
    //led.unplot(input.acceleration(Dimension.X) / filter,
            //input.acceleration(Dimension.Y) / filter)

})

input.onLogoEvent(TouchButtonEvent.Touched, () => {
    basic.clearScreen();
})
