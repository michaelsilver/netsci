package eZDraw;

import processing.core.PApplet;

public class Main extends PApplet {
	int MAX = 10000;
	Createable pointShape, lineShape, rectShape, squareShape, ellipseShape,
			circleShape;
	Draw freeDraw, easingDraw;
	// Draw freeDraw, easingDraw;

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override
	public void setup() {
		size(GetScreenWorkingWidth(), GetScreenWorkingHeight());
		pointShape = new Createable();
		lineShape = new Createable();
		rectShape = new Createable();
		squareShape = new Createable();
		ellipseShape = new Createable();
		circleShape = new Createable();
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
		smooth();
		noFill();
		pointShape.drawPoint();
		lineShape.drawLine();
		rectShape.drawRect();
		squareShape.drawSquare();
		ellipseShape.drawEllipse();
		circleShape.drawCircle();
		freeDraw.drawLine();
		easingDraw.drawLine();
	}

	public void mouseClicked() {// called by processing on mouse click
		if (key == 'p' || key == 'P') {
			pointShape.setPointData();
		} else if (key == 'l' || key == 'L') {
			// save values to lineShape
			lineShape.setShapeStartData();
		} else if (key == 'r' || key == 'R') {
			// save values to rectShape
			rectShape.setShapeStartData();
		} else if (key == 's' || key == 'S') {
			// save values to rectShape
			squareShape.setShapeStartData();
		} else if (key == 'o' || key == 'O') { // note O is for ellipse
			// save values to rectShape
			ellipseShape.setShapeStartData();
		} else if (key == 'c' || key == 'C') {
			circleShape.setShapeStartData();
		} else if (key == 'd' || key == 'D') {
			freeDraw.setDrawStartData();
		} else if (key == 'e' || key == 'E') {
			easingDraw.setDrawStartData();
		}
	}

	public void mouseMoved() {
		if (key == 'l' || key == 'L') {
			// save values to lineShape
			lineShape.setShapeEndData();
		} else if (key == 'r' || key == 'R') {
			// save values to rectShape
			rectShape.setShapeEndData();
		} else if (key == 's' || key == 'S') {
			// save values to rectShape
			squareShape.setShapeEndData();
		} else if (key == 'o' || key == 'O') { // note O is for ellipse
			// save values to rectShape
			ellipseShape.setShapeEndData();
		} else if (key == 'c' || key == 'C') {
			circleShape.setShapeEndData();
		} else if (key == 'd' || key == 'D') {
			freeDraw.setFreeDrawEndData();
		} else if (key == 'e' || key == 'E') {
			easingDraw.setEasingDrawEndData();
		}
	}

	class Createable {
		boolean haveSetShapeStartData = false;
		int numberOfShapes = 0;

		float[] xStarts = new float[MAX];
		float[] yStarts = new float[MAX];
		float[] xEnds = new float[MAX];
		float[] yEnds = new float[MAX];

		void setShapeStartData() {
			if (!haveSetShapeStartData) {
				// start shape
				numberOfShapes++;
				// set starting position of last shape to current position
				xStarts[numberOfShapes - 1] = mouseX;
				yStarts[numberOfShapes - 1] = mouseY;
			}
			haveSetShapeStartData = !haveSetShapeStartData;
		}

		void setShapeEndData() {
			if (haveSetShapeStartData) {
				xEnds[numberOfShapes - 1] = mouseX;
				yEnds[numberOfShapes - 1] = mouseY;
			}
		}

		void setPointData() {
			numberOfShapes++;
			xStarts[numberOfShapes - 1] = mouseX;
			yStarts[numberOfShapes - 1] = mouseY;
		}

		// save comment below! - just in case
		/*
		 * boolean haveData(float dataPoint1, float dataPoint2, float
		 * dataPoint3, float dataPoint4) { if (dataPoint1 != 0 && dataPoint2 !=
		 * 0 && dataPoint3 != 0 && dataPoint4 != 0) { return true; } else {
		 * return false; } }
		 */
		boolean haveData(float[] dataPoint, int arrayLength) { // I want to add
																// this to the
																// library
			int j = 0;
			for (int i = 0; i < arrayLength; i++) {
				if (dataPoint[i] != 0) {
					j++;
				}
			}
			if (j == arrayLength) {
				return true;
			} else {
				return false;
			}
		}

		void circle(float x, float y, float radius) { // I want to add this to
														// the library
			ellipse(x, y, 2 * radius, 2 * radius);
		}

		void drawPoint() {
			for (int i = 0; i < numberOfShapes; i++) {
				point(xStarts[i], yStarts[i]);
			}
		}

