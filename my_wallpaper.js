// Always leave me here for wallpaper to use default settings if nothing is set
var darkMode = null;
var fractalOptions;
var gemOptions;


// CUSTOMISATION
// =======================================================================

darkMode = false;  // comment this out for random darkMode
// fractalOptions = forest;  // comment this out for default
// gemOptions = pixelGems; // comment this out for default

//  ===== or add your own custom fractalOptions and gemOptions here ======
// fractalOptions = {
//     background: 88,                        // 0-100 for brightness or hexcode string
//     colours: [55, 99, 36, 85, 70, 15],     // hue of gems from 0-100
//     stroke: 150,                           // brightness of lines from 0-100
//     strokeWeight: 2.5,                     // thickness of lines
//     maxDepth: 3,                           // max recursion depth of fractal
//     minPoints: 3,                          // min number of points in a gem
//     maxPoints: 10,                         // max number of points in a gem
//     shadowOffset: 3,                       // offset of shadow from gem
//     allowInitialGem: true,                 // allow initial gem to be drawn at max size
//     allowGems: false,                      // allow gems to be drawn
//  }

// gemOptions = {
//     shadowOpacity: 45,                     // opacity of shadow from 0-100
//     shadowX: 8,                           // x offset of shadow
//     shadowY: 6,                           // y offset of shadow
//     shadowBlur: 10,                        // blur of shadow
//     rotation: -Math.PI / 2,                // rotation of gems
//     outlines: true,                        // whether to draw outlines on gems
//   }

// =======================================================================



//setup - variables
const canvasDimensions = {
  width: 200,
  height: 200
}




// default values
if (darkMode === null) darkMode = Math.random() > 0.8 ? true : false;
if (!fractalOptions) fractalOptions = darkMode ? darkOptions.fractalOptions : lightOptions.fractalOptions;
if (!gemOptions) gemOptions = gemOptions = darkMode ? darkOptions.gemOptions : lightOptions.gemOptions;


function setup_wallpaper(pWallpaper) {
  pWallpaper.output_mode(GRID_WALLPAPER);
  pWallpaper.resolution(FIT_TO_SCREEN); // FIT_TO_SCREEN
  pWallpaper.show_guide(false); //set this to false when you're ready to print

  //Grid settings
  pWallpaper.grid_settings.cell_width = 200;
  pWallpaper.grid_settings.cell_height = 200;
  pWallpaper.grid_settings.row_offset = 100;
}

/**
 * Draws the background of the wallpaper
 */
function wallpaper_background() {
  let body = document.body;
  // allow background to be a hexcode string or a brightness value
  if (typeof fractalOptions.background == 'string') {
    background(fractalOptions.background);
    body.style.backgroundColor = fractalOptions.background;
  } else {
    background(fractalOptions.background * 2.55, fractalOptions.background * 2.55, fractalOptions.background * 2.55); //light honeydew green colour
    body.style.backgroundColor = 'rgb(' + fractalOptions.background * 2.55 + ', ' + fractalOptions.background * 2.55 + ', ' + fractalOptions.background * 2.55 + ')';
  }
}


/**
 * Draws a single cell
 */
function my_symbol() { // do not rename this function. Treat this similarly to a Draw function
  angleMode(RADIANS);
  colorMode(HSB, 100);

  // draws initial recursive segment
  drawSegment(0, 0, canvasDimensions.width - fractalOptions.strokeWeight / 2, canvasDimensions.height - fractalOptions.strokeWeight / 2, 0);
  noFill();

  // draws outer shadow
  strokeWeight(fractalOptions.strokeWeight);
  stroke(0, 0, 0, 5);
  rect(fractalOptions.shadowOffset, fractalOptions.shadowOffset, canvasDimensions.width, canvasDimensions.height);

  // draws outer boundary
  stroke(fractalOptions.stroke);
  strokeWeight(fractalOptions.strokeWeight / 3);
  rect(0, 0, canvasDimensions.width, canvasDimensions.height);
}



/**
 * Generates a recursive segment
 * @param {number} x x coordinate of top left corner
 * @param {number} y y coordinate of top left corner
 * @param {number} width width of segment
 * @param {number} height height of segment
 * @param {number} depth current depth of recursion
 * @param {boolean} noRepeat whether to allow an extra recursion with no gems spawned
 */
