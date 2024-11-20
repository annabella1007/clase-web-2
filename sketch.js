let font;
let tSize = 100; // Text size
let tposX = 350; // X position of text
let tposY = 500; // Y position of text
let pointCount = 0.9; // Sample factor for points
let speed = 1; // Speed of particles
let comebackSpeed = 100; // Longer value means less interaction
let dia = 500; // Diameter of interaction
let randomPos = false; // Starting points randomly positioned
let pointsDirection = "general"; // Direction for points
let interactionDirection = -1; // -1 or 1 for interaction direction
let textPoints = [];

// Sliders
let tSizeSlider, pointCountSlider, speedSlider, diaSlider;

// Define color for "BELLA"
let bellaColor;

function preload() {
  font = loadFont("AvenirNextLTPro-Demi.otf");
}

function setup() {
  createCanvas(1000, 1000);
  textFont(font);

  // Sliders to adjust parameters in real time
  tSizeSlider = createSlider(50, 200, tSize);
  tSizeSlider.position(20, height + 20);
  pointCountSlider = createSlider(0.1, 1, pointCount, 0.01);
  pointCountSlider.position(20, height + 50);
  speedSlider = createSlider(0.5, 5, speed, 0.1);
  speedSlider.position(20, height + 80);
  diaSlider = createSlider(100, 800, dia);
  diaSlider.position(20, height + 110);

  // Set the color for "BELLA"
  bellaColor = color(255, 0, 150); // A pink color as an example

  updateTextPoints();
}

function updateTextPoints() {
  textPoints = [];
  let points = font.textToPoints("BELLA", tposX, tposY, tSize, {
    sampleFactor: pointCount,
  });

  for (let i = 0; i < points.length; i++) {
    let pt = points[i];
    let textPoint = new Interact(
      pt.x,
      pt.y,
      speed,
      dia,
      randomPos,
      comebackSpeed,
      pointsDirection,
      interactionDirection,
      bellaColor // Pass the color here
    );
    textPoints.push(textPoint);
  }
}

function draw() {
  background(0);

  // Update slider values
  tSize = tSizeSlider.value();
  pointCount = pointCountSlider.value();
  speed = speedSlider.value();
  dia = diaSlider.value();

  // Redraw text points if values change
  if (tSize !== tSizeSlider.value() || pointCount !== pointCountSlider.value()) {
    updateTextPoints();
  }

  for (let i = 0; i < textPoints.length; i++) {
    let v = textPoints[i];
    v.update();
    v.show();
    v.behaviors();
  }
}

// Updated Interact class
class Interact {
  constructor(x, y, speed, dia, randomPos, comebackSpeed, pointsDirection, interactionDirection, color) {
    this.pos = createVector(x, y);
    this.origin = createVector(x, y);
    this.speed = speed;
    this.dia = dia;
    this.randomPos = randomPos;
    this.comebackSpeed = comebackSpeed;
    this.pointsDirection = pointsDirection;
    this.interactionDirection = interactionDirection;
    this.color = color; // Store color
  }

  // Show method now uses the stored color
  show() {
    fill(this.color); // Use the color for each point
    noStroke();
    ellipse(this.pos.x, this.pos.y, 5, 5);
  }

  update() {
    // Update logic for particle behavior
  }

  behaviors() {
    // Additional behaviors for interaction, if needed
  }
}
