let percentageOfEmpty = 0;

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

function preload() {
  // Charger l'image PNG
  // imgPlus = loadImage("../../img/sympaSimple.png");
  // imgMargo = loadImage("../../img/margo0.png");
}
let maxX = 1200;
let maxY = 1200;

function setup() {
  createCanvas(maxX, maxY);
}

function draw() {
  translate(100, height - 100); // Déplace l'origine en bas à gauche
  scale(1, -1); // Inverse l'axe Y
  background(222);
  textSize(16); // Larger text size for readability
  textAlign(CENTER, CENTER);
  noFill();
  strokeWeight(2);
  stroke(255, 0, 0);
  let tailleBase = 50;
  let increment = 11.11;
  stroke(0);

  // create boxes
  //Y goes from 0 to 10 with extension at each step
  let start_y = 0;

  for (ky = 0; ky < 10; ky++) {
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
      push();
      scale(1, -1);
      textSize(20);
      strokeWeight(1);
      stroke(crinola[ky]);
      fill(crinola[ky]);
      text(ky + 1, -50, -middle_y);
      pop();
    }

    for (let kx = 0; kx < 10; kx++) {
      let size_x = tailleBase + kx * increment;
      // repères verticaux
      if (ky == 0) {
        let middle_x = start_x + size_x / 2;
        stroke(crinola[kx]);
        let upY = start_y + kx * increment;
        line(middle_x, start_y - 30, middle_x, 980);
        circle(middle_x, -50, 30);
        // draw value ----------
        push();
        scale(1, -1);
        textSize(20);
        strokeWeight(1);
        stroke(crinola[ky]);
        fill(crinola[kx]);
        text(kx + 1, middle_x, 50 - start_y);
        pop();
      }

      //rect (x,y, largeur, hauteur)
      //rect(start_x + start_y, start_y, size_x, size_y);
      // Relative to a box , a circle center is at the middle of the box
      let middle_x = start_x + start_y + size_x / 2;

      let result = (kx + 1) * (ky + 1);

      if (kx == ky) {
        strokeWeight(4);
        fill(210);
        rect(start_x, start_y, size_x - 8, size_y - 8);
      } else {
        strokeWeight(2);
        fill(240);
        ellipse(
          start_x + size_x / 2,
          start_y + size_y / 2,
          size_x - 8,
          size_y - 8
        );
      }
      // draw value
      push();
      scale(1, -1);

      fill(220);
      strokeWeight(4);
      textSize(20 + result / 2);
      // option random 
  print(int(random(100)),(int(random(100))>percentageOfEmpty))
      if (int(random(100))>percentageOfEmpty){
      text(result, start_x + size_x / 2, -start_y - size_y / 2);
      }
      pop();
      start_x += size_x;
    }
    start_y = start_y + size_y;
  }
  noLoop();
}