function drawSegment(x, y, width, height, depth, noRepeat) {
  // stop recursion if max depth reached or if segment is too small
  if (depth > fractalOptions.maxDepth || width < 7 || height < 7) {
    return;
  }

  // allow initial gem to be drawn at max size if option is enabled
  if (random(1) > 0.85 && depth <= 1 && fractalOptions.allowInitialGem) {
    generateGem(x + width / 2, y + height / 2, width / 2, width / 4, Math.floor(random(fractalOptions.minPoints, fractalOptions.maxPoints)), gemOptions.rotation, fractalOptions.colours[Math.floor(random(0, fractalOptions.colours.length))]);
    return;
  }

  // draw boundaries shadows ( + )
  strokeWeight(fractalOptions.strokeWeight);
  stroke(0, 0, 0, 5);
  let shadowOffset = fractalOptions.shadowOffset;
  line(shadowOffset + x + width / 2 + fractalOptions.strokeWeight / 4, shadowOffset + y, shadowOffset + x + width / 2 + fractalOptions.strokeWeight / 4, shadowOffset + y + height);
  line(shadowOffset + x, shadowOffset + y + height / 2 + fractalOptions.strokeWeight / 4, shadowOffset + x + width, shadowOffset + y + height / 2 + fractalOptions.strokeWeight / 4);
  // draw boundaries ( + )
  strokeWeight(fractalOptions.strokeWeight / 2);
  stroke(fractalOptions.stroke);
  line(x + width / 2 + fractalOptions.strokeWeight / 4, y, x + width / 2 + fractalOptions.strokeWeight / 4, y + height);
  line(x, y + height / 2 + fractalOptions.strokeWeight / 4, x + width, y + height / 2 + fractalOptions.strokeWeight / 4);

  // stop recursion if no gems are allowed
  if (noRepeat) {
    return;
  }

  let circleCount = 0;
  // call recursion with all four corners
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 2; col++) {
      var recursionProb = 1;
      if (depth != 0) {
        recursionProb = random(1) > 0.35;
      }
      if (recursionProb) { // 65% chance of recursion
        const newX = x + col * width / 2;
        const newY = y + row * height / 2;
        const newWidth = width / 2;
        const newHeight = height / 2;
        // allow second chance of extra empty recursion at max depth
        if (depth == fractalOptions.maxDepth && random(1) > 0.7) {
          drawSegment(newX, newY, newWidth, newHeight, depth, true);
          continue;
        }
        drawSegment(newX, newY, newWidth, newHeight, depth + 1);
      } else { // 35% chance of gem
        if(fractalOptions.allowGems == false) continue;

        circleCount++;
        const newX = x + col * width / 2 + fractalOptions.strokeWeight / 2 + 1;
        const newY = y + row * height / 2 + fractalOptions.strokeWeight / 2 + 1;
        const newWidth = width / 2 - fractalOptions.strokeWeight / 2 - 2;
        const newHeight = height / 2 - fractalOptions.strokeWeight / 2 - 2;
        generateGem(newX + newWidth / 2, newY + newHeight / 2, newWidth / 2, newWidth / 4, Math.floor(random(fractalOptions.minPoints, fractalOptions.maxPoints)), gemOptions.rotation, fractalOptions.colours[Math.floor(random(0, fractalOptions.colours.length))]);
      }
    }
  }
}


