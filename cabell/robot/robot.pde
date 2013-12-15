size(800, 600);

int mid = width/2;
int top = 50;

int headwidth = 200;
int headheight = 100;

float neckwidth = headwidth * 0.2;
float neckheight = headheight * 0.6;

float legwidth = 0.24 * headwidth;
float legheight = headheight * 1.5;

float armwidth = 0.3 * headwidth;
float armheight = headheight * 1.6;

float bodywidth = headwidth * 1.2;
int bodyheight = headheight * 2;

rect(mid-headwidth/2, top, headwidth, headheight); //head
rect(mid-neckwidth/2, top+headheight, neckwidth, neckheight); //neck
rect(mid-bodywidth/2, top+headheight+neckheight, bodywidth, bodyheight); //body
rect(mid-legwidth/2-legwidth, top+headheight+neckheight+bodyheight, legwidth, legheight); //leftleg
rect(mid+legwidth/2, top+headheight+neckheight+bodyheight, legwidth, legheight); //rightleg
rect(mid-bodywidth/2-armwidth, top+headheight+neckheight, armwidth, armheight); //leftarm
rect(mid+bodywidth/2, top+headheight+neckheight, armwidth, armheight); //rightarm

/* TODO
Add eyes, have them follow mouse
Jump when clicked
Add various other actions activated by keypresses, such as smile, fire laser, etc */
