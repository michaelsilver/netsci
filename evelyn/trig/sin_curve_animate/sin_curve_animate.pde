//CONSTANTS

float inc = PI/200.0;
float py;
int i = 0;
float angle = 0.0;
float  radius = 1.0;
void setup(){
  size(800, 400);
  background(200);
}


void draw(){
  // draw y=sin(x)
  background(200);
  stroke(0);
  //smooth();
  
  float angleforCurve = 0.0;
  line(0,height/2,width, height/2);
  for (int j = 0; j < width; j++){
    stroke(0);
   py = (200/PI)*sin(angleforCurve)+ height/2;
   point(j, py);
   angleforCurve += inc;
   
  }
   py = (200/PI)*sin(angle)+ height/2;
   angle += inc*4;
   line(0,py, i, py);
   //line start point= somewhere on the circle
   //another line on the center of the circle + place along cirumference
   //current angle & position on the circle
   
   ellipse(i, py, 5, 5);
   i += 4;
   
   if (i >= width){
    i=0;
    angle=0; 
   }
   println(i);
   //add calculation output
   text("x = " + i, 50, 50);
   text("angle = " + angle, 150, 50);
   
  
}

