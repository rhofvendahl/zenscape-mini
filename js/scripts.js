function makeMap(xDim, zDim) {
  highest = 0;
  map = new Array(xDim);
  peak = 0;
  for (var x=0; x<xDim; x++) {
    map[x] = new Array(zDim).fill(0);
  };
};

function makeScape() {
  $("#scape").css("margin-left", (-map.length*cellDim/2) + "px");
  $("#scape").css("margin-top", (-map[0].length*cellDim/2) + "px");
  for (x=0; x<map.length; x++) {
    for (z=0; z<map[0].length; z++) {
      makeBox((x + "-" + z), x*cellDim, map[x][z]*cellDim, z*cellDim, cellDim, cellDim, cellDim);
    };
  };
  makeBox("base", 0, (-cellDim*1.5), 0, (map.length*cellDim), cellDim, (map[0].length*cellDim));
};

function makeBox(className, xCoord, yCoord, zCoord, xDim, yDim, zDim) {
  //console.log("makeBox");
  $("#scape").append("<div class='" + className + " object'></div>");

  //comment sides to reduce latency
  //orthogonal to y axis (-y is up)
  makeFace(className, "light", xDim, zDim,  (xCoord+xDim/2), -(yCoord+yDim), (zCoord+zDim/2), 90, 0, 0);
  //makeFace(className, "dark", xDim, zDim, (xCoord+xDim/2), -(yCoord), (zCoord+zDim/2), 90, 0, 0);

  //orthogonal to z axis
  makeFace(className, "medium", xDim, yDim, (xCoord+xDim/2), -(yCoord+yDim/2), (zCoord+zDim), 0, 0, 0);
  //makeFace(className, "medium", xDim, yDim, (xCoord+xDim/2), -(yCoord+yDim/2), (zCoord), 0, 0, 0);

  //orthogonal to x axis
  //makeFace(className, "light", zDim, yDim, (xCoord + xDim), -(yCoord+yDim/2), (zCoord+zDim/2), 0, (90), 0);
  //makeFace(className, "dark", zDim, yDim, xCoord, -(yCoord+yDim/2), (zCoord+zDim/2), 0, (90), 0);
};

function makeFace(className, shade, width, height, tx, ty, tz, rx, ry, rz) {
  //console.log(className);
  $("." + className).append("<div class='" + shade + " object'></div>");
  var side = $("." + className).children().last();
  side.css("width", width);
  side.css("height", height);
  side.css("margin-left", -width/2);
  side.css("margin-top", -height/2);
  side.css("transform", "translate3d("+tx+"px, "+ty+"px,"+tz+"px) rotateX("+rx+"deg) rotateY("+ry+"deg) rotateZ("+rz+"deg)");
};

function updateScape() {
  snowLine = 2.5;
  for (var x=0; x<map.length; x++) {
    for (var z=0; z<map[0].length; z++) {
      var box = $("." + x + "-" + z);
    $("." + x + "-" + z).animate({top: -map[x][z]*cellDim + "px"}, 250);
      if (map[x][z] <= .2*snowLine) {
        //blue
        box.children(".light").css("background", "#4081f2");
        box.children(".medium").css("background", "#346dc7");
        box.children(".dark").css("background", "#275799");
      } else if (map[x][z] <= .3*snowLine) {
        //tan
        box.children(".light").css("background", "#FFF089");
        box.children(".medium").css("background", "#C1B367");
        box.children(".dark").css("background", "#817847");
      } else if (map[x][z] <= .6*snowLine) {
        //green
        box.children(".light").css("background", "#2aa330");
        box.children(".medium").css("background", "#1f8c28");
        box.children(".dark").css("background", "#106e1f");
      } else if (map[x][z] <= snowLine) {
        //grey
        box.children(".light").css("background", "#BEBEBE");
        box.children(".medium").css("background", "#8E8E8E");
        box.children(".dark").css("background", "#606060");
      } else {
        //white
        box.children(".light").css("background", "#FFFFFF");
        box.children(".medium").css("background", "#BEBEBE");
        box.children(".dark").css("background", "#7F7F7F");
      };
    };
  };
};

function updateMap() {
  var peak = 0;
  for (var x=0; x<map.length; x++) {
    for (var z=0; z<map[0].length; z++) {
      map[x][z] = 0;
      for (var i = 0; (i < 5) && (i < clickLog.length); i++) {
        var click = clickLog[clickLog.length-1-i];
        var seconds = (Date.now() - click[2])/1000;
        var distance = Math.pow((Math.pow(x-click[0], 2)+Math.pow(z-click[1], 2)), 1/2);
        if (Math.abs(distance - seconds) < Math.PI) map[x][z] += (Math.cos(distance - seconds) + 1)/2;
      };
    };
  };
};
//THREE SIDES
//1000x1000 at px2 is too much
//1000x1000 at 2px also too much
//10x10 at 2px is fine
//10x10 10px fine
//40x40 10px laggy
//**40x40 20px smooth (laggy when it passes camera)**
//40x40 20px no perspective quite smooth
//100x100 20px no perspective doesn't load
//100x100 2px no perspective doesn't load
//60x60 2px no perspective some latency
//60x60 8px no perspective significant latency
//*50x50 8px no perspective slight latency*
//40x40 16px no perspective smooth
//40x40 20px no perspective quite smooth
//**40x40 40px no perspective quite smooth**
//*50x50 8px no perspective smooth*
//ONE SIDES
//**100x100 4px no perspective loads slowly, but smooth**
//*100x100 10px no perspective 8s load, pretty smooth*

var map;
var clickLog = [];
var cellDim;

$(document).ready(function() {
  var xCells = 20;
  var zCells = 20;
  cellDim = 20;
  makeMap(xCells, zCells);
  makeScape();

  $("#scape").children().click(function() {
    var click = new Array(3);
    click[0] = parseInt($(this).attr("class").split(/[- ]/)[0]);
    click[1] = parseInt($(this).attr("class").split(/[- ]/)[1]);
    click[2] = Date.now();
    clickLog.push(click);
  });

  setInterval(function() {
    $("#scape").children().stop();
    updateScape();
    updateMap();
  }, 200);
});
