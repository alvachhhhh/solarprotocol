let img1, img2;
let jsonURL;
let alpha;

function preload() {
  img1 = loadImage('dark.png');
  img2 = loadImage('light.png');

  
}

function setup() {
  createCanvas(1920, 1080); 

  jsonURL = 'https://server.solarpowerforartists.com/api/v2/opendata.php?value=battery-percentage';
  loadJSON(jsonURL, gotData);
  
  // create sliders
  //slider = createSlider(0, 100, 50); 
  //slider.position(10, height - 40); 
}

function draw() {
  background(0);

  // create transparency
  if (alpha !== undefined) {
    tint(255, alpha);
    image(img1, 0, 0, width, height);
    
    tint(255, 255 - alpha);
    image(img2, 0, 0, width, height);
  }
}

function gotData(data) {
  const batteryPercentage = parseFloat(data['battery-percentage']);
  alpha = map(batteryPercentage, 0, 1, 0, 255);
  
  //console.log(batteryPercentage);
}


