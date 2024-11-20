let tSize = 150; // Tamaño del texto
let tposX = 150; // Posición X del texto
let tposY = 500; // Posición Y del texto
let pointCount = 0.9; // Cantidad de puntos

let speed = 10; // Velocidad de las partículas
let comebackSpeed = 100; // Velocidad de regreso
let dia = 50; // Diámetro de interacción
let randomPos = true; // Puntos iniciales aleatorios
let pointsDirection = "general"; // Dirección de puntos
let interactionDirection = -1; // Dirección de interacción

let textPoints = [];

function preload() {
  font = loadFont("AvenirNextLTPro-Demi.otf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  tpsoX= width/-tSize * 1.20
  tpso= height/2 +tSize/ 2.5
  textFont(font);

  let points = font.textToPoints("BELLA", tposX, tposY, tSize, {
    sampleFactor: pointCount,
  });

  for (let i = 0; i < points.length; i++) {
    let pt = points[i];
    let ptColor = color(random(200, 255), random(100, 150), random(150, 200)); // Cambia "color" a "ptColor"
    let textPoint = new Interact(
      pt.x,
      pt.y,
      speed,
      dia,
      randomPos,
      comebackSpeed,
      pointsDirection,
      interactionDirection,
      ptColor
    );
    textPoints.push(textPoint);
  }
}

function draw() {
  let r = map(mouseX, 0, width, 0, 255);
  let g = map(mouseY, 0, height, 0, 255);
  let b = map(mouseX + mouseY, 0, width + height, 50, 200);

  background(r, g, b); // El fondo cambia según el mouse

  for (let i = 0; i < textPoints.length; i++) {
    let v = textPoints[i];
    v.update();
    v.show();
    v.behaviors();
  }
}

  for (let i = 0; i < textPoints.length; i++) {
    let v = textPoints[i];
    v.update();
    v.show();
    v.behaviors();
  
}

// Nueva función para detectar clics
function mousePressed() {
  for (let i = 0; i < textPoints.length; i++) {
    let v = textPoints[i];
    // Verifica si el mouse está cerca de cada punto
    if (dist(mouseX, mouseY, v.pos.x, v.pos.y) < dia) {
      v.explode(); // Activa la explosión del punto
    }
  }
}

function Interact(x, y, m, d, t, s, di, p, ptColor) {
  if (t) {
    this.home = createVector(random(width), random(height));
  } else {
    this.home = createVector(x, y);
  }
  this.pos = this.home.copy();
  this.target = createVector(x, y);

  if (di == "general") {
    this.vel = createVector();
  } else if (di == "up") {
    this.vel = createVector(0, -y);
  } else if (di == "down") {
    this.vel = createVector(0, y);
  } else if (di == "left") {
    this.vel = createVector(-x, 0);
  } else if (di == "right") {
    this.vel = createVector(x, 0);
  }

  this.acc = createVector();
  this.r = 8;
  this.maxSpeed = m;
  this.maxforce = 1;
  this.dia = d;
  this.come = s;
  this.dir = p;
  this.ptColor = ptColor; // Asigna el color de cada punto a ptColor
  this.exploded = false; // Indica si el punto ha explotado
}

Interact.prototype.behaviors = function () {
  if (!this.exploded) {
    let arrive = this.arrive(this.target);
    let mouse = createVector(mouseX, mouseY);
    let flee = this.flee(mouse);

    this.applyForce(arrive);
    this.applyForce(flee);
  }
};

Interact.prototype.applyForce = function (f) {
  this.acc.add(f);
};

Interact.prototype.arrive = function (target) {
  let desired = p5.Vector.sub(target, this.pos);
  let d = desired.mag();
  let speed = this.maxSpeed;
  if (d < this.come) {
    speed = map(d, 0, this.come, 0, this.maxSpeed);
  }
  desired.setMag(speed);
  let steer = p5.Vector.sub(desired, this.vel);
  return steer;
};

Interact.prototype.flee = function (target) {
  let desired = p5.Vector.sub(target, this.pos);
  let d = desired.mag();

  if (d < this.dia) {
    desired.setMag(this.maxSpeed);
    desired.mult(this.dir);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
  } else {
    return createVector(0, 0);
  }
};

Interact.prototype.update = function () {
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);

  if (this.exploded) {
    // Si el punto ha explotado, sigue moviéndose en dirección aleatoria
    this.vel.add(p5.Vector.random2D().mult(0.5)); // Multiplica para ajustar la velocidad de dispersión
  }
};

Interact.prototype.show = function () {
  stroke(this.ptColor); // Aplica el color aleatorio
  strokeWeight(4);
  point(this.pos.x, this.pos.y);
};

// Nueva función para hacer que el punto explote
Interact.prototype.explode = function () {
  this.exploded = true;
  this.vel = p5.Vector.random2D().mult(random(3, 8)); // Da una velocidad y dirección aleatoria
};


function windowResized(){
 resizeCanvas(windoWidth, windowheight)
}
  //// Change the position of the particles relative to windowSize
