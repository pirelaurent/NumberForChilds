let img;
let crinola = [
  "#e6194B",
  "#c70039",
  "#ff5733",
  "#3cb44b",
  "#42d4f4",
  "#4363d8",
  "#911eb4",
  "#f032e6",
  "#469990",
  "#800000",
];

function preload() {
  // Charger l'image PNG
  imgPlus = loadImage("../../img/sympaSimple.png");
  imgMargo = loadImage("../../img/margo0.png"); 
}

function setup() {
  createCanvas(1250, 1400);
  background(255);
  textSize(16); // Larger text size for readability
  textAlign(CENTER, CENTER);
  noFill();
  strokeWeight(2);
  stroke(0);

  let angle = 0; // Initial angle
  let startRadius = 80; // Initial radius
  let angleInc = TWO_PI / 10; // Angle increment for each segment
  let radiusInc = 2; // Radius increment after each full circle
  let rainbowColors = [
    color(255, 0, 0),
    color(255, 127, 0),
    color(255, 255, 0),
    color(0, 255, 0),
    color(0, 0, 255),
    color(75, 0, 130),
    color(148, 0, 211),
  ];
  listOfPrimes = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
    73, 79, 83, 89, 97,
  ];
  let lastx2;
  let lasty2;

  translate(width / 2, height / 2); // Center the drawing

  rotate(4.4); // adjust to have 100 on top

  // --- loop on numbers
  for (let i = 0; i <= 100; i++) {
    // Draw 100 segments
    // Calculate the starting point of the segment
    let x1 = cos(angle) * startRadius;
    let y1 = sin(angle) * startRadius;
    //color on rainbow
    let digit = i % 10; // Get the last digit to determine the color
    let col = crinola[digit];
    if (i==0) col = 0;

    // Increment angle and radius for the end point of the segment
    angle += angleInc;
    let incradius;
    // incradius = radiusInc * (i / 20);
    // if (i < 30) incradius = radiusInc * (i / 15);
    // if (i < 20) incradius = radiusInc * (i / 10);
    incradius = 5;
    let endRadius = startRadius + incradius;

    // Calculate the ending point of the segment
    let x2 = cos(angle) * endRadius;
    let y2 = sin(angle) * endRadius;

    // Draw a line from the center through each point
    let infiniteX = cos(angle) * 600; // Use the canvas width to simulate "infinity"
    let infiniteY = sin(angle) * 600; // Use the canvas height to simulate "infinity"

    stroke(180); // Use a lighter stroke for the infinite lines for distinction
    strokeWeight(1);
    line(0, 0, infiniteX, infiniteY);

    stroke(150);
    strokeWeight(4);
    // Draw the segment
    if (i >= 0) line(x1, y1, x2, y2);
    if (i == 0) ellipse(x1, y1, 5, 5);
    ellipse(x2, y2, 5, 5);

    // Midpoint of the line
    let midX = (x1 + x2) / 2;
    let midY = (y1 + y2) / 2;

    // Direction from midpoint towards the center
    let dirX = -midX;
    let dirY = -midY;

    // Normalize the direction
    let len = sqrt(dirX * dirX + dirY * dirY);
    dirX /= len;
    dirY /= len;
    // adjust by hand
    let multiplicateur = 6;
    if (i > 4) multiplicateur = 8;
    if (i > 10) multiplicateur = 11;
    if (i > 20) multiplicateur = 12;
    if (i > 30) multiplicateur = 12.5;
    if (i > 40) multiplicateur = 13;
    if (i > 60) multiplicateur = 13.5;
    if (i > 80) multiplicateur = 14;
    if (i > 90) multiplicateur = 14.5;
    // New text position
    let textX = midX + dirX * multiplicateur * (radiusInc - 1.8);
    let textY = midY + dirY * multiplicateur * (radiusInc - 1.8);

    // Label the segment
    push();
    translate(textX, textY);
    rotate(atan2(y2 - y1, x2 - x1));
    textSize(max(20, (3 * i) / 6));
    if (i >= 0) {
      // encadrer
      fill(245);
      if (i==0) fill(210)
      stroke(col);
      let facteur = 7;
      if (i > 20) facteur = 9;
      if (i > 30) facteur = 10;
      if (i > 40) facteur = 11;
      if (i > 50) facteur = 12;
      if (i > 60) facteur = 13;
      if (i > 70) facteur = 14;
      if (i > 80) facteur = 15.5;
      if (i > 90) facteur = 17;

      let ratio = 3.8;
      if (i <= 12) ratio = 8 - (i * 4.2) / 12;
  
      ellipse(0, 0, multiplicateur * facteur, multiplicateur * ratio);
      //
      fill(col);
      stroke(50);
      strokeWeight(1);
      // texte du nombre
      text(i, 0, 0);
      if (listOfPrimes.includes(i)) {
        fill(255, 0, 0);
        stroke(180, 0, 0);
        ellipse((multiplicateur * facteur) / 3.5, 0, 10, 10);
      }
    }
    pop();

    // Prepare for the next segment
    startRadius = endRadius;
    lastx2 = x2;
    lasty2 = y2;
  }

  //-------------- draw araignée
  stroke(0);
  let imgWidth = imgPlus.width;
  let imgHeight = imgPlus.height;
  let ratio = imgWidth / imgHeight;
  
  // araignée au centre
  rotate(1.9);
  image(imgPlus, -60, -53, 120, 120 / ratio);

// marguerite sur le coté 
 ouX=350;
 ouY=-630;
 image(imgMargo,ouX,ouY+19,140,140);
 stroke(180);
 strokeWeight(1.5)
 line(ouX-207,ouY+70,ouX+20,ouY+70)
 

}
