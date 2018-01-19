$(document).ready(function() {
  var canvas = document.getElementById("canvas");
  var ctx=canvas.getContext("2d");

  var perlin1 = document.getElementById("perlin1");

  ctx.drawImage(perlin1, 0, 0);

});
