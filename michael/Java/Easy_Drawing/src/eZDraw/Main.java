package eZDraw;

import processing.core.PApplet;

public class Main extends PApplet {
	int MAX = 10000;
	Shape lineShape, rectShape, circleShape;
	Draw freeDraw, easingDraw;

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override
	public void setup() {
		size(1300, 1000);
		smooth();
		lineShape = new Shape();
		rectShape = new Shape();
		circleShape = new Shape();
		freeDraw = new Draw();
		easingDraw = new Draw();

		println("press l to draw line");
		println("press r to draw rectangle");
		println("press c for circle");
		println("press d for freeDraw");
	}

	public static void main(String[] args) {
		PApplet.main(new String[] { "--present", "eZDraw.Main" });
	}

	public void draw() {// called by processing after setup and then every 100
						// millis
		background(255, 255, 255);
		noFill();
		lineShape.drawLine();
		rectShape.drawRect();
		circleShape.drawCircle();
		freeDraw.drawContinuously();
	}

	public void mouseClicked() {// called by processing on mouse click
		if (key == 'l' || key == 'L') {
			// save values to lineShape
			lineShape.getData();
		} else if (key == 'r' || key == 'R') {
			// save values to rectShape
			rectShape.getData();
		} else if (key == 'c' || key == 'C') {
			circleShape.getData();
		} else if (key == 'd' || key == 'D') {
			freeDraw.userIsDrawing = !freeDraw.userIsDrawing;
			freeDraw.getData();
		}
	}

	public void mouseMoved() {
		if (key == 'l' || key == 'L') {
			// save values to lineShape
			lineShape.setShapeEndData();
		} else if (key == 'r' || key == 'R') {
			// save values to rectShape
			rectShape.setShapeEndData();
		} else if (key == 'c' || key == 'C') {
			circleShape.setShapeEndData();
		} else if (key == 'd' || key == 'D') {
			freeDraw.getData();
		}
	}

	class Createable {
		boolean userIsDrawing = false;
		float[] xStarts = new float[MAX];
		float[] yStarts = new float[MAX];
		float[] xEnds = new float[MAX];
		float[] yEnds = new float[MAX];
	}

	class Shape extends Createable {
		int numberOfShapes = 0;

		void getData() {
			if (!userIsDrawing) {
				// start shape
				numberOfShapes++;
				// set starting position of last shape to current position
				xStarts[numberOfShapes - 1] = mouseX;
				yStarts[numberOfShapes - 1] = mouseY;
				xEnds[numberOfShapes - 1] = mouseX;
				yEnds[numberOfShapes - 1] = mouseY;
			}
			userIsDrawing = !userIsDrawing;
		}

		void setShapeEndData() {
			if (userIsDrawing) {
				xEnds[numberOfShapes - 1] = mouseX;
				yEnds[numberOfShapes - 1] = mouseY;
			}
		}

		void drawLine() {
			for (int i = 0; i < numberOfShapes; i++) {
				line(xStarts[i], yStarts[i], xEnds[i], yEnds[i]);
			}
		}

		void drawRect() {
			for (int i = 0; i < numberOfShapes; i++) {
				rectMode(CORNERS);
				rect(xStarts[i], yStarts[i], xEnds[i], yEnds[i]);
			}
		}

		void drawCircle() {
			for (int i = 0; i < numberOfShapes; i++) {
				float[] radius = new float[MAX];
				radius[i] = sqrt(sq(xStarts[i] - xEnds[i])
						+ sq(yStarts[i] - yEnds[i]));
				ellipse(xStarts[i], yStarts[i], 2 * radius[i], 2 * radius[i]);
			}
		}
	}

	class Draw extends Createable {
		int numberOfFrames = 0;

		void getData() {
			if (userIsDrawing) {
				numberOfFrames++;
				if (numberOfFrames == 1) {
					xStarts[numberOfFrames - 1] = mouseX;
					yStarts[numberOfFrames - 1] = mouseY;
				} else {
					xStarts[numberOfFrames - 1] = xEnds[numberOfFrames - 2] = mouseX;
					yStarts[numberOfFrames - 1] = yEnds[numberOfFrames - 2] = mouseY;
				}
			}
		}

		void drawContinuously() {
			for (int i = 0; i < numberOfFrames; i++) {
				line(xStarts[i], yStarts[i], xEnds[i], yEnds[i]);
			}
		}
	}
}
