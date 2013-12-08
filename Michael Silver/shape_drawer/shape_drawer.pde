int MAX = 20000;
boolean userIsDrawingShape = false;
Shape lineShape, rectShape, circleShape; //freeEasingShape;
//float easing = 0.05;

void setup() {//called by processing on setup
  size(640,640);
  smooth();
  lineShape = new Shape(0);
  rectShape = new Shape(0);
  circleShape = new Shape(0);
  //freeEasingShape = new Shape(0);
  
  println ("press l to draw line");
  println ("press r to draw rectangle");
  println ("press c for circle");
  println ("press e for freedraw with easing");
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
    if (!userIsDrawingShape) {
      //start shape
      numberOfShapes++;
      //set starting position of last shape to current position
      shapexStarts[numberOfShapes-1] = mouseX;
      shapeyStarts[numberOfShapes-1] = mouseY;
      shapexEnds[numberOfShapes-1] = mouseX;
      shapeyEnds[numberOfShapes-1] = mouseY;
    }   
    userIsDrawingShape = !userIsDrawingShape;
  }
  
  void setShapeEndData() {
    if (numberOfShapes > 0 && userIsDrawingShape) {
      shapexEnds[numberOfShapes-1] = mouseX;
      shapeyEnds[numberOfShapes-1] = mouseY;
    }
  } 
  
  void drawLine() {
    for(int i=0; i<numberOfShapes; i++) {
      line(shapexStarts[i], shapeyStarts[i], shapexEnds[i], shapeyEnds[i]);
    }
  }

  void drawRect() {
    for(int i=0; i<numberOfShapes; i++) {
      rectMode(CORNERS);
      rect(shapexStarts[i], shapeyStarts[i], shapexEnds[i], shapeyEnds[i]);
    }
  }
  
  void drawCircle() {
    for(int i=0; i<numberOfShapes; i++) {
      float[] radius = new float[MAX];
      radius [i] = sqrt(sq(shapexStarts[i] - shapexEnds[i]) + sq(shapeyStarts[i] - shapeyEnds[i]));
      ellipse(shapexStarts[i], shapeyStarts[i], 2*radius[i], 2*radius[i]);
    }
  }
  /*
  void freeEasingDraw() {
    if (userIsDrawingShape) {
      while (shapexEnds[numberOfShapes-1] != mouseX && shapeyEnds[numberOfShapes-1] != mouseY) {
        for(int i=0; i<numberOfShapes; i++) {
          line(shapexStarts[i], shapeyStarts[i], shapexEnds[i], shapeyEnds[i]);
        }
        shapexStarts[numberOfShapes] = shapexEnds[numberOfShapes-1];
        shapeyStarts[numberOfShapes] = shapeyEnds[numberOfShapes-1];
        shapexEnds[numberOfShapes] = shapexStarts[numberOfShapes] + (mouseX - shapexStarts[numberOfShapes]) * easing;
        shapeyEnds[numberOfShapes] = shapeyStarts[numberOfShapes] + (mouseY - shapexStarts[numberOfShapes]) * easing;
        numberOfShapes++;
      }
    }
  }
  */
}

void draw() {//called by processing after setup and then every 100 millis
  background(255,255,255);
  noFill();
  lineShape.drawLine();
  rectShape.drawRect();
  circleShape.drawCircle();
  //freeEasingShape.freeEasingDraw();
}

void mouseClicked() {//called by processing on mouse click
  if (key == 'l' || key == 'L') {
    //save values to lineShape
    lineShape.getData();
  } else if (key == 'r' || key == 'R') {
    //save values to rectShape
    rectShape.getData();
  } else if (key == 'c' || key == 'C') {
    circleShape.getData();
  } //else if (key == 'e' || key == 'E') {
    //freeEasingShape.getData();
  //}
}

void mouseMoved() {
  if (key == 'l' || key == 'L') {
    //save values to lineShape
    lineShape.setShapeEndData();
  } else if (key == 'r' || key == 'R') {
    //save values to rectShape
    rectShape.setShapeEndData();
  } else if (key == 'c' || key == 'C') {
    circleShape.setShapeEndData();
  } 
}
