// in the current list , a percentage of blanck holes. 0->none, 100-> all;
let percentageOfEmpty = 0;
// the maximum of the multiplication tables : the upper on each axes
let biggerDigit = 10;
// max visu : the number of lines on x and y with boxes
let maxLinesWithBox = 10;
let maxTable = 5;
// maxLinesWithText : the number of lines on x and Y where text is drawn.
// maxLinesWithText should be equal or less than maxLinesWithBox to leavec empty boxes
let maxLinesWithText = 2;
let nameOfFile;

function okVisu(kx, ky) {
  return kx + 1 <= maxLinesWithBox || ky + 1 <= maxLinesWithBox;
}
function okText(kx, ky) {
  return kx + 1 <= maxLinesWithText || ky < maxLinesWithText;
}

let img;
let crinola = [
  //"#e6194B",
  "#c70039",
  "#ff5733",
  "#3cb44b",
  "#42d4f4",
  "#4363d8",
  "#911eb4",
  "#f032e6",
  "#469990",
  "#800000",
  "#e6194B",
];
// position for (0,0)
let zero_x, zero_y;

function preload() {
  // Charger l'image PNG
  imgSpider = loadImage("../../img/sympaSpider.png");
}
let maxX = 1200;
let maxY = 1400;

function setup() {
  createCanvas(maxX, maxY);
  zero_x = 100;
  zero_y = height - 400;
}

function drawLegend() {
  // draw multiply symbol
  push();
  translate(-40, 40);
  textSize(70);
  fill(200, 70, 50);
  text("x", 0, 0);
  translate(0, 0);
  image(imgSpider, -20, 30, 120, 80);
  pop();
  push();
  translate(0, 250);
  stroke(0);
  strokeWeight(0);
  fill(0);
  let legend = `BiggerDigit=${biggerDigit}\n`;
  legend += `maxLinesWithBox=${maxLinesWithBox} , maxLinesWithText=${maxLinesWithText}\n`;
  legend += `randomEmpty=${percentageOfEmpty}%\n`;
  legend += `© pep-inno-2024`;
  // name of file derived from
  nameOfFile = `pepinno_UpTo${biggerDigit}_Box${maxLinesWithBox}_Txt${maxLinesWithText}`;
  if (percentageOfEmpty > 0){
  nameOfFile+=`_random${percentageOfEmpty}`;
  let multipleRun = int(random(1000));
   nameOfFile += `_${multipleRun}`;
  }
  print(nameOfFile);
  textSize(16);
  text(legend, 0, 0);
  pop();
}

// due to reverse scale, text are in mirror, must be rectified before print
function drawRef_y(ky, middle_y) {
  push();
  scale(1, -1);
  textSize(25);
  strokeWeight(1);
  stroke(crinola[ky]);
  fill(crinola[ky]);
  text(ky + 1, -50, -middle_y);
  pop();
}

function draw_ref_x(kx, ky, middle_x, start_y) {
  push();
  scale(1, -1);
  textSize(25);
  strokeWeight(1);
  stroke(crinola[ky]);
  fill(crinola[kx]);
  text(kx + 1, middle_x, 50 - start_y);
  pop();
}

function draw_value(where_x, where_y, result) {
  push();
  scale(1, -1);
  fill(0);
  stroke(0);
  strokeWeight(1);
  textSize(25 + result / 2.5);
  // option random . In any case draw 1 box
  text(result, where_x, where_y);
  pop();
}

function draw() {
  background(222);
  translate(zero_x, zero_y); // Déplace l'origine en bas à gauche
  drawLegend();
  scale(1, -1); // Inverse l'axe Y

  textSize(16); // Larger text size for readability
  textAlign(CENTER, CENTER);
  noFill();
  stroke(255, 0, 0);
  let tailleBase = 50;
  let increment = 11.11;
  stroke(0);

  // create boxes
  //Y goes from 0 to 10 with extension at each step
  let start_y = 0;

  for (ky = 0; ky < biggerDigit; ky++) {
    let size_y = tailleBase + ky * increment;
    stroke(crinola[ky]);
    let start_x = 0;
    // repères horizontaux
    {
      let debut = start_y; // si on veut s'arrêter au début
      let middle_y = start_y + size_y / 2;
      line(-25, middle_y, 980, middle_y);
      circle(-50, middle_y, 30);
      // draw value
      drawRef_y(ky, middle_y);
    }
    // biggerDigit gives the upper digit to use
    for (let kx = 0; kx < biggerDigit; kx++) {
      let size_x = tailleBase + kx * increment;
      // repères verticaux
      if (ky == 0) {
        let middle_x = start_x + size_x / 2;
        stroke(crinola[kx]);
        let upY = start_y + kx * increment;
        strokeWeight(2);
        line(middle_x, start_y - 30, middle_x, 980);
        circle(middle_x, -50, 30);
        draw_ref_x(kx, ky, middle_x, start_y);
      }

      // a box only for squares
      if (kx == ky) {
        strokeWeight(4);
        fill(210);
        if (okVisu(kx, ky))
          rect(start_x + 4, start_y + 4, size_x - 8, size_y - 8);
      } else {
        // an ellipse proportional in x and y
        strokeWeight(2);
        fill(240);
        if (okVisu(kx, ky) {
          ellipse(
            start_x + size_x / 2,
            start_y + size_y / 2,
            size_x - 8,
            size_y - 8
          );
        }
      }

      // draw value if params allow to
      if (okText(kx, ky)) {
        let result = (kx + 1) * (ky + 1);
        if (int(random(100)) >= percentageOfEmpty || (kx == 0 && ky == 0)) {
          let where_x = start_x + size_x / 2;
          let where_y = -start_y - size_y / 2;
          draw_value(where_x, where_y, result);
        }
      }
      // next step in x
      start_x += size_x;
    }
    // next step in y
    start_y = start_y + size_y;
  }
  noLoop();
}

function keyPressed() {
  // Check if the 's' key is pressed
  if (key === "s" || key === "S") {
    // Save the canvas to disk as a PNG file
    saveCanvas(nameOfFile, "png");
  }
}
