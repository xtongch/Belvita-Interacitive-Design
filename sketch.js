var inc = 0.01;
var scl = 20;
var cols, rows;
var zoff = 0;
var fr;
var angle;
var detectbox;

var patternCol = ['rgb(229,229,198)','rgb(236,211,151)','rgb(240,198,64)','rgb(185,111,74)','rgb(87,56,40)']

var Index = 0;
var Index2 = 0;


var biscuitx = 80;
var biscuity = 100;

var vid;
var vScale = 10;

function preload() {
  font = loadFont('JosefinSans-Light.ttf');
  biscuit = loadImage('biscuit.png');
}

function setup() {
  img = createCanvas(600,400);
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');

  var url = 'http://api.apixu.com/v1/current.json?key=c2c48dffd501452abea125559182804&q=london';
  loadJSON(url, gotWeather);

  colorMode(RGB);
  noCursor();

  vid = createCapture(VIDEO);
  vid.size(width/vScale,height/vScale);
  vid.position(110,405);
  // vid.hide();
  noStroke();
}

function gotWeather(weather) {
  angle = radians(Number(weather.current.wind_degree));
  var windmag = Number(weather.current.wind_mph);
  var temperatureDiv = createDiv(floor(weather.current.temp_f) + '&deg;');
  var windDiv = createDiv("WIND " + windmag + " <small>MPH</small>");
  windDiv.position(5,420);
  temperatureDiv.position(5,403);
  frameRate(windmag);

}

function draw() {
  background(255,251,239);
  vid.loadPixels();
  // var col1 = vid.get(120,200);
  // var col2 = vid.get(240,200);
  // var col3 = vid.get(360,200);
  // var col4 = vid.get(480,200);

    if (dist(mouseX,mouseY,550,200) > 80) {
      showPattern();
      image(biscuit,mouseX-28+random(-10,10),mouseY-28+random(-10,10),biscuitx,biscuity);
      // image(man,mouseX-8,mouseY+10,40,50);
      rotate(0.8+random(-0.02,0.02));
      translate(130,50);
      // image(biscuit,0,0,80,100);
      // image(biscuit,mouseX-28+random(-3,3),mouseY-28+random(-3,3),80,100);

    }
      else {
      background(255,251,239);
      noStroke();
      var se = second();

        if(se > 10){
          Index = Index + 1;
        }
        if(se > 20){
          Index = Index + 1;
        }
        if(Index>4){
          Index = 0;
        }  

      fill(patternCol[Index]);
      textFont(font);
      textSize(200);
      text('belVita',35,250);
      textSize(50);
      text('breakfast',220,310);
    }
  }

  function showPattern(){
    var yoff = 0;
    for (var y = 0; y < rows; y++) {
      var xoff = 0;
      for (var x = 0; x < cols; x++) {
        var index =( x + y * width) * 4
        var v = p5.Vector.fromAngle(angle+random(-0.1,0.1));
        xoff +=inc;

        var col1 = vid.get(120,200);
        var col2 = vid.get(240,200);
        var col3 = vid.get(360,200);
        var col4 = vid.get(480,200);
        // var col5 = (231,198,2);
        // var col7 = (231,198,2);
        // var col6 = (70,118,156);
        // var col8 = (70,118,156);

        var patternCol2 = [(col1),(col2),(col3),(col4)]
        stroke(patternCol2[Index2]);

        var se = second();

        if(se > 10){
          Index2 = Index2 + 1;
        }
        if(se > 15){
          Index2 = Index2 + 1;
        }
        if(se > 20){
          Index2 = Index2 + 1;
        }
        if(Index2>3){
          Index2 = 0;
        }  

        strokeWeight(6);

        push();
        translate(x * scl, y * scl);
        rotate(v.heading())
        line(0,0,scl,0);
        
        pop();
      }
        yoff += inc;
        zoff += 0.001;
  }
}

function mouseDragged(){
  biscuitx = biscuitx + random(2,80);
  biscuity = biscuity + random(2,20);
  if(biscuitx > 180){
    biscuitx = 80;
  }
  if(biscuity > 140){
    biscuity = 100;
  }
}
