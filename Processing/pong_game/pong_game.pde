float angle = radians(42);
int ballx;
int bally;
int ballRadius = 10;
int speed = 2;
int paddlex;
int paddley;

void setup() {
  size(600, 600);
  //intitial x and y of ball
}

void draw() {
  background (255);
  
  bally += speed * sin(angle);
  ballx += speed * cos(angle);
  
  //change angle based on what wall has been hit
  
  fill(0);
  ellipse(ballx, bally, 10, 10);
  rect(mouseX, paddley, 30, 10);
}

//need to change the coordinate plane so that y increases from bottom to top
