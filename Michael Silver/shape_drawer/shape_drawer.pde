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
  if (key == 'l' || key == 'L'){
    if(!userIsDrawingLine){
      //start line
      numberOfLines++;
      //set starting position of last line to current position
      linexStarts[numberOfLines-1] = mouseX;
      lineyStarts[numberOfLines-1] = mouseY;
      userIsDrawingLine = true;
      mouseMoved();
    }else{
      //finish line
      userIsDrawingLine = false;
    }
  }
  if (key == 'r' || key == 'R'){
    if(!userIsDrawingRect){
      //start line
      numberOfRects++;
      //set starting position of last line to current position
      rectxStarts[numberOfRects-1] = mouseX;
      rectyStarts[numberOfRects-1] = mouseY;
      userIsDrawingRect = true;
      mouseMoved();
    }else{
      //finish line
      userIsDrawingRect = false;
    }
  }
}

void mouseMoved() {//called by processing every time mouse moves
  if (key == 'l' || key == 'L'){
    //set ending coordinate of last line to current position while drawing line
    if(userIsDrawingLine){
      linexEnds[numberOfLines-1] = mouseX;
      lineyEnds[numberOfLines-1] = mouseY;
    }
  }
  if (key == 'r' || key == 'R'){
    //set ending coordinate of last rect to current position while drawing line
    if(userIsDrawingRect){
      rectxEnds[numberOfRects-1] = mouseX;
      rectyEnds[numberOfRects-1] = mouseY;
    }
  }
}

void keyPressed(){
  if (key == 'l' || key == 'L'){
    for(int i=0; i<numberOfLines; i++){
      line(linexStarts[i], lineyStarts[i], linexEnds[i], lineyEnds[i]);
    }
    for(int i=0; i<numberOfRects; i++){
      rectMode(CORNERS);
      rect(rectxStarts[i], rectyStarts[i], rectxEnds[i], rectyEnds[i]);
    }
  }
  if (key == 'r' || key == 'R'){
    for(int i=0; i<numberOfLines; i++){
      line(linexStarts[i], lineyStarts[i], linexEnds[i], lineyEnds[i]);
    }
    for(int i=0; i<numberOfRects; i++){
      rectMode(CORNERS);
      rect(rectxStarts[i], rectyStarts[i], rectxEnds[i], rectyEnds[i]);
    }
  }
}
