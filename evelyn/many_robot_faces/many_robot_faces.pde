//pull out a 640x640 pixel canvas.
size (640, 640);
//pull out your brushes that produce smooth, non jagged lines
//this only has a noticable effect on lines that are not vertical/horizontal
//since all lines are, however, straight up and down, this has no effect
smooth ();
//perform the following functions where the variable named "x" starts at 20
//and increments by 80 after each step while it is less than 120
//i.e. perform this once for x=20 and once for x=100
for (int x=20; x < 120; x+=80){
  //perform the following instructions whenever x is less than 320
  //since x only takes two values in this block (100 and 20) which are both less
  //than 320 this statement always executes. If it ever were >= 320 the else block
  //would execute
  if (x<320) {
    //color your brush red (this executes twice in row
    //since coloring your brush without painting anything does nothing
    //the first execution has no effect)
    fill (255, 0,0);
  } else{  
    //color your brush blue (this never executes)
    fill (0, 0, 255);
  }
}

//execute the statements for x starting at 20 while x is < the width of the
//the canvas incrementing in steps of 80. i.e use x=20,100,180,...,580
for (int x=20; x < width; x+=80){
  //execute the statements for x starting at 100 while y is < the height of
  //the cavnas incrementing in steps of 40. I.e. use y=100,140,180,...,600
  for(int y=100; y< height; y+=40){
    //draw the secified figures using the current brush (which happens to always
    //be red and smooth) at the specified coorindates
    rect(x, y , 60, 40);
    rect(x+5, y+10, 15, 15);
    rect(x+35, y+10, 15, 15);
    line(x+10, y+30, x+40, y+30);
    rect(x+10, y+40, 40, 50);
  }
}
