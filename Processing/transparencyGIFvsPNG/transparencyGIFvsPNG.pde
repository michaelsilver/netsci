PImage img1, img2;

/*
void setup() {
  size(480, 120);
  img1 = loadImage("clouds.gif");
}

void draw() {
  background(255);
  image(img1, 0, 0);
  image(img1, 0, mouseY * -1);
}
*/

void setup() {
  size(480, 120);
  img2 = loadImage("clouds.png");
}

void draw() {
  background(255);
  image(img2, 0, 0);
  image(img2, 0, mouseY * -1);
}

