int x = 10;
int y = 10;

size(300, 2000);
background (255);


for (int r=0; r<256; r+=10) {
  for (int g=0; g<256; g+=10) {
    for (int b=0; b<256; b+=10) {
      stroke (r, g, b);
      point (x, y);
      x++;
    }
    x=10;
    y++;
  }
}
