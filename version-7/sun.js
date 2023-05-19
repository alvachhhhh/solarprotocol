
let angle = 0;
let sunRadius = 120;
let sunTexture;
let rotationSpeed = 0.001;
let saturationValue = 100;
let saturationSlider;
let x = 200;
  let y = 0;
  let z = 0;

function preload() {
  sunTexture = loadImage('sun-2.jpeg');
}
function gotData(data) {
    //let saturationData = data.saturation;
    const batteryPercentage = parseFloat(data['battery-percentage']);
    //saturationValue = map(batteryPercentage, 0, 1, 0, 5);
    saturationValue = map(batteryPercentage, 0, 1, 0, 0.65);
    updateSaturation();

    //saturationSlider.value(saturationValue);
    //updateSaturation();
  }


function updateSaturationFromJSON() {
    let jsonURL = 'https://server.solarpowerforartists.com/api/v2/opendata.php?value=battery-percentage';
    loadJSON(jsonURL, gotData);
  }



function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  //saturationSlider = createSlider(0, 100, saturationValue);
  //saturationSlider.position(10, height - 40);
  //saturationSlider.input(updateSaturation);
  
  updateSaturationFromJSON();
}

function draw() {
  background(0);

  //setGradient(width, 0, width, height, color(255, 144, 0), color(255, 255, 255, 0));


  textureMode(NORMAL);
  
  

  let cameraDistance = height / 3;
  camera(0, 0, cameraDistance);
  
  directionalLight(255, 255, 255, 1, 0, 0);
  
  rotateY(angle);

  //saturationValue = saturationSlider.value();
  
  
  drawSun(x, y, z, sunRadius);
  
  angle += rotationSpeed;
  

  
}

function drawSun(x, y, z, radius) {


    fill(255, 255, 0);
    noStroke();

    let saturation = map(saturationValue, 0, 35, 0, 100);
    blendMode(BLEND);
    setSaturation(saturation);



    texture(sunTexture);
  
    push();
    translate(x, y, z);
    rotateY(angle);
    

    sphere(radius);
    pop();
    

}

function updateSaturation() {
    //saturationValue = saturationSlider.value()

    let saturation = map(saturationValue, 0, 35, 0, 35);
    setSaturation(saturation);
    print(saturationValue);

    //setSaturation(saturationValue);

  }

  function setSaturation(saturation) {
    //full canvas
    let canvas = document.getElementsByTagName('canvas')[0];
    canvas.style.filter = `saturate(${saturation})`;
  }
  

