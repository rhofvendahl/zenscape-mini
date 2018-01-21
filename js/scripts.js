function makeMap(xDim, yDim) {
  var map = new Array(xDim);
  for (var x=0; x<xDim; x++) {
    map[x] = new Array(yDim);
    for (var y=0; y<yDim; y++) {
      map[x][y] = Math.random()*x/40;
    };
  };
  return map;
};

function makeScape(map, cellDim) {
  $("#scape").css("margin-left", (-map.length*cellDim/2) + "px");
  $("#scape").css("margin-top", (-map[0].length*cellDim/2) + "px");
  //console.log("makescape");
  for (x=0; x<map.length; x++) {
    for (y=0; y<map[0].length; y++) {
      makeBox(("x" + x + "y" + y), x*cellDim, y*cellDim, 0, cellDim, cellDim, cellDim);
    };
  };
  makeBox("base", 0, 0, -cellDim*1.5, (map.length*cellDim), (map[0].length*cellDim), cellDim);
};

function makeBox(className, xCoord, yCoord, zCoord, xDim, yDim, zDim) {
  //console.log("makeBox");
  $("#scape").append("<div class='" + className + " object'></div>");

  //comment sides to reduce latency
  //orthogonal to z axis
  makeFace(className, "light", xDim, yDim,  (xCoord+xDim/2), (yCoord+yDim/2), (zCoord+zDim), 0, 0);
  makeFace(className, "dark", xDim, yDim, (xCoord+xDim/2), (yCoord+yDim/2), zCoord, 0, 0);

  //orthogonal to y axis
  makeFace(className, "dark", xDim, zDim, (xCoord+xDim/2), (yCoord+yDim), (zCoord+zDim/2), (-90), 0);
  makeFace(className, "medium", xDim, zDim, (xCoord+xDim/2), yCoord, (zCoord+zDim/2), (-90), 0);

  //orthogonal to x axis
  makeFace(className, "medium", zDim, yDim, (xCoord + xDim), (yCoord+yDim/2), (zCoord+zDim/2), 0, (90));
  makeFace(className, "dark", zDim, yDim, xCoord, (yCoord+yDim/2), (zCoord+zDim/2), 0, (90));
};

function makeFace(className, shade, width, height, tx, ty, tz, rx, ry) {
  //console.log(className);
  $("." + className).append("<div class='" + shade + " object'></div>");
  var side = $("." + className).children().last();
  side.css("width", width);
  side.css("height", height);
  side.css("margin-left", -width/2);
  side.css("margin-top", -height/2);
  side.css("transform", "translate3d(" + tx + "px, " + ty + "px, " + tz + "px) rotateX(" + rx + "deg) rotateY(" + ry + "deg) rotateZ(0deg)");
};

function updateScape(map, cellDim) {
  for (var x=0; x<map.length; x++) {
    for (var y=0; y<map[0].length; y++) {
      var box = $(".x" + x + "y" + y)
      box.css("transform", "translateZ(" + map[x][y]*cellDim*x + "px)");
      if (map[x][y] < .3) {
        //blue
        box.children(".light").css("background", "#9CF1FD");
        box.children(".medium").css("background", "#75B4BC");
        box.children(".dark").css("background", "#50787E");
      } else if (map[x][y] < .4) {
        //tan
        box.children(".light").css("background", "#FFF089");
        box.children(".medium").css("background", "#C1B367");
        box.children(".dark").css("background", "#817847");
      } else if (map[x][y] < .6) {
        //green
        box.children(".light").css("background", "#CFFD78");
        box.children(".medium").css("background", "#9BBC5B");
        box.children(".dark").css("background", "#687E3E");
      } else if (map[x][y] < .8) {
        //grey
        box.children(".light").css("background", "#BEBEBE");
        box.children(".medium").css("background", "#8E8E8E");
        box.children(".dark").css("background", "#606060");
      } else if (map[x][y] < .9) {
        //white
        box.children(".light").css("background", "#FFFFFF");
        box.children(".medium").css("background", "#BEBEBE");
        box.children(".dark").css("background", "#7F7F7F");
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

//try changing render rate, or image quality
$(document).ready(function() {
  var xCells = 20;
  var yCells = 20;
  var cellDim = 20;
  var map = makeMap(xCells, yCells);
  makeScape(map, cellDim);
  updateScape(map, cellDim);
});
