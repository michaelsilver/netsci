//CONSTANTS

float inc = PI/200.0;
float py;
int i = 200;
float angle =0.0;
float  radius = 1.0;
void setup(){
  size(1000, 600);
  background(200);

}

void draw(){

  // draw y=sin(x)
  background(200);
  stroke(0);
  //smooth();
  ellipse(400/PI,height/2, 400.0/PI, 400.0/PI);
  float angleforCurve = -PI;
  line(0,height/2,width, height/2);
  for (int j = 200; j < width; j++){
    stroke(0);
   py = (200/PI)*sin(angleforCurve)+ height/2;
   point(j, py);
   angleforCurve += inc;
   
  }
   
   
   py = (200/PI)*sin(angle+PI)+ height/2;
   angle += inc*4;
    
   line(400/PI+(200/PI)*cos(angle), 300-(200/PI)*sin(angle), i, py);
       
   line(100,height/2, 100, 300);
 
   
   ellipse(i, py, 5, 5);
   i += 4;
  
   line(400/PI, 300, 400/PI+(200/PI)*cos(angle), 300-(200/PI)*sin(angle));
   
   
   if (i >= width){
    i=200;
    angle=0; 
   }
   
   //add calculation output
   text("x = " + i, 50, 50);
   text("angle = " + angle, 150, 50);
   
  
}

  



