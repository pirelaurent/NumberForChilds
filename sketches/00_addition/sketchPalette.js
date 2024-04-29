let colors = [];

function setup() {
  createCanvas(400, 200);
  generatePalette();
  drawPalette();
}

function generatePalette() {
  colorMode(HSB, 360, 100, 100); // Set color mode to HSB
  for (let i = 0; i < 10; i++) {
    let hue = (i * 36) % 360; // Generate hues every 36 degrees
    let saturation = 80 + random(20); // Random saturation between 80 and 100
    let brightness = 50 + random(50); // Random brightness between 50 and 100
    colors.push(color(hue, saturation, brightness)); // Create color object
  }
}

function drawPalette() {
  let rectWidth = width / 10;
  for (let i = 0; i < 10; i++) {
    fill(colors[i]);
    rect(i * rectWidth, 0, rectWidth, height);
  }
}
