function makeScape(width, height, pix) {
  //$("scape").css("margin-left", (-width*pix/2 + "px"));
  //$("scape").css("margin-top", (-height*pix/2 + "px"));
  console.log("makescape");
//  scapeMap = new Array(width);
  for (x=0; x<width; x++) {
  //  scapeMap[x] = new Array(height);
    for (y=0; y<height; y++) {
      makeCell(x, y, pix);
      //$(".x" + x + "y" + y).css("transform", "+=translate3d(0px, 0px, " + -(x+y)*pix/2 + "px)");
    };
  };
};

function makeCell(x, y, pix) {
  console.log("makeCell");
  var cell = "x" + x + "y" + y;
  //INIT COLOR
  //$("#scape").append("<div class='object'></div>")

  //$("#scape").append("<div id='#" + cellId + "' class='object'></div>")
  //$("#" + cellId).css("transform", "translate3d(" + (x*pix) + "px, " + (y*pix) + "px, 0px)");

  //some sides commented to reduce latency
  //orthogonal to z axis
  makeSide(cell, "light", pix,  (x*pix), (y*pix), (pix/2)-(x+y)*pix/4, 0, 0);
  makeSide(cell, "dark", pix,  (x*pix), (y*pix), (-pix/2)-(x+y)*pix/4, 0, 0);

  //orthogonal to y axis
  makeSide(cell, "dark", pix,  (x*pix), (y*pix+pix/2), -(x+y)*pix/4, (-90), 0);
  makeSide(cell, "medium", pix,  (x*pix), (y*pix-pix/2), -(x+y)*pix/4, (-90), 0);

  //orthogonal to x axis
  makeSide(cell, "medium", pix,  (x*pix+pix/2), (y*pix), -(x+y)*pix/4, 0, (90));
  makeSide(cell, "dark", pix,  (x*pix-pix/2), (y*pix), -(x+y)*pix/4, 0, (90));
};

function makeSide(cell, shade, pix, tx, ty, tz, rx, ry) {
  console.log(cell);
  //$("#" + parentId).append("<p>hey</p>");
//INIT COLOR
  $("#scape").append("<div class='" + cell + " " + shade + " object'></div>");
  side = $("." + cell).last();
  side.css("width", pix);
  side.css("height", pix);
  side.css("margin-left", -pix/2);
  side.css("margin-top", -pix/2);
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
  makeScape(20, 20, 40);
});
