float[] xStarts,yStarts,xEnds,yEnds;
int numberOfLines;
int MAX_LINES = 20000;
boolean userIsDrawingLine = false;

void setup(){//called by processing on setup
  size(640,640);
  numberOfLines = 0;
  xStarts = new float[MAX_LINES];
  yStarts = new float[MAX_LINES];
  xEnds = new float[MAX_LINES];
  yEnds = new float[MAX_LINES];
}

void draw(){//called by processing after setup and then every 100 millis
  background(255,255,255);
  
  for(int i=0;i<numberOfLines; i++){
    line(xStarts[i], yStarts[i], xEnds[i], yEnds[i]);
  }
}

void mouseClicked(){//called by processing on mouse click
  if(!userIsDrawingLine){
    //start line
    numberOfLines++;
    //set starting position of last line to current position
    xStarts[numberOfLines-1] = mouseX;
    yStarts[numberOfLines-1] = mouseY;
    userIsDrawingLine = true;
    mouseMoved();
  }else{
    //finish line
    userIsDrawingLine = false;
  }
}

void mouseMoved() {//called by processing every time mouse moves
  //set ending coordinate of last line to current position while drawing line
  if(userIsDrawingLine){
    xEnds[numberOfLines-1] = mouseX;
    yEnds[numberOfLines-1] = mouseY;
  }
}
