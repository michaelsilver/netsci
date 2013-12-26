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
		size(GetScreenWorkingWidth(), GetScreenWorkingHeight());
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
		println("ScreenWidth: " + GetScreenWorkingWidth());
		println("ScreenHeight: " + GetScreenWorkingHeight());
	}

	public static void main(String[] args) {
		PApplet.main(new String[] { "eZDraw.Main", "--present", "--full-screen" });
	}

	public static int GetScreenWorkingWidth() {
		return java.awt.GraphicsEnvironment.getLocalGraphicsEnvironment()
				.getMaximumWindowBounds().width;
	}

	public static int GetScreenWorkingHeight() {
		return java.awt.GraphicsEnvironment.getLocalGraphicsEnvironment()
				.getMaximumWindowBounds().height;
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
			lineShape.setShapeStartData();
		} else if (key == 'r' || key == 'R') {
			// save values to rectShape
			rectShape.setShapeStartData();
		} else if (key == 'c' || key == 'C') {
			circleShape.setShapeStartData();
		} else if (key == 'd' || key == 'D') {
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
			// freeDraw.getData();
		}
	}

	class Createable {
		boolean haveSetShapeStartData = false;

		float[] xStarts = new float[MAX];
		float[] yStarts = new float[MAX];
		float[] xEnds = new float[MAX];
		float[] yEnds = new float[MAX];

		// List<Integer> ints = new ArrayList<Integer>;

	}

	class Shape extends Createable {
		int numberOfShapes = 0;

		void setShapeStartData() {
			if (!haveSetShapeStartData) {
				// start shape
				numberOfShapes++;
				// set starting position of last shape to current position
				xStarts[numberOfShapes - 1] = mouseX;
				yStarts[numberOfShapes - 1] = mouseY;
				// xEnds[numberOfShapes - 1] = mouseX;
				// yEnds[numberOfShapes - 1] = mouseY;
			}
			haveSetShapeStartData = !haveSetShapeStartData;
		}

		void setShapeEndData() {
			if (haveSetShapeStartData) {
				xEnds[numberOfShapes - 1] = mouseX;
				yEnds[numberOfShapes - 1] = mouseY;
			}
		}

		void drawLine() {
			for (int i = 0; i < numberOfShapes; i++) {
				if (xStarts[i] != 0 && yStarts[i] != 0 && xEnds[i] != 0
						&& yEnds[i] != 0) {
					line(xStarts[i], yStarts[i], xEnds[i], yEnds[i]);
				}
			}
		}

		void drawRect() {
			for (int i = 0; i < numberOfShapes; i++) {
				rectMode(CORNERS);
				if (xStarts[i] != 0 && yStarts[i] != 0 && xEnds[i] != 0
						&& yEnds[i] != 0) {
					rect(xStarts[i], yStarts[i], xEnds[i], yEnds[i]);
				}
			}
		}

		void drawCircle() {
			for (int i = 0; i < numberOfShapes; i++) {
				float[] radius = new float[MAX];
				radius[i] = sqrt(sq(xStarts[i] - xEnds[i])
						+ sq(yStarts[i] - yEnds[i]));
				if (xStarts[i] != 0 && yStarts[i] != 0 && xEnds[i] != 0
						&& yEnds[i] != 0) {
					ellipse(xStarts[i], yStarts[i], 2 * radius[i],
							2 * radius[i]);
				}
			}
		}
	}

	class Draw extends Createable {
		int numberOfFrames = 0;
		boolean haveSetShapeStartData = false;

		void getData() {
			haveSetShapeStartData = !haveSetShapeStartData;

			while (haveSetShapeStartData) {
				println("numberOfFrames: " + numberOfFrames);

				if (!haveSetShapeStartData) {
					numberOfFrames++;
					xStarts[numberOfFrames - 1] = mouseX;
					yStarts[numberOfFrames - 1] = mouseY;
					// haveSetShapeStartData = true;
				} else {
					xEnds[numberOfFrames - 1] = mouseX;
					yEnds[numberOfFrames - 1] = mouseY;
					// haveSetShapeStartData = false;s
				}
				haveSetShapeStartData = !haveSetShapeStartData;
			}
			/*
			 * if (!haveSetShapeStartData && haveSetShapeStartData) {
			 * numberOfFrames--; }
			 */

			/*
			 * if (numberOfFrames == 1) { xStarts[numberOfFrames - 1] = mouseX;
			 * yStarts[numberOfFrames - 1] = mouseY; } else {
			 * xStarts[numberOfFrames - 1] = xEnds[numberOfFrames - 2] = mouseX;
			 * yStarts[numberOfFrames - 1] = yEnds[numberOfFrames - 2] = mouseY;
			 * }
			 */
		}

		void drawContinuously() {
			for (int i = 0; i < numberOfFrames; i++) {
				line(xStarts[i], yStarts[i], xEnds[i], yEnds[i]);
			}
		}
	}
}
