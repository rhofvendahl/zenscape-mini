//sorry bout dimsssssss
function makeMap(xDim, zDim) {
  highest = 0;
  var map = new Array(xDim);
  peak = 0;
  for (var x=0; x<xDim; x++) {
    map[x] = new Array(zDim).fill(0);
  };
  return map;
};

function makeScape(map, cellDim) {
  $("#scape").css("margin-left", (-map.length*cellDim/2) + "px");
  $("#scape").css("margin-top", (-map[0].length*cellDim/2) + "px");
  //console.log("makescape");
  for (x=0; x<map.length; x++) {
    for (z=0; z<map[0].length; z++) {
      //should incl map
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
  //makeFace(className, "medium", zDim, yDim, (xCoord + xDim), -(yCoord+yDim/2), (zCoord+zDim/2), 0, (90), 0);
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

function updateScape(map, cellDim, peak) {
  for (var x=0; x<map.length; x++) {
    for (var z=0; z<map[0].length; z++) {
      var box = $("." + x + "-" + z);
    $("." + x + "-" + z).animate({"top": -map[x][z]*cellDim + "px"}, 5000);

      //box.css("transform", "translateZ(" + map[x][y]*cellDim + "px)");
      //console.log("updateScape x" + x + "z" + z + " " + map[x][z]);

      if (map[x][z] <= .2*peak) {
        //blue
        box.children(".light").css("background", "#9CF1FD");
        box.children(".medium").css("background", "#75B4BC");
        box.children(".dark").css("background", "#50787E");
      } else if (map[x][z] <= .25*peak) {
        //tan
        box.children(".light").css("background", "#FFF089");
        box.children(".medium").css("background", "#C1B367");
        box.children(".dark").css("background", "#817847");
      } else if (map[x][z] <= .5*peak) {
        //green
        box.children(".light").css("background", "#CFFD78");
        box.children(".medium").css("background", "#9BBC5B");
        box.children(".dark").css("background", "#687E3E");
      } else { //if (map[x][z] <= .7*peak) {
        //grey
        box.children(".light").css("background", "#BEBEBE");
        box.children(".medium").css("background", "#8E8E8E");
        box.children(".dark").css("background", "#606060");
      }; /*else {
        //white
        box.children(".light").css("background", "#FFFFFF");
        box.children(".medium").css("background", "#BEBEBE");
        box.children(".dark").css("background", "#7F7F7F");
      };*/
    };
  };
};

function updateMap(map, cellDim, click) {
  var peak = 0;
  for (var x=0; x<map.length; x++) {
    for (var z=0; z<map[0].length; z++) {
      var distance1 = Math.pow((Math.pow(x-10, 2)+Math.pow(z-10, 2)), 1/2);
      var distance2 = Math.pow((Math.pow(x-15, 2)+Math.pow(z-15, 2)), 1/2);

      map[x][z] = Math.random()/8
      map[x][z] += 1/(1+distance1);///42.5 - Math.pow(Math.pow(x-click[0])+Math.pow(z-click[1], 2), 1/);
      map[x][z] += 1/(1+distance2);
      if (map[x][z] > peak) peak = map[x][z];
    };
  };
  console.log(peak);

  return peak;
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
function render(map, cellDim, clickEvents) {
  console.log("render");
  count+=5;
  //css("transform", "translateZ(" + count + "px)");
};

$(document).ready(function() {
  var xCells = 20;
  var zCells = 20;
  var cellDim = 20;
  var map = makeMap(xCells, zCells);
  makeScape(map, cellDim);
  //peak global for now

  $("#scape").children().click(function() {
    var click = new Array(4);
    click[0] = parseInt($(this).attr("class").split(/[- ]/)[0]);
    click[1] = parseInt($(this).attr("class").split(/[- ]/)[1]);
    click[2] = Number.parseFloat(Math.random().toFixed(3));
    click[3] = Date.now();
    console.log(click);
    var peak = updateMap(map, cellDim, click);
    updateScape(map, cellDim, peak);

  });
});
