package eZDraw;

import processing.core.PApplet;

public class Main extends PApplet {
	int MAX = 10000;
	int BORDERWIDTH = 15;
	int BORDERHEIGHT = 20;
	int RANGE = 256;
	int STRIPEWIDTH = 2 * BORDERWIDTH;
	int BUTTONHEIGHT = 30;
	int MENUAREAWIDTH = 3 * BORDERWIDTH + RANGE - 1 + STRIPEWIDTH;
	int MENUAREAHEIGHT = 2 * BORDERHEIGHT + BUTTONHEIGHT;
	int SAMPLEBOXHEIGHT = 30;
	int REDBLUEBOXSTARTX;
	int REDBLUEBOXSTARTY = BORDERWIDTH;
	int STRIPESTARTX;
	int STRIPESTARTY = BORDERWIDTH;
	int[][] keyPoint = new int[6][2]; // 6 key points, each with an (x,y)
										// corresponding to indeces (0,1)
	int red, green, blue;

	Createable pointShape, lineShape, rectShape, squareShape, ellipseShape,
			circleShape;
	Draw freeDraw, easingDraw;
	MenuItem redBlueBox, greenStripe;
//	private boolean menuchanged = true;

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override
	public void setup() {
		size(GetScreenWorkingWidth(), GetScreenWorkingHeight());
		REDBLUEBOXSTARTX = width - MENUAREAWIDTH + BORDERWIDTH;
		STRIPESTARTX = width - BORDERWIDTH - STRIPEWIDTH;
		pointShape = new Createable();
		lineShape = new Createable();
		rectShape = new Createable();
		squareShape = new Createable();
		ellipseShape = new Createable();
		circleShape = new Createable();
		freeDraw = new Draw();
		easingDraw = new Draw();
		redBlueBox = new MenuItem();
		greenStripe = new MenuItem();

		keyPoint[0][0] = width - MENUAREAWIDTH;
		keyPoint[0][1] = 0;
		keyPoint[1][0] = width;
		keyPoint[1][1] = 0;
		keyPoint[2][0] = width;
		keyPoint[2][1] = height;
		keyPoint[3][0] = 0;
		keyPoint[3][1] = height;
		keyPoint[4][0] = 0;
		keyPoint[4][1] = height - MENUAREAHEIGHT;
		keyPoint[5][0] = width - MENUAREAWIDTH;
		keyPoint[5][1] = height - MENUAREAHEIGHT;

		println("Keyboard Shortcuts:");
		println(" - press l to draw line");
		println(" - press r to draw rectangle");
		println(" - press s to draw square");
		println(" - press o to draw ellipse");
		println(" - press c to draw circle");
		println(" - press d to freeDraw");
		println(" - press e to draw with easing");

		// GUI
		smooth();
		// drawMenuArea();
		// drawOutlining();
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
						// milliseconds
		background(255, 255, 255);
		noFill();
		// BACKGROUND
		drawMenuArea(); // just once?
		drawCanvas();
		drawOutlining(); // just once?
		// DRAWING
		noFill();
		pointShape.drawPoint();
		lineShape.drawLine();
		rectShape.drawRect();
		squareShape.drawSquare();
		ellipseShape.drawEllipse();
		circleShape.drawCircle();
		freeDraw.drawLine();
		easingDraw.drawLine();
		// MENU ITEMS
//		if (menuchanged ) {
//			redBlueBox.drawRedBlueBox();
//			greenStripe.drawGreenStripe();
//			redBlueBox.drawYellowPoint();
//			greenStripe.drawYellowLine();
//			drawSampleColorBox();
//		}
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
		// MENU ITEMS
		greenStripe.stripeClicked();
		redBlueBox.boxClicked();
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

		void drawPoint() {
			for (int i = 0; i < numberOfShapes; i++) {
				point(xStarts[i], yStarts[i]);
			}
		}

		void drawLine() {
			for (int i = 0; i < numberOfShapes; i++) {
				float[] tmp = { xStarts[i], yStarts[i], xEnds[i], yEnds[i] };
				if (haveData(tmp, 4)) {
					line(xStarts[i], yStarts[i], xEnds[i], yEnds[i]);
				}
			}
		}

		void drawRect() {
			for (int i = 0; i < numberOfShapes; i++) {
				rectMode(CORNERS);
				float[] tmp = { xStarts[i], yStarts[i], xEnds[i], yEnds[i] };
				if (haveData(tmp, 4)) {
					rect(xStarts[i], yStarts[i], xEnds[i], yEnds[i]);
				}
			}
		}

		void drawSquare() { // look at - now working properly
			for (int i = 0; i < numberOfShapes; i++) {
				rectMode(CORNERS);
				float[] side = new float[MAX];
				float[] tmp = { xStarts[i], yStarts[i], xEnds[i], yEnds[i] };
				if (haveData(tmp, 4)) {
					side[i] = xEnds[i] - xStarts[i];
					yEnds[i] = yStarts[i] + side[i];
				}
				rect(xStarts[i], yStarts[i], xEnds[i], yEnds[i]);
			}
		}

		void drawEllipse() {
			boolean wantAssistingRectangle = true; // to be determined by a menu
													// item
			float xRectStart, yRectStart, rectWidth, rectHeight;
			for (int i = 0; i < numberOfShapes; i++) {
				float[] ellipseWidth = new float[MAX];
				float[] ellipseHeight = new float[MAX];
				float[] tmp = { xStarts[i], yStarts[i], xEnds[i], yEnds[i] };
				if (haveData(tmp, 4)) {
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
				float[] tmp = { xStarts[i], yStarts[i], xEnds[i], yEnds[i] };
				if (haveData(tmp, 4)) {
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

	class MenuItem {
		int x, y;
		boolean clicked = false;

		void drawRedBlueBox() {
			for (int red = 0; red < RANGE; red++) {
				for (int blue = 0; blue < RANGE; blue++) {
					if (!greenStripe.clicked && inGreenStripe()) {
						stroke(red, mouseY - STRIPESTARTY, blue);
					} else if (greenStripe.clicked) {
						green = greenStripe.y - STRIPESTARTY;
						stroke(red, green, blue);
					} else {
						stroke(red, 0, blue);
					}
					point(REDBLUEBOXSTARTX + red, REDBLUEBOXSTARTY + blue);
				}
			}
		}

		void drawGreenStripe() {
			for (int green = 0; green < RANGE; green++) {
				if (!redBlueBox.clicked && inRedBlueBox()) {
					stroke(mouseX - REDBLUEBOXSTARTX, green, mouseY
							- REDBLUEBOXSTARTY);
				} else if (redBlueBox.clicked) {
					red = redBlueBox.x - REDBLUEBOXSTARTX;
					blue = redBlueBox.y - REDBLUEBOXSTARTY;
					stroke(red, green, blue);
				} else {
					stroke(0, green, 0);
				}
				line(STRIPESTARTX, green + STRIPESTARTY, STRIPESTARTX
						+ STRIPEWIDTH, green + STRIPESTARTY);
			}
		}

		void boxClicked() {
			if (inRedBlueBox()) {
				clicked = true;
				x = mouseX;
				y = mouseY;
			} else if (!inGreenStripe()) {
				clicked = false;
			}
		}

		void drawYellowPoint() {
			if (clicked) {
				stroke(255, 255, 0);
				point(x, y);
			}
		}

		void stripeClicked() {
			if (inGreenStripe()) {
				clicked = true;
				y = mouseY;
			} else if (!inRedBlueBox()) {
				clicked = false;
			}
		}

		void drawYellowLine() {
			if (clicked) {
				stroke(255, 255, 0);
				line(STRIPESTARTX, y, STRIPESTARTX + STRIPEWIDTH, y);
			}
		}
	}

	// CODE-SPECIFIC FUNCTIONS
	boolean inRedBlueBox() {
		return inRect(mouseX, mouseY, REDBLUEBOXSTARTX, REDBLUEBOXSTARTY,
				REDBLUEBOXSTARTX + RANGE, REDBLUEBOXSTARTY + RANGE);
	}

	boolean inGreenStripe() {
		return inRect(mouseX, mouseY, STRIPESTARTX, STRIPESTARTY, STRIPESTARTX
				+ STRIPEWIDTH, STRIPESTARTY + RANGE);
	}

	// UTLITIES -- I want to add all these to the library
	boolean inRect(int x, int y, int targetXStart, int targetYStart,
			int targetXEnd, int targetYEnd) {
		return inRange(x, targetXStart, targetXEnd)
				&& inRange(y, targetYStart, targetYEnd);
	}

	boolean inRange(int value, int start, int end) {
		return value >= start && value <= end;
	}

	boolean haveData(float[] dataPoint, int arrayLength) {
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

	void circle(float x, float y, float radius) {
		ellipse(x, y, 2 * radius, 2 * radius);
	}

	// MENU ITEMS
	void drawMenuArea() {
		noStroke();
		fill(RANGE / 2, RANGE / 2, RANGE / 2);
		rectMode(CORNERS);
		rect(0, 0, width, height);
	}

	void drawCanvas() {
		noStroke();
		fill(255, 255, 255); // to be determined by menu item
		rectMode(CORNERS);
		rect(0, 0, width - MENUAREAWIDTH - 1, height - MENUAREAHEIGHT - 1);
	}

	void drawOutlining() {
		stroke(0, 0, 0);
		for (int i = 0; i < 5; i++) {
			line(keyPoint[i][0], keyPoint[i][1], keyPoint[i + 1][0],
					keyPoint[i + 1][1]);
		}
		line(keyPoint[5][0], keyPoint[5][1], keyPoint[0][0], keyPoint[0][1]);
	}

	void drawSampleColorBox() {
		noStroke();
		fill(red, green, blue);
		rectMode(CORNERS);
		rect(REDBLUEBOXSTARTX, REDBLUEBOXSTARTY + RANGE + BORDERWIDTH,
				STRIPESTARTX + STRIPEWIDTH + 1, STRIPESTARTY + RANGE
						+ BORDERWIDTH + SAMPLEBOXHEIGHT);
	}
}
