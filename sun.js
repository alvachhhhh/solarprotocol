let data;
//let dataTime;

let angle = 0;
let sunRadius = 120;
let sunTexture;
let rotationSpeed = 0.001;
let saturationValue;
let saturationSlider;


let batteryPercentage = 0;
let textContainer;
let font;

let newLocation;
let newCity;
let newCountry;
let newServer;
let data2;

let LoadData ='Loading data...';


let thirdLine;

let sliderPositionX;






function preload() {
  sunTexture = loadImage('assets/sun-2.jpeg');
  font = loadFont('assets/font.ttf');
  
}

function updateSaturationFromJSON() {
  let jsonURL = 'https://server.solarpowerforartists.com/api/v2/opendata.php?value=battery-percentage';
  //let jsonURL2 = 'http://solarprotocol.net/api/v2/opendata.php?systemInfo=dump';
  //let jsonURL3 = 'http://solarprotocol.net/api/v2/opendata.php?value=datetime';
  loadJSON(jsonURL, gotData);
  //loadJSON(jsonURL2, gotVData);
  //loadJSON(jsonURL3, gotCData);
}



function gotData(data) {
    //let saturationData = data.saturation;
    const newbatteryPercentage = parseFloat(data['battery-percentage']);
    //saturationValue = map(newbatteryPercentage, 0, 1, 0, 5);
    saturationValue = map(newbatteryPercentage, 0, 1, 0, 0.65);
    updateSaturation();
    batteryPercentage = newbatteryPercentage;


    print(batteryPercentage);

    //saturationSlider.value(saturationValue);
    //updateSaturation();
  }


/*
function gotVData(jsonData) {
  data = jsonData;
}



function gotCData(jsonData) {
  data2 = jsonData;
}

*/



function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  smooth();
  textContainer = document.getElementById('text-container');
  textContainer2 = document.getElementsByClassName('first-line');
  textContainer3 = document.getElementsByClassName('second-line');
  
  updateSaturationFromJSON();

  textFont(font);

  thirdLine = document.createElement('h3');
  document.body.appendChild(thirdLine);

  setTimeout(startAnimation, 1000);

  sliderPositionX = width / 2;
  

  
}

function draw() {
  background(0);

  textureMode(NORMAL);

  let cameraDistance = height / 3;


  camera(0, 0, cameraDistance);
  
  
  directionalLight(255, 255, 255, 1, 0, 0);
  
  rotateY(angle);


  let x = 200;
  let y = 0;
  let z = 0;

  
  drawSun(x, y, z, sunRadius);
  
  angle += rotationSpeed;

  textContainer.innerHTML = '';


   //project text
  let firstLine = document.createElement('h1');
  firstLine.innerText = 'Solar Protocol';
  textContainer.appendChild(firstLine);


   //Battery Percentage
  let secondLine = document.createElement('h2');
  secondLine.innerText = 'Battery Percentage:';
  textContainer.appendChild(secondLine);


  

  let thirdLine = document.createElement('h3');

    const percentage = Math.round(batteryPercentage * 100);  
    const formattedPercentage = `${percentage}%`;
    thirdLine.innerText = formattedPercentage;
    textContainer.appendChild(thirdLine);

/*
  //Service Information
  

  let fourthLine = document.createElement('h4');
  fourthLine.innerText = 'Service Information:';
  textContainer.appendChild(fourthLine);




  //console.log('Location:', data.dump.location);

  let fifthLine = document.createElement('h5');
  let sixthLine = document.createElement('h6');
  let sevenLine = document.createElement('h7');
  let eightLine = document.createElement('h8');
  let ninethLine = document.createElement('p');
  

  if (data) {

  let dump = data.dump;

  newLocation = 'Location: ' + data.dump.location;
  newCity = 'City: '+ data.dump.city;
  newCountry = 'Country: ' + data.dump.country;
  newServer = 'Server: ' + data.dump.name;
  //print(newLocation);
  //print(newCity);
  //print(newCountry);

  fifthLine.innerText = newLocation;
  sixthLine.innerText = newCity;
  sevenLine.innerText = newCountry;
  eightLine.innerText = newServer;
  } 
  else {
    fifthLine.innerText = LoadData;
    sixthLine.innerText = LoadData;
    sevenLine.innerText = LoadData;
    eightLine.innerText = LoadData;
    
  }
  textContainer.appendChild(fifthLine);
  textContainer.appendChild(sixthLine);
  textContainer.appendChild(sevenLine);
  textContainer.appendChild(eightLine);

  ////data time

  if(data2){
    const dateTimeArray = data2.datetime.split('.')
    dataTime =  dateTimeArray[0];
    ninethLine.innerText = 'Update:   '+ dataTime;
  }else{
    ninethLine.innerText = LoadData;
  }
  
  textContainer.appendChild(ninethLine);

*/


  
  //tenthLine.innerText = 'Latest datatime:';
  //textContainer.appendChild(tenthLine);

}

function drawSun(x, y, z, radius) {


    fill(255, 255, 0);
    noStroke();

    push();
    translate(x, y, z);
    rotateY(angle);

    let saturation = map(saturationValue, 0, 35, 0, 100);
    blendMode(BLEND);
    setSaturation(saturation);

    texture(sunTexture);
  
    
    
    sphere(radius);
    pop();
    

}

function updateSaturation() {

    let saturation = map(saturationValue, 0, 0.35, 0, 0.35);
    setSaturation(saturation);


  }

  function setSaturation(saturation) {
    //full canvas
    let canvas = document.getElementsByTagName('canvas')[0];
    canvas.style.filter = `saturate(${saturation * 100}%)`;
  }


  function startAnimation() {
    // 设置动画参数
    progress = 0;
    animationSpeed = 0.01;
    animationInProgress = true;
  }

  function toggleSlider(button) {
    button.classList.toggle("checked");
  
    if (button.classList.contains("checked")) {
      //window.open("index.html");
      location.href = "index.html";
    } else {
      location.href = "battery.html";
      //window.location.href = "battery.html";
    }
  }
  


