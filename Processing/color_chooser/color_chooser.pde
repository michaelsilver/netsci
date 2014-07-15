static final int BORDER = 10;
static final int RANGE = 256;

abstract class DrawableInteractive{
  protected int clickX, clickY;
  protected boolean clicked = false;
  
  abstract void draw();
  void mouseClicked(int x, int y){
    clickX = x;
    clickY = y;
    clicked = true;
  }
}
class ColorBar extends DrawableInteractive{
  void draw(){
    for (int g=0; g<RANGE; g++) {
      //if (!clicked) {
      //  stroke (mouseX-10, g, mouseY-10);
      //} else if (clicked){
        stroke (0, g, 0);
      //}
      line (0, g, BORDER, g);
    }
  }
}

class ColorSquare extends DrawableInteractive{
  int g = 0;
  void draw(){
    for (int r=0; r<RANGE; r++) {
      for (int b=0; b<RANGE; b++) {
        stroke (r, g, b);
        point (r, b);
      }
    }
    if(clicked){
      fill(128, 128, 0, 0.5);
      ellipse(clickX, clickY, 10, 10);
    }
  }
}

DrawableInteractive bar, square;

void setup(){
  size(RANGE + BORDER * 4, RANGE + BORDER * 2);
  bar = new ColorBar();
  square = new ColorSquare();
}

void draw(){
  resetMatrix();
  
  translate(BORDER, BORDER);
  square.draw();
  translate(RANGE + BORDER, 0);
  bar.draw();
}

void mouseClicked(){
  mouseX = mouseX - BORDER;
  mouseY = mouseY - BORDER;
  if(clickInTargetRect(mouseX, mouseY, 0, 0, RANGE, RANGE)){ // if in colorSquare
    square.mouseClicked(mouseX, mouseY);
    return;
  }
  mouseX = mouseX - (RANGE + BORDER);
}

//UTLITIES
boolean clickInTargetRect(int clickX, int clickY, int targetX, int targetY,
  int targetWidth, int targetHeight){
  return inRange(clickX, targetX, targetWidth) && inRange(clickY, targetY, targetHeight);
}
boolean inRange(int value, int start, int extent){
  return value > start && value < start + extent;
}

/*
Object boxObject, lineObject;

void setup () {
  size(500, 350);
  boxObject = new Object();
  lineObject = new Object();
}

class Object {
  int r, g, b, x, y;
  boolean clicked = false;
  
  void drawBox() {
    for (int r=0; r<RANGE; r++) {
      for (int b=0; b<RANGE; b++) {
        stroke (r, g, b);
        point (r, b);
      }
  }
  
  void drawLine() {
    for (int g=0; g<RANGE; g++) {
      //if (!clicked) {
      //  stroke (mouseX-10, g, mouseY-10);
      //} else if (clicked){
        stroke (0, g, 0);
      //}
      line (0, g, BORDER, g);
  }
  
  void boxClicked() {
    if (mouseX<=265 && mouseY<=265) {
      clicked = true;
      x = mouseX;
      y = mouseY;
    } else {
      clicked = false;
    }
  }
  
  void drawYellowPoint() {
    if (clicked) {
      stroke (255, 255, 0);
      point (x, y);
    } 
  }
  
  void lineClicked() {
    if (mouseX>=286) {
      clicked = true;
      y = mouseY;
    } else {
      clicked = false;
    }
  }
}
    
void draw() {
  background (255);
  strokeWeight(10);
  boxObject.drawBox();
  lineObject.drawLine();
  lineObject.drawYellowPoint();
}

void mouseClicked () {
  lineObject.boxClicked();
  boxObject.lineClicked();
}*/
