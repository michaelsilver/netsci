size(800, 600);

int midx = width/2;
// int legseparation

int startx = 300;
int starty = 50;

int headwidth = 200;
int headheight = 100;

int neckwidth = 40;
int neckheight = 60;
int necky = starty+headheight;


int legwidth = 48;
int legheight = 150;

int armwidth = 60;
int armheight = 160;

int bodywidth = 240;
int bodyheight = 200;

rect(midx-headwidth/2, starty, headwidth, headheight); //head
rect (midx-neckwidth/2, necky, neckwidth, neckheight); //neck
rect (midx-bodywidth/2, starty+160, bodywidth, bodyheight); //body
rect (startx+28, starty+360, legwidth, legheight); //leftleg
rect (startx+124, starty+360, legwidth, legheight); //rightleg
rect (startx-80, starty+160, armwidth, armheight); //leftarm
rect (startx+220, starty+160, armwidth, armheight); //rightarm
