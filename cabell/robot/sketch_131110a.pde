int startx = 300;
int starty = 50;

int legwidth = 48;
int legheight = 150;

int armwidth = 60;
int armheight = 160;

int headwidth = 200;
int headheight = 100;

int neckwidth = 40;
int neckheight = 60;

int bodywidth = 240;
int bodyheight = 200;

size(800, 600);
rect(startx, starty, headwidth, headheight);
rect (startx+80, starty+100, neckwidth, neckheight);
rect (startx-20, starty+160, bodywidth, bodyheight);
rect (startx+28, starty+360, legwidth, legheight);
rect (startx+124, starty+360, legwidth, legheight);
rect (startx-80, starty+160, armwidth, armheight);
rect (startx+220, starty+160, armwidth, armheight);
