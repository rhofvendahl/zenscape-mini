function makeScape(xCells, yCells, cellPx) {
  $("#scape").css("margin-left", (cellPx/2-xCells*cellPx/2) + "px");
  $("#scape").css("margin-top", (cellPx/2-yCells*cellPx/2) + "px");
  console.log("makescape");
//  scapeMap = new Array(width);
  for (x=0; x<xCells; x++) {
  //  scapeMap[x] = new Array(height);
    for (y=0; y<yCells; y++) {
      makeBox(("x" + x + "y" + y), x*cellPx, y*cellPx, 0, cellPx, cellPx, cellPx);
      //$(".x" + x + "y" + y).css("transform", "+=translate3d(0px, 0px, " + -(x+y)*cellPx/2 + "px)");
    };
  };
};

function makeBox(className, xcenter, ycenter, zcenter, xdim, ydim, zdim) {
  console.log("makeBox");
    //INIT COLOR
  //$("#scape").append("<div class='object'></div>")

  //$("#scape").append("<div id='#" + cellId + "' class='object'></div>")
  //$("#" + cellId).css("transform", "translate3d(" + (x*cellPx) + "px, " + (y*cellPx) + "px, 0px)");

  //some sides commented to reduce latency
  //orthogonal to z axis
  makeFace(className, "light", xdim, ydim,  xcenter, ycenter, (zcenter+zdim/2), 0, 0);
  makeFace(className, "dark", xdim, ydim, xcenter, ycenter, (zcenter-zdim/2), 0, 0);

  //orthogonal to y axis
  makeFace(className, "dark", xdim, zdim, xcenter, (ycenter+ydim/2), zcenter, (-90), 0);
  makeFace(className, "medium", xdim, zdim, xcenter, (ycenter-ydim/2), zcenter, (-90), 0);

  //orthogonal to x axis
  makeFace(className, "medium", zdim, ydim, (xcenter + xdim/2), ycenter, zcenter, 0, (90));
  makeFace(className, "dark", zdim, ydim, (xcenter -xdim/2), ycenter, zcenter, 0, (90));
};

function makeFace(className, shade, width, height, tx, ty, tz, rx, ry) {
  console.log(className);
  //$("#" + parentId).append("<p>hey</p>");
//INIT COLOR
  $("#scape").append("<div class='" + className + " " + shade + " object'></div>");
  side = $("." + className).last();
  side.css("width", width);
  side.css("height", height);
  side.css("margin-left", -width/2);
  side.css("margin-top", -height/2);
  side.css("transform", "translate3d(" + tx + "px, " + ty + "px, " + tz + "px) rotateX(" + rx + "deg) rotateY(" + ry + "deg) rotateZ(0deg)");
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
  makeScape(20, 20, 20);
});
