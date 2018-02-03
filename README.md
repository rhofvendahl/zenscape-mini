# Zenscape

#### A web application built to explore 3d modeling in html and css, 01.21.2018

#### By Russell Hofvendahl

## Description

Zenscape is a web application built to explore the potential of css transforms to create rich three dimensional models. It was inspired by the work of Keith Clark (keithclark.co.uk) and the desire to model geological processes to create an aesthetically pleasing user experience.


## Specs

#### Back-end

1. Program defines a function "makeFace" for creating a new div element with dimensions, xyz rotation and xyz translation as arguments.
2. Program defines a function "makeBox" for creating 6 faces to form an enclosed box with box dimensions and translation as arguments. By default all but the front two faces are commented out to reduce rendering load.
3. Program defines a constructor for a Zenscape object with properties "xCells" and "zCells" (number of independent cells), "cellDim" (length of cubical cell in px), "map" (to contain an array of cell y values) and "clickLog" (to contain an array of the location and timestamps for the last five clicks) and "memory" (the maximum number of clicks considered calculated).
4. Program defines a Zenscape.prototype function "makeMap" for creating an appropriately dimensioned 2d array "map" with 0 for each value.
6. Program defines a Zenscape.prototype function "makeScape" for creating an array of div cells using the "makeBox" function, with the y axis extending down, the x axis extending right and the z axis extending toward the screen.
7. Program defines a Zenscape.prototype function "updateMap" which iterates through the 2d "map" array and assigns each a value representing y position based on the cell's location relative to the last x clicks (where x is set by "memory") and the time since each. For each cell and for each click the distance between cell and click is calculated and, if it is less than pi, the height of that cell is calculated based on the cosine of that number (keeping it under pi means only cells within the first "hill" of the cosine curve centered at the click are calculated). The effective spread of the cosine curve is doubled by dividing distance by 2, and the hill effectively moves outward from the click epicenter by subtracting the age of the click in seconds and only calculating cells for which distance/2-seconds is between -pi and pi; a cell at the epicenter of the click at time 0 would have a height of cos(0) (one), after a second it would a slightl lower height but all adjacent cells would have a slightl higher value as distance/2-seconds approaches 0, and after that their hight would also diminish as distance/2-seconds becomes negative and eventually ceases to be calculated after falling below -pi. 
8. Program defines a Zenscape.prototype function "updateScape" which for each box of divs first animates the top margin based on the corresponding value in "map". UpdateScape then assigns the group of divs a color based on each div's shade tag and the "map" value, with colors assigned with respect to an arbitrary "snowLine".
  

#### Front-end

9. Program creates a new Zenscape object and passes to it xCells, zCells, cellDim and memory. Program calls Zenscape methods makeMap and makeScape to set up the 2d map array and 3d div formation.
10. Program attaches an event handler to parent div (id="scape") which, for any cell clicked, references the clicked div's class (named by relative position, eg class="0-0" or "19-19"), saves the extracted coordinates and a timestamp in an array "click", and pushes the "click" array onto the "clickLog" array in Zenscape.
11. Program calls setInterval (200 ms) to create an animation loop and passes to it a Zenscape object and a function which stops all previous animations (to prevent queue buildup), calls updateMap and subsequently calls updateScape to apply changes.

## Setup/Installation Requirements

Zenscape is viewable online at http://zenscape.us

To view the source code:
1. visit https://github.com/rhofvendahl/Zenscape
2. clone or download
3. open index.html in Google Chrome

## Technologies Used

Zenscape was created entirely with html and css styling, as well as the JQuery library.

## License

This software is licensed under the MIT license.
