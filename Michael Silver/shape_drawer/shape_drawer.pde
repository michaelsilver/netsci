float[] shapexStarts,shapeyStarts,shapexEnds,shapeyEnds;
int numberOfShapes;
int MAX = 2000;
boolean userIsDrawingShape = false;
int drawingMode;
int SHAPE_TYPE_LINE = 1;
int SHAPE_TYPE_RECT = 2;
int shapesTypes[];
//Shapes shape, rectangle;

void setup(){//called by processing on setup
  size(640,640);
  numberOfShapes = 0;
  shapexStarts = new float[MAX];
  shapeyStarts = new float[MAX];
  shapexEnds = new float[MAX];
  shapeyEnds = new float[MAX];
  shapesTypes = new int[MAX];
  
  drawingMode = SHAPE_TYPE_LINE;
  //new Class Shapes (x
}

void draw(){//called by processing after setup and then every 100 millis
  background(255,255,255);
  for(int i=0; i<numberOfShapes; i++){
     if (shapesTypes[i] == SHAPE_TYPE_LINE){
       line(shapexStarts[i], shapeyStarts[i], shapexEnds[i], shapeyEnds[i]);
     }
     if (shapesTypes[i] == SHAPE_TYPE_RECT){
       rectMode(CORNERS);
       rect(shapexStarts[i], shapeyStarts[i], shapexEnds[i], shapeyEnds[i]);
     }
  }
}
void keyPressed(){
  if (key == 'l' || key == 'L'){
  drawingMode = SHAPE_TYPE_LINE;
  }
  if (key == 'r' || key == 'R'){
    drawingMode = SHAPE_TYPE_RECT;
  }
}

void mouseClicked(){//called by processing on mouse click
  if (!userIsDrawingShape){
    //start shape
    numberOfShapes++;
    //set starting position of last shape to current position
    shapexStarts[numberOfShapes-1] = mouseX;
    shapeyStarts[numberOfShapes-1] = mouseY;
    shapesTypes[numberOfShapes -1] = drawingMode;
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
