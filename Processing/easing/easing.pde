float x;
float easing = 0.01;

void setup() {
  size(220, 120);
  smooth();
}

void draw() {
  float targetX = mouseX;
  x += (targetX - x) * easing;
  stroke(0, 102, 0);
  if (mousePressed) {
    stroke(0, 0, 102);
  }
  ellipse(x, 40, 12, 12);
  println(targetX + " : " + x);
}