		void drawLine() {
			for (int i = 0; i < numberOfShapes; i++) {
				float[] temp = { xStarts[i], yStarts[i], xEnds[i], yEnds[i] };
				if (haveData(temp, 4)) {
					line(xStarts[i], yStarts[i], xEnds[i], yEnds[i]);
				}
			}
		}

		void drawRect() {
			for (int i = 0; i < numberOfShapes; i++) {
				rectMode(CORNERS);
				float[] temp = { xStarts[i], yStarts[i], xEnds[i], yEnds[i] };
				if (haveData(temp, 4)) {
					rect(xStarts[i], yStarts[i], xEnds[i], yEnds[i]);
				}
			}
		}

		void drawSquare() {
			for (int i = 0; i < numberOfShapes; i++) {
				rectMode(CORNERS);
				float[] side = new float[MAX];
				float[] temp = { xStarts[i], yStarts[i], xEnds[i], yEnds[i] };
				if (haveData(temp, 4)) {
					if (abs(xEnds[i] - xStarts[i]) >= abs(yEnds[i] - yStarts[i])) {
						if (xEnds[i] >= xStarts[i]) {
							side[i] = xEnds[i] - xStarts[i];
						} else {
							side[i] = xStarts[i] - xEnds[i];
						}
						yEnds[i] = yStarts[i] + side[i];
					} else {
						if (yEnds[i] >= yStarts[i]) {
							side[i] = yEnds[i] - yStarts[i];
						} else {
							side[i] = yStarts[i] - yEnds[i];
						}
						xEnds[i] = xStarts[i] + side[i];
					}
					rect(xStarts[i], yStarts[i], xEnds[i], yEnds[i]);
				}
			}
		}

		void drawEllipse() {
			boolean wantAssistingRectangle = true; // to be determined by a menu
													// item
			float xRectStart, yRectStart, rectWidth, rectHeight;
			for (int i = 0; i < numberOfShapes; i++) {
				float[] ellipseWidth = new float[MAX];
				float[] ellipseHeight = new float[MAX];
				float[] temp = { xStarts[i], yStarts[i], xEnds[i], yEnds[i] };
				if (haveData(temp, 4)) {
					ellipseWidth[i] = 2 * abs(xEnds[i] - xStarts[i]);
					ellipseHeight[i] = 2 * abs(yEnds[i] - yStarts[i]);
					ellipse(xStarts[i], yStarts[i], ellipseWidth[i],
							ellipseHeight[i]);
				}
				if (haveSetShapeStartData && wantAssistingRectangle) {
					rectMode(CENTER);
					xRectStart = xStarts[numberOfShapes - 1];
					yRectStart = yStarts[numberOfShapes - 1];
					rectWidth = ellipseWidth[numberOfShapes - 1];
					rectHeight = ellipseHeight[numberOfShapes - 1];
					rect(xRectStart, yRectStart, rectWidth, rectHeight);
				}
			}
		}

		void drawCircle() {
			for (int i = 0; i < numberOfShapes; i++) {
				float[] radius = new float[MAX];
				float[] temp = { xStarts[i], yStarts[i], xEnds[i], yEnds[i] };
				if (haveData(temp, 4)) {
					radius[i] = dist(xStarts[i], yStarts[i], xEnds[i], yEnds[i]);
					circle(xStarts[i], yStarts[i], radius[i]);
				}
			}
		}
	}

	class Draw extends Createable {
		boolean penDown = false;
		float easing = 0.5f; // to be determined by a menu item

		void setDrawStartData() {
			penDown = !penDown;

			if (penDown) {
				numberOfShapes++;
				xStarts[numberOfShapes - 1] = mouseX;
				yStarts[numberOfShapes - 1] = mouseY;
			}
		}

		void setFreeDrawEndData() {
			if (penDown) {
				xEnds[numberOfShapes - 1] = xStarts[numberOfShapes] = mouseX;
				yEnds[numberOfShapes - 1] = yStarts[numberOfShapes] = mouseY;
				numberOfShapes++;
			}
		}

		void setEasingDrawEndData() {
			if (penDown) {
				xEnds[numberOfShapes - 1] = xStarts[numberOfShapes] = (easing * (mouseX - xStarts[numberOfShapes - 1]))
						+ xStarts[numberOfShapes - 1];
				yEnds[numberOfShapes - 1] = yStarts[numberOfShapes] = (easing * (mouseY - yStarts[numberOfShapes - 1]))
						+ yStarts[numberOfShapes - 1];
				numberOfShapes++;
			}
		}
	}
}