/**
 * Generates a gem
 * @param {number} centerX x coordinate of center
 * @param {number} centerY y coordinate of center
 * @param {number} radius radius of gem
 * @param {number} innerRadius radius of inner gem panel
 * @param {number} sides number of sides of gem
 * @param {number} rotation rotation of gem
 * @param {number} col hue of gem
*/
function generateGem(centerX, centerY, radius, innerRadius, sides, rotation, col) {
  let on = 100;
  if (darkMode) {
    // random chance of being 15 or 100
    on = random(1) > 0.69 ? 100 : 15;
  }

  if (!rotation) {
    rotation = Math.random() * TWO_PI;
  }
  let angle = TWO_PI / sides;

  // draw outer background and shadow and find vertical/horizontal bounds for centering
  fill(0);
  if (gemOptions.outlines) {
    stroke(col, 60, 80, on == 100 ? 100 : 3);
    strokeWeight(1);
  } else {
    noStroke();
  }
  push();
  shadow(color(col, 100, 50, gemOptions.shadowOpacity), gemOptions.shadowX, gemOptions.shadowY, gemOptions.shadowBlur, on);
  let smallestY = Infinity;
  let largestY = -Infinity;
  let smallestX = Infinity;
  let largestX = -Infinity;
  let vertexes = [];

  for (let a = rotation; a < TWO_PI + rotation; a += angle) {
    let innerX = centerX + cos(a) * radius;
    let innerY = centerY + sin(a) * radius;
    if (innerY < smallestY) {
      smallestY = innerY;
    }
    if (innerY > largestY) {
      largestY = innerY;
    }
    if (innerX < smallestX) {
      smallestX = innerX;
    }
    if (innerX > largestX) {
      largestX = innerX;
    }
    vertexes.push([innerX, innerY]);
  }
  // calculate vertical and horizontal shift for centering
  let verticalShift = -1 * ((largestY - centerY) - (centerY - smallestY)) / 2;
  let horizontalShift = -1 * ((largestX - centerX) - (centerX - smallestX)) / 2;

  // draw shadow
  beginShape();
  for (let i = 0; i < vertexes.length; i++) {
    vertex(vertexes[i][0] + horizontalShift, vertexes[i][1] + verticalShift);
  }
  endShape(CLOSE);
  pop();

  push();
  // draw gem
  for (let a = rotation; a <= TWO_PI + rotation - 0.00000001; a += angle) {
    let outerX = centerX + cos(a) * radius + horizontalShift;
    let outerY = centerY + sin(a) * radius + verticalShift;
    let outerX2 = centerX + cos(a + angle) * radius + horizontalShift;
    let outerY2 = centerY + sin(a + angle) * radius + verticalShift;

    let innerX = centerX + cos(a) * innerRadius + horizontalShift;
    let innerY = centerY + sin(a) * innerRadius + verticalShift;
    let innerX2 = centerX + cos(a + angle) * innerRadius + horizontalShift;
    let innerY2 = centerY + sin(a + angle) * innerRadius + verticalShift;

    // find distance
    let brightness = 100 - calculateAngleDistance(a + angle / 2, radians(240)) * (100 / Math.PI);
    fill(0);
    linearGradient(
      (outerX + outerX2) / 2, // start x
      (outerY + outerY2) / 2, // start y
      (innerX + innerX2) / 2, // end x
      (innerY + innerY2) / 2, // end y
      color(col, 80, (brightness + 50) / 2, on), // outer colour (brightness averaged with default colour)
      color(col + (100 - brightness) / 40, 80 - brightness / 3, brightness + 25, on), // inner colour (shading)
    );

    beginShape();
    vertex(outerX, outerY);
    vertex(outerX2, outerY2);
    vertex(innerX2, innerY2);
    vertex(innerX, innerY);
    endShape(CLOSE);
  }

  // draw inner shape
  fill(0);
  linearGradient(
    centerX + cos(radians(240)) * innerRadius, // start x
    centerY + sin(radians(240)) * innerRadius, // start y
    centerX + cos(PI + radians(240)) * innerRadius, // end x
    centerY + sin(PI + radians(240)) * innerRadius, // end y
    color(col, 65, 100, on), //Start color
    color(col + 2.5, 90, 30, on), //End color
  );
  beginShape();
  for (let a = rotation; a < TWO_PI + rotation; a += angle) {
    let innerX = centerX + cos(a) * innerRadius + horizontalShift;
    let innerY = centerY + sin(a) * innerRadius + verticalShift;
    vertex(innerX, innerY);
  }
  endShape(CLOSE);
  pop();
}


// HELPER FUNCTIONS

/** 
 * Calculates the distrance between two angles including wrapping
 * @param {number} angle1 first angle
 * @param {number} angle2 second angle
 * @returns {number} distance between the two angles
 */
function calculateAngleDistance(angle1, angle2) {
  let distance = Math.abs(angle1 - angle2);
  if (distance > Math.PI) {
    distance = 2 * Math.PI - distance;
  }
  return distance;
}

/** 
 * draws a linear gradient given starting and ending X and Y coordinates and colours
 * uses javascript's drawing context rather than p5 as it is much more efficient
 * @param {number} sX starting x coordinate
 * @param {number} sY starting y coordinate
 * @param {number} eX ending x coordinate
 * @param {number} eY ending y coordinate
 * @param {p5.Color} colorS starting colour
 * @param {p5.Color} colorE ending colour
 */
function linearGradient(sX, sY, eX, eY, colorS, colorE) {
  let gradient = drawingContext.createLinearGradient(
    sX, sY, eX, eY
  );
  gradient.addColorStop(0, colorS);
  gradient.addColorStop(1, colorE);
  drawingContext.fillStyle = gradient;
}

/**
 * draws a shadow given colour, x and y offset, blur and whether the gem is on or off
 * uses javascript's drawing context rather than p5 as it is much more efficient
 * @param {p5.Color} colour colour of the shadow
 * @param {number} x x offset
 * @param {number} y y offset
 * @param {number} blur blur radius
 * @param {number} gemOn whether the gem is on or off
 */
function shadow(colour, x, y, blur, gemOn) {
  drawingContext.shadowBlur = blur;
  if (darkMode && gemOn != 100) {
    return;
  } else if (gemOn == 100) {
    drawingContext.shadowBlur = blur * 2;
  }
  drawingContext.shadowColor = colour;
  drawingContext.shadowOffsetX = x;
  drawingContext.shadowOffsetY = y;
}