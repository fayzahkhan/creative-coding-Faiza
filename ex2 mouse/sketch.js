let mode = 1
let particles = []

function setup() {
  createCanvas(600, 400)
}

function draw() {
  background(20, 20, 30, 60)
  
// Naming the mode //
  if (mode === 1) explosionMode()
  if (mode === 2) rippleMode()
  if (mode === 3) swirlMode()

  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i]
    p.update()
    p.show()
    if (p.life < 0) particles.splice(i, 1)
  }
}

function mouseMoved() {
  if (mode === 1) {
    for (let i = 0; i < 5; i++) {
      particles.push(new Particle(mouseX, mouseY))
    }
  }
}

// to chang the mode //
function mousePressed() {
  mode++
  if (mode > 3) mode = 1
}

// Function rainbow explosion mode //
function explosionMode() {}

//  Function ripple mode //
function rippleMode() {
  particles.push(new Ripple(mouseX, mouseY))
}

// Function swirly mode //
function swirlMode() {
  particles.push(new Swirl(mouseX, mouseY))
}

class Particle {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.vx = random(-3, 3)
    this.vy = random(-3, 3)
    this.life = 100
    this.col = color(random(255), random(255), random(255))
  }
  update() {
    this.x += this.vx
    this.y += this.vy
    this.life -= 2
  }
  show() {
    noStroke()
    fill(this.col)
    circle(this.x, this.y, 6)
  }
}

// ripple  mode //
class Ripple {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.r = 0
    this.life = 100
  }
  update() {
    this.r += 2
    this.life -= 2
  }
  show() {
    noFill()
    stroke(100, 150, 255, this.life * 2)
    circle(this.x, this.y, this.r)
  }
}

// Swrily mode //
class Swirl {
  constructor(x, y) {
    this.angle = random(TWO_PI)
    this.radius = random(5, 20)
    this.centerX = x
    this.centerY = y
    this.life = 100
  }
  update() {
    this.angle += 0.1
    this.radius += 0.2
    this.life -= 2
  }
  show() {
    let x = this.centerX + cos(this.angle) * this.radius
    let y = this.centerY + sin(this.angle) * this.radius
    noStroke()
    fill(255, 100, 200, this.life * 2)
    circle(x, y, 5)
  }
}