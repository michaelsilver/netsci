int x;
int y;

void setup() {
  size(480, 120);
  x = width / 2;
  y = height / 2;
}

void draw() {
  if (keyPressed && (key == CODED)) {
    if (keyCode == LEFT) {
      x--;
    } else if (keyCode == RIGHT) {
      x++;
    } else if (keyCode == DOWN) {
      y++;
    } else if (keyCode == UP) {
      y--;
    }
  }
  rect(x, y, 50, 50);
}
