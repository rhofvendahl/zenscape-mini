/*var DRUM_TEXTURE = "https://keithclark.co.uk/labs/css-fps/drum2.png";

// Assembiles are for grouping faces and other assembiles
function createAssembly() {
    var assembly = document.createElement("div");
    assembly.className = "threedee assembly";
    return assembly;
}

function createFace(w, h, x, y, z, rx, ry, rz, tsrc, tx, ty) {
    var face = document.createElement("div");
    face.className = "threedee face";
    face.style.cssText = PrefixFree.prefixCSS(
        "background: url(" + tsrc + ") -" + tx.toFixed(2) + "px " + ty.toFixed(2) + "px;" +
        "width:" + w.toFixed(2) + "px;" +
        "height:" + h.toFixed(2) + "px;" +
        "margin-top: -" + (h / 2).toFixed(2) + "px;" +
        "margin-left: -" + (w / 2).toFixed(2) + "px;" +
        "transform: translate3d(" + x.toFixed(2) + "px," + y.toFixed(2) + "px," + z.toFixed(2) + "px)" +
        "rotateX(" + rx.toFixed(2) + "rad) rotateY(" + ry.toFixed(2) + "rad) rotateY(" + rz.toFixed(2) + "rad);");
    return face;
}

function createTube(dia, height, sides, texture) {
    var tube = createAssembly();
    var sideAngle = (Math.PI / sides) * 2;
    var sideLen = dia * Math.tan(Math.PI/sides);
    for (var c = 0; c < sides; c++) {
        var x = Math.sin(sideAngle * c) * dia / 2;
        var z = Math.cos(sideAngle * c) * dia / 2;
        var ry = Math.atan2(x, z);
        tube.appendChild(createFace(sideLen + 1, height, x, 0, z, 0, ry, 0, texture, sideLen * c, 0));
    }
    return tube;
}

function createBarrel() {
    var barrel = createTube(100, 196, 20, DRUM_TEXTURE);
    barrel.appendChild(createFace(100, 100, 0, -98, 0, Math.PI / 2, 0, 0, DRUM_TEXTURE, 0, 100));
    barrel.appendChild(createFace(100, 100, 0, 98, 0, -Math.PI / 2, 0, 0, DRUM_TEXTURE, 0, 100));
    return barrel;
}

document.body.appendChild(createBarrel());

function buildEmpty(width, height) {
  var newMap = [];
  for (var i = 0; i < width; i++) {
    newMap.push(Array(height).fill(0));
  };
  return newMap;
};
*/

var array = [
  [0, 0, 1, 0, 0],
  [0, 1, 2, 0, 0],
  [1, 2, 3, 2, 1],
  [0, 1, 2, 1, 0],
  [0, 0, 1, 0, 0]];

$(document).ready(function() {
/*  var scape = document.getElementById("scape");
  var ctx=scape.getContext("2d");
  scape.width = 300;
  scape.height = 300;

  var perlin1 = document.getElementById("perlin1");
  ctx.drawImage(perlin1, 0, 0);


  //console.log(ctx.getImageData(10, 10, 10, 10));

  jQuery.get("")*/
});
