float[] linexStarts,lineyStarts,linexEnds,lineyEnds;
float[] rectxStarts,rectyStarts,rectxEnds,rectyEnds;
int numberOfLines;
int numberOfRects;
int MAX = 20000;
boolean userIsDrawingLine = false;
boolean userIsDrawingRect = false;

void setup(){//called by processing on setup
  size(640,640);
  numberOfLines = 0;
  numberOfRects = 0;
  linexStarts = new float[MAX];
  lineyStarts = new float[MAX];
  linexEnds = new float[MAX];
  lineyEnds = new float[MAX];
  rectxStarts = new float[MAX];
  rectyStarts = new float[MAX];
  rectxEnds = new float[MAX];
  rectyEnds = new float[MAX];
}

void draw(){//called by processing after setup and then every 100 millis
  background(255,255,255);
  keyPressed();
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

void keyPressed(){
  if (key == 'l' || key == 'L'){
    for(int i=0; i<numberOfLines; i++){
      line(linexStarts[i], lineyStarts[i], linexEnds[i], lineyEnds[i]);
    }
  }
  if (key == 'r' || key == 'R'){
    for(int i=0; i<numberOfRects; i++){
      rectMode(CORNERS);
      rect(rectxStarts[i], rectyStarts[i], rectxEnds[i], rectyEnds[i]);
    }
  }
}
