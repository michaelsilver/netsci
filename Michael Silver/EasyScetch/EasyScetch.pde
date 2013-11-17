float[] x = new float[2];
float[] y = new float[2];
boolean looper = true;
boolean mP;

void draw()
{
  initial();
  smooth();
  keyPressed();
}

void initial()
{
  if (looper == true)
  {
    //background(255);
    for (int i = 0; i < 2; i++)
    {
      x[i] = 0;
      y[i] = 0;
    }
    print("Press l on keyboard to draw a line");
    looper = false;
  }
}

void keyPressed()
{
  if (key =='l')
  {
    if (mousePressed == true)
    {
      mP = true;
    }
    if (mP = true)
    {
      x[0] = pmouseX;
      y[0] = pmouseY;
      mP = false;
    }
    if ((x[1] != mouseX) || (y[1] != mouseY))
    {
      stroke(255);
      line (x[0], y[0], x[1], y[1]);
    }
    else
    {
      stroke(0);
      line(x[0], y[0], mouseX, mouseY);
      x[1] = mouseX;
      y[1] = mouseY;
    }
    if (mousePressed == true)
    {
       line(x[0], y[0], mouseX, mouseY);
       print("line(" +x[0]+ ", " +y[0]+ ", " +mouseX+ ", " +mouseY+ ");");
       mousePressed = false;
    }
  }
}
