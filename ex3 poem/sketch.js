// Poem //
let lines = [
  "I never saw a purple cow,",
  "I never hope to see one;",
  "But I can tell you, anyhow,",
  "I'd rather see than be one."
];

let lineIndex = 0;
let charIndex = 0;
let state = "typing";
let opacity = 255;
let yOffset = 0;

let font;

function preload() {
  font = loadFont("https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf");
}

function setup() {
  createCanvas(700, 300);
  textFont(font);
  textSize(28);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(15, 10, 25);

  // tiny float //
  yOffset = sin(frameCount * 0.03) * 10;

  fill(200, 180, 255, opacity);

  // current text being typed //
  let currentLine = lines[lineIndex].substring(0, charIndex);
  text(currentLine, width / 2, height / 2 + yOffset);

  // typing effect //
  if (state === "typing") {
    if (frameCount % 3 === 0 && charIndex < lines[lineIndex].length) {
      charIndex++;
    }

    if (charIndex === lines[lineIndex].length) {
      state = "done";
    }
  }

  // fade out before next line //
  else if (state === "fade") {
    opacity -= 8;

    if (opacity <= 0) {
      lineIndex++;

      if (lineIndex < lines.length) {
        charIndex = 0;
        opacity = 255;
        state = "typing";
      } else {
        noLoop(); // end of poem, emotional closure or whatever //
      }
    }
  }
}

// spacebar controls progression (It's a bit laggy cuz I'm still learning so you gotta click on the screen once to activate it lol) //
function keyPressed() {
  if (key === ' ' && state === "done") {
    state = "fade";
  }
}