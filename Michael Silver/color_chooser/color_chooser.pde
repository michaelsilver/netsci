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
    for (r=0; r<256; r++) {
      for (b=0; b<256; b++) {
        stroke (r, g, b);
        point (r+10, b+10);
      }
    }
  }
  
  void drawLine() {
    for (g=0; g<256; g++) {
      if (!clicked) {
        stroke (mouseX-10, g, mouseY-10);
      } else if (clicked){
        stroke (x-10, g, y-10);
      }
      line (286, g+10, 326, g+10);
    }
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
}
  
