// in the current list , a percentage of blanck holes. 0->none, 100-> all;
let percentageOfEmpty = 0;
// max visu : the number of lines on x and y with boxes, ie table of multiplication
let maxLinesWithBox = 10;
// maxLinesWithText : the number of lines on x and Y where text is drawn, otherwise empty.
// maxLinesWithText should be equal or less than maxLinesWithBox to leavec empty boxes
let maxLinesWithText = 10;
let nameOfFile;
//
let tailleBase = 50;
let increment = 11.11;
let tailleMax = 0;
let steps = [];

function okVisu(kx, ky) {
  return kx + 1 <= maxLinesWithBox || ky + 1 <= maxLinesWithBox;
}
function okText(kx, ky) {
  return kx + 1 <= maxLinesWithText || ky < maxLinesWithText;
}

let img;
let crinola = [
  
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
let crinola2 = [
  "#167288",
  "#8cdaec",
  "#fe2757",
  "#c730c4",
  "#8b8e0f",
  "#5a6a8e",
  "#1c7d49",
  "#3cb464",
  "#4b5697",
  "#112233",
];
// position for (0,0)
let zero_x, zero_y;

function preload() {
  // Charger l'image PNG
  imgSpider = loadImage("../../img/sympaSpider.png");
}
let maxX = 1400;
let maxY = 1400;

function setup() {
  createCanvas(maxX, maxY);
  zero_x = 100;
  zero_y = height - 400;

  for (i = 0; i < 10; i++) {
    let oneStep = tailleBase + i * increment;
    steps.push(oneStep);
    print(i, steps);
    tailleMax = tailleMax + oneStep;
  }
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
  let legend = ``;
  legend += `maxLinesWithBox=${maxLinesWithBox} , maxLinesWithText=${maxLinesWithText}\n`;
  legend += `randomEmpty=${percentageOfEmpty}%\n`;
  legend += `© pep-inno-2024`;
  // name of file derived from legend
  nameOfFile = `pepinno_Box${maxLinesWithBox}_Txt${maxLinesWithText}`;
  if (percentageOfEmpty > 0) {
    nameOfFile += `_random${percentageOfEmpty}`;
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
  stroke(crinola[ky + 1]);
  fill(crinola[kx]);
  text(kx + 1, middle_x, 50 - start_y);
  pop();
}

function draw_value(where_x, where_y, result) {
  push();
  scale(1, -1);
  let lastDigit = (result % 10) - 1; // 0 to 9
  if (lastDigit == -1) lastDigit = 9;
  let color = crinola[lastDigit];
  fill(color);
  stroke(0);
  strokeWeight(0);
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

  stroke(0);

  // create boxes -------------------------------
  //Y goes from 0 to 10 with extension at each step
  let start_y = 0;
  //let bout_x = tailleMax - steps[0] * 1.5;
  let bout_y = tailleMax - steps[0] * 1.5; // à cause du middle_y

  for (ky = 0; ky < 10; ky++) {
    let size_y = steps[ky];

    stroke(crinola[ky]);
    let start_x = 0;
    // repères horizontaux
    {
      let middle_y = start_y + size_y / 2;
      line(-25, middle_y, tailleMax, middle_y);
      circle(-50, middle_y, 30);
      // draw value
      drawRef_y(ky, middle_y);
    }

    //  gives the upper digit to use :all
    for (let kx = 0; kx < 10; kx++) {
      let size_x = steps[kx];
      // repères verticaux
      if (ky == 0) {
        let middle_x = start_x + size_x / 2;
        stroke(crinola[kx]);
        strokeWeight(2);
        // decale circle on its center
        line(middle_x, start_y - 30, middle_x, tailleMax);
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
        stroke(160)
        fill(240);
        if (okVisu(kx, ky)) {
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
      start_x += steps[kx];
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
