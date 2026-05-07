let mic;
let fft;
let mode = 1;
let started = false;
let offset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  fft = new p5.FFT(0.8, 64);
}

function draw() {
  background(20, 20, 30);

  if (!started) {
    fill(255);
    textAlign(CENTER);
    textSize(24);
    text("Click anywhere to activate Microphone", width / 2, height / 2);
    return;
  }

  let spectrum = fft.analyze();
  let vol = mic.getLevel();
  let midEnd = fft.getEnergy("mid");
  let highEnd = fft.getEnergy("treble");

  if (mode === 1) {
    drawPixelBoxes(spectrum);
  } else if (mode === 2) {
    drawHeartRipple(midEnd);
  } else if (mode === 3) {
    drawFirework(highEnd);
  } else if (mode === 4) {
    drawWave(spectrum);
  }

  resetMatrix();
  fill(255, 150);
  noStroke();
  textAlign(LEFT);
  textSize(14);
  text("Mode: " + mode + " | Vol: " + floor(vol * 500), 30, 40);
}

function mousePressed() {
  if (!started) {
    userStartAudio();
    mic.start();
    fft.setInput(mic);
    started = true;
  }
}

// pixel boxes mode //
function drawPixelBoxes(spec) {
  let groups = 16;
  let w = width / groups;
  for (let i = 0; i < groups; i++) {
    let h = map(spec[i * 2], 0, 255, 0, height * 0.9);
    let segments = 15;
    let segHeight = (height * 0.8) / segments;
    let activeSegments = map(h, 0, height * 0.8, 0, segments);
    for (let j = 0; j < segments; j++) {
      if (j < activeSegments) {
        fill(map(i, 0, groups, 100, 255), 255, 200 - j * 10);
      } else {
        fill(40, 40, 60, 100);
      }
      rect(i * w + 5, height - j * segHeight - 40, w - 10, -segHeight + 5);
    }
  }
}

// Heart ripple mode //
function drawHeartRipple(energy) {
  push();
  translate(width / 2, height / 2);
  let speed = map(energy, 0, 255, 0.02, 0.15);
  offset += speed;

  for (let i = 0; i < 12; i++) {
    let size = ((i + offset) % 12) * 35;
    if (size > 0) {
      let alpha = map(size, 0, 420, 255, 0);
      noFill();
      strokeWeight(map(energy, 0, 255, 1, 6));
      stroke(255, 100, 150, alpha);

      beginShape();
      for (let a = 0; a < TWO_PI; a += 0.1) {
        let r = size / 16;
        let x = r * 16 * pow(sin(a), 3);
        let y =
          -r * (13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a));
        vertex(x, y);
      }
      endShape(CLOSE);
    }
  }
  pop();
}

// Firewrok mode //
function drawFirework(energy) {
  push();
  translate(width / 2, height / 2);
  let count = map(energy, 0, 255, 0, 150);
  for (let i = 0; i < count; i++) {
    let ang = random(TWO_PI);
    let d = random(energy * 3);
    stroke(random(255), 255, random(255, 255));
    strokeWeight(random(3, 6));
    point(cos(ang) * d, sin(ang) * d);
  }
  pop();
}

// Wave mode //
function drawWave(spec) {
  push();
  noFill();
  strokeWeight(5);
  beginShape();
  for (let i = 0; i < spec.length; i++) {
    stroke(spec[0], 0, 255 - spec[0]);
    let x = map(i, 0, spec.length, 0, width);
    let y = map(spec[i], 0, 255, height * 0.7, height * 0.3);
    vertex(x, y);
  }
  endShape();
  pop();
}

// function to change the mode // 
function keyPressed() {
  if (key === "1") mode = 1;
  if (key === "2") mode = 2;
  if (key === "3") mode = 3;
  if (key === "4") mode = 4;
  offset = 0;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
