

let yMargin = 70;
let xMargin = 200;
let dataV = []; 
let x,y;
let dataPoints = [];
let datetime = "";
let yOffset;

let durationSlider;
let apiUrl = 'https://server.solarpowerforartists.com/api/v2/opendata.php?value=PV-current&duration=4';


function setup() {
  createCanvas(windowWidth, windowHeight);


  // create slider-1-duration
  durationSlider = createSlider(1, 7, 3);
  durationSlider.position(100, yMargin*1.5);
  durationSlider.input(updateUrl); 
  //durationSlider.style('background', 'red');
  durationSlider.addClass('custom-slider');
  //print(durationSlider.value);

  // create select
  valueSelect = createSelect();
  valueSelect.position(100, yMargin/2);
  valueSelect.option('PV-current');
  //valueSelect.option('PV-power-H');
  valueSelect.option('PV-power-L');
  valueSelect.option('PV-voltage');
  valueSelect.option('battery-percentage');
  //valueSelect.option('charge-current');
  //valueSelect.option('charge-power-H');
  //valueSelect.option('charge-power-L');
  valueSelect.option('load-current');
  valueSelect.option('load-power');
  valueSelect.option('load-voltage');

  valueSelect.addClass('custom-select');

  valueSelect.changed(updateUrl);
  

  loadJSON(apiUrl, gotVData); 
  
  background(240);
  strokeWeight(0.5);

  //noLoop()
  
}

function updateUrl() {
  // slider value
  let duration = durationSlider.value();
  let selectedValue = valueSelect.value();

  //print(duration);

  let url = new URL(apiUrl);
  let params = new URLSearchParams(url.search);

  params.set('value', selectedValue); 
  params.set('duration', duration+1);

  url.search = params.toString();

  let newUrl = url.toString();

  //print(newUrl);


  loadJSON(newUrl, gotVData);
}


function draw() {

  //print(mouseX, mouseY);
  let isHovered = false;


  //hover
  for(let i=0;i<dataPoints.length; i++){
  let distance = dist(mouseX, mouseY, dataPoints[i].x,dataPoints[i].y+yOffset);
  //print(dataPoints[i].x);

    if (distance < 5) {
      isHovered = true;

      fill(255);
      //stroke(0,0,0);

      rect(dataPoints[i].x, dataPoints[i].y+ yOffset, 200, 80);
      fill(0);

      textSize(12);
      textAlign(LEFT);
      textStyle(BOLD);

      text('Solar Protocol', dataPoints[i].x + 10, dataPoints[i].y +yOffset+ 20);
      textStyle(NORMAL);
      text(dataV[i].date, dataPoints[i].x + 10, dataPoints[i].y + yOffset + 40);
      
    let textContent = datetime + ':';
    let textWidthX = dataPoints[i].x + 10 + textWidth(textContent);

      text(textContent, dataPoints[i].x + 10, dataPoints[i].y+ yOffset + 60);
      text(dataV[i].val, textWidthX + 10 , dataPoints[i].y+ yOffset + 60)
      
    }else{

    }
  }
  if (!isHovered) {
    background(240);
    drawData(datetime, dataV);
  }
  
}




function gotVData(tempData){
    drawAxes();

  let dateStrings = Object.keys(tempData.data);
  let vals = Object.values(tempData.data);

  dataV = []
  for(let i=0;i<dateStrings.length; i++){
    dataV.push({date: dayjs(dateStrings[i]), val: Number(vals[i])})
    
  }

  dataV = dataV.sort((a, b) => (a.date.isAfter(b.date) ? 1 : -1))

  datetime = tempData.header.datetime;
  
  drawData(tempData.header.datetime, dataV); 
  //print(tempData.header.datetime);
}


function drawData(name, data){

  //print(data)
  let chartHeight = height - (2 * yMargin); 
  let verticalOffset = (height - chartHeight) / 2 - yMargin; 

  let maxVal = max(data.map(d => d.val));
  
  let minUnix = min(data.map(d => d.date.unix()));
  let maxUnix = max(data.map(d => d.date.unix()));


  let px = xMargin;
  let py = height-yMargin;

  for(let i=0;i<data.length; i++){
    
    y = map(data[i].val, 0, maxVal, yMargin + chartHeight, 0 + yMargin);
    x = map(data[i].date.unix(), minUnix, maxUnix, xMargin + 80, width - xMargin);

    //animation
    let t = map(frameCount, 0, 60, 0, 1);

    let colorFrom1 = color(240);
    let colorTo1 = color(255, 144, 0,140);
    let colorCurrent = lerpColor(colorFrom1, colorTo1, t);
    //color(202, 114, 0);
    let filltransparency = map(dataV[i].val, 0, maxVal, 20, 200);
    //
   
    
      fill(colorCurrent,filltransparency);
      //print(filltransparency);
      //fill(255,144,0,filltransparency); 
      //datasize = 3; 

      let selectedOption = valueSelect.value();
      let datasizeY;

      //yOffset = verticalOffset;
      

      if (selectedOption === "PV-voltage") {
        datasizeY = 3;
        yOffset = verticalOffset+200;
      }
      else if(selectedOption === "battery-percentage"){
        datasizeY = 6;
        yOffset = verticalOffset+200;
      } 
      else if(selectedOption === "load-voltage"){
        datasizeY = 3;
        yOffset = verticalOffset+300;
      }
      else if(selectedOption === "load-power" || selectedOption === "load-current"){
        datasizeY = 8;
        yOffset = verticalOffset+100;
      }
      else{
        datasizeY = 8;
        yOffset = verticalOffset;
      }


      datasize = map(dataV[i].val, 0, maxVal, 1, datasizeY);
      noStroke();


      


      circle(x,y+yOffset,datasize);

      //stroke(255,144,0);
      //line(px, py, x, y);

      /*if (i > 0) {
        curve(px, py, px, py, x, y, x, y); 
      }
*/

      dataPoints[i] = { x, y }; 

      px = x;
      py = y;
  }
  //create topic-2 rect
  let orangeRectWidth = 80;
  let orangeRectHeight = height;

  fill(255, 144, 0); 
  noStroke();
  rect(0, 0, orangeRectWidth, orangeRectHeight);


//topic-1 text
  textAlign(CENTER, CENTER);
  textFont('Times');
  let textContent1 = "SOLAR PROTOCOL";
  
  fill(42,14,0);
  textSize(30);
  textStyle(BOLD);
  //text('Solar Protocol', orangeRectWidth-20, orangeRectHeight-40);
  for (let i = 0; i < textContent1.length; i++) {
    let character1 = textContent1.charAt(i); 
    text(character1, orangeRectWidth-40, orangeRectHeight - height*1.05 + yMargin*2 + (i * 37)); 
  }


//topic-2 text
  let textContent2 = datetime.toUpperCase();
  textStyle(NORMAL);
  fill(42,14,0);
  textSize(12);
  textFont('Arial');
  for (let i = 0; i < textContent2.length; i++) {
    let character2 = textContent2.charAt(i); 
    text(character2, orangeRectWidth-42, orangeRectHeight - height*0.4 + yMargin*0.6 + (i * 15)); 
  }

  
  //slider text
  let sliderText = "Duration: " + durationSlider.value() +" days";
  textSize(12);
  textAlign(CENTER);
  textFont('Arial');
  text(sliderText, durationSlider.x + durationSlider.width / 2, durationSlider.y-15);

}

function drawAxes(){
    noStroke();
    line(0 + xMargin, height - yMargin, 0 + xMargin, 0 + yMargin); // y axis
    line(0 + xMargin, height - yMargin, width - xMargin, height - yMargin); //x axis
}
