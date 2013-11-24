int MAX = 20000;
boolean userIsDrawingShape = false;
Shape lineShape, rectShape;
char userKey;

void setup() {//called by processing on setup
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
  
  Shape(int tempNumberOfShapes) {
    numberOfShapes = tempNumberOfShapes;
  }
  void getData() {
    if (!userIsDrawingShape){
      //start shape
      numberOfShapes++;
      //set starting position of last shape to current position
      shapexStarts[numberOfShapes-1] = mouseX;
      shapeyStarts[numberOfShapes-1] = mouseY;
    }
    userIsDrawingShape = !userIsDrawingShape;
    while (userIsDrawingShape) {
      shapexEnds[numberOfShapes-1] = mouseX;
      shapeyEnds[numberOfShapes-1] = mouseY;
    }
    println("I've stopped drawing");
    }
    void drawLine() {
      for(int i=0; i<numberOfShapes; i++){
        line(shapexStarts[i], shapeyStarts[i], shapexEnds[i], shapeyEnds[i]);
      }
    }

  void drawRect() {
    for(int i=0; i<numberOfShapes; i++){
      rectMode(CORNERS);
      rect(shapexStarts[i], shapeyStarts[i], shapexEnds[i], shapeyEnds[i]);
    }
  }
}

void draw() {//called by processing after setup and then every 100 millis
  background(255,255,255);
  lineShape.drawLine();
  rectShape.drawRect();
}

void mouseClicked() {//called by processing on mouse click
  if (key == 'l' || key == 'L') {
    //save values to lineShape
    lineShape.getData();
  } else if (key == 'r' || key == 'R') {
    //save values to rectShape
    rectShape.getData();
  }
  println("I've been clicked");
}
