let r;
let k;
let m;

let rSlider;
let kSlider;
let mSlider;

let minX = -10;
let maxX = 10;

let minY = -10;
let maxY = 10;

const dt = 0.01;
const len = 20;

const every = 1;
const offset=5;

function setup() {
  createCanvas(640, 360).parent("canv");
  
  rSlider = createSlider(0, 50, 10);
  rSlider.parent("rSlider");
  kSlider = createSlider(0, 50, 10);
  kSlider.parent("kSlider");
  mSlider = createSlider(0.01, 10, 1, 0.01);
  mSlider.parent("mSlider");
}

function draw() {
  background(0);
  colorMode(HSB, 100);
  
  r = rSlider.value();
  k = kSlider.value();
  m = mSlider.value();
  
  document.getElementById("r").innerText = r;
  document.getElementById("k").innerText = k;
  document.getElementById("m").innerText = m;
  
  let xAxis = map(0, minY, maxY, 0, height);
  let yAxis = map(0, minX, maxX, 0, width);
  
  stroke(255);
  strokeWeight(2);
  line(0, xAxis, width, xAxis);
  line(yAxis, 0, yAxis, height);
  
  
  strokeWeight(1);
  
  for (let y=minY; y<=maxY; y+=every) {
    for (let x=minX; x<=maxX; x+=every) {
      
      let u = map(x, minX, maxX, 0, width);
      let v = map(y, minY, maxY, 0, height);
      
      let a = (-r*y - k*x)/m;
      
      let newY = y + a * dt;
      let newX = x + newY * dt;
      
      let newU = map(newX, minX, maxX, 0, width);
      let newV = map(newY, minY, maxY, 0, height);
      
      let vec = createVector(newU-u, newV-v);
            
      let hue = min(50, max(0, vec.mag()));
      stroke(hue, 100, 100);
      fill(hue, 100, 100);
      vec.setMag(len);
      
      push()
      translate(u, v);
            
      line(0, 0, vec.x, vec.y);

      var angle = atan2(vec.y, vec.x);
      translate(vec.x, vec.y);
      rotate(angle+HALF_PI);
      triangle(-offset*0.5, offset, offset*0.5, offset, 0, -offset/2);

      pop();
    }
  }
  
  textSize(32)
  textAlign(RIGHT, TOP);
  fill(255);
  noStroke();
  text("x", width, xAxis);
  text("v", yAxis, 0);
  
  textSize(15);
  textAlign(CENTER, BOTTOM);
  for (let x=minX; x<=maxX; x+= 2) {
    let u = map(x, minX, maxX, 0, width);
    text(x, u, xAxis);
  }
  
  textAlign(LEFT, CENTER);
  for (let y=minY; y<=maxY; y+= 2) {
    let v = map(y, minY, maxY, 0, height);
    text(y, yAxis, v);
  }
  
  
}
