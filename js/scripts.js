function makeScape(width, height, cellPx) {
  console.log("makescape");
  for (y=0; y<height; y++) {
    for (x=0; x<width; x++) {
      makeCell(x, y, cellPx);
    };
  };
};

function makeCell(x, y, cellPx) {
  console.log("makeCell");
  var cellId = "c" + x + "-" + y;
  //INIT COLOR
  //$("#scape").append("<div class='object'></div>")

  $("#scape").append("<div id='#" + cellId + "' class='object'></div>")
  $("#" + cellId).css("transform", "translate3d(" + (x*cellPx) + "px, " + (y*cellPx) + "px, 0px)");

  //orthogonal to z axis
  makeSide(cellId, "light", cellPx,  0, 0, (cellPx/2), 0, 0);
  makeSide(cellId, "dark", cellPx,  0, 0, 0, (-cellPx/2), 0);
  //orthogonal to y axis
  makeSide(cellId, "dark", cellPx,  0, (cellPx/2), 0, (-90), 0);
  makeSide(cellId, "medium", cellPx,  0, (-cellPx/2), 0, (-90), 0);
  //orthogonal to x axis
  makeSide(cellId, "medium", cellPx,  (cellPx/2), 0, 0, 0, (90));
  makeSide(cellId, "dark", cellPx,  (-cellPx/2), 0, 0, 0, (90));
};

function makeSide(parentId, shadeClass, cellPx, tx, ty, tz, rx, ry) {
  console.log(parentId);
  $("#" + parentId).append("<p>hey</p>");

  //$("#" + parentId).append("div class='." + shadeClass + " object'></div>");
  var side = $("#" + parentId).children().last();
  side.css("width", cellPx);
  side.css("height", cellPx);
  side.css("margin-left", -cellPx/2);
  side.css("margin-top", -cellPx/2);
  side.css("transform", "translate3d(" + tx + "px, " + ty + "px, " + tz + "px) rotateX(" + rx + "deg) + rotateY(" + ry + "deg) rotateZ(0deg)");


};
$(document).ready(function() {
  makeScape(10, 10, 10, 10, 30);
});
