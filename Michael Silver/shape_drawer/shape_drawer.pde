int MAX = 20000;
boolean userIsDrawingShape = false;
Shape lineShape, rectShape;
char userKey;

void setup(){//called by processing on setup
  size(640,640);
  lineShape = new Shape(0);
  rectShape = new Shape(0);
  
  println ("press l to draw line");
  println ("press r to draw rectangle");
}

class Shape {
  int numberOfShapes;
  float[] shapexStarts = new float[MAX];
  float[] shapeyStarts = new float[MAX];
  float[] shapexEnds = new float[MAX];
  float[] shapeyEnds = new float[MAX];
  
  Shape(int tempNumberOfShapes){
    numberOfShapes = tempNumberOfShapes;
  }
}

void draw(){//called by processing after setup and then every 100 millis
  background(255,255,255);
  lineShape.drawLine();
  rectShape.drawRect();
}

void keyPressed(){
  userKey = key;
}

void mouseClicked(){//called by processing on mouse click
  if (userKey == 'l' || userKey == 'L'){
    //save values to lineShape
    lineShape.getData();
  }
  if (userKey == 'r' || userKey == 'R'){
    //save values to rectShape
    rectShape.getData();
  }
}
void getData(){
  if (!userIsDrawingShape){
    //start shape
    numberOfShapes++;
    //set starting position of last shape to current position
    shapexStarts[numberOfShapes-1] = mouseX;
    shapeyStarts[numberOfShapes-1] = mouseY;
    userIsDrawingShape = true;
    mouseMoved();
  }else{
    //finish shape
    userIsDrawingShape = false;
   }
}  
void mouseMoved() {//called by processing every time mouse moves
  //set ending coordinate of last shape to current position while drawing shape
  if(userIsDrawingShape){
    shapexEnds[numberOfShapes-1] = mouseX;
    shapeyEnds[numberOfShapes-1] = mouseY;
  }
}

void drawLine(){
  for(int i=0; i<numberOfShapes; i++){
    line(shapexStarts[i], shapeyStarts[i], shapexEnds[i], shapeyEnds[i]);
  }
}

void drawRect(){
  for(int i=0; i<numberOfShapes; i++){
    rectMode(CORNERS);
    rect(shapexStarts[i], shapeyStarts[i], shapexEnds[i], shapeyEnds[i]);
  }
}
