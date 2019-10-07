
let canvas;
let ctx;

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 850;
canvas.height = 650;
document.body.appendChild(canvas);

let bgReady, narwhalReady, fishReady;
let bgImage, narwhalImage, fishImage;

let startTime = Date.now();
const SECONDS_PER_ROUND = 30;
let elapsedTime = 0;

function loadImages() {
  bgImage = new Image();
  bgImage.onload = function () {
    // show the background image
    bgReady = true;
  };
  bgImage.src = "img/background.jpg";
  narwhalImage = new Image();
  narwhalImage.onload = function () {
    // show the hero image
    narwhalReady = true;
  };
  narwhalImage.src = "img/narwhal.png";

  fishImage = new Image();
  fishImage.onload = function () {
    // show the monster image
    fishReady = true;
  };
  fishImage.src = "img/fish.png";
}

/** 
 * Setting up our characters.
 * 
 * Note that heroX represents the X position of our hero.
 * heroY represents the Y position.
 * We'll need these values to know where to "draw" the hero.
 * 
 * The same applies to the monster.
 */

let narwhalX = canvas.width / 2;
let narwhalY = canvas.height / 2;

let fishX = 100;
let fishY = 100;

/** 
 * Keyboard Listeners
 * You can safely ignore this part, for now. 
 * 
 * This is just to let JavaScript know when the user has pressed a key.
*/
let keysDown = {};
function setupKeyboardListeners() {
  // Check for keys pressed where key represents the keycode captured
  // For now, do not worry too much about what's happening here. 
  addEventListener("keydown", function (key) {
    keysDown[key.keyCode] = true;
  }, false);

  addEventListener("keyup", function (key) {
    delete keysDown[key.keyCode];
  }, false);
}


/**
 *  Update game objects - change player position based on key pressed
 *  and check to see if the monster has been caught!
 *  
 *  If you change the value of 5, the player will move at a different rate.
 */
let update = function () {
  // Update the time.
  elapsedTime = Math.floor((Date.now() - startTime) / 1000);


  if (38 in keysDown) { // Player is holding up key
    narwhalY -= 5;
  }
  if (40 in keysDown) { // Player is holding down key
    narwhalY += 5;
  }
  if (37 in keysDown) { // Player is holding left key
    narwhalX -= 5;
  }
  if (39 in keysDown) { // Player is holding right key
    narwhalX += 5;
  }

  // Check if player and monster collided. Our images
  // are about 32 pixels big.
  if (
    narwhalX <= (fishX + 32)
    && fishX <= (narwhalX + 32)
    && narwhalY <= (fishY + 32)
    && fishY <= (narwhalY + 32)
  ) {
    // Pick a new location for the monster.
    // Note: Change this to place the monster at a new, random location.
    fishX = fishX + 50;
    fishY = fishY + 70;
  }
};

/**
 * This function, render, runs as often as possible.
 */
const render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (narwhalReady) {
    ctx.drawImage(narwhalImage, narwhalX, narwhalY);
  }
  if (fishReady) {
    ctx.drawImage(fishImage, fishX, fishY);
  }
  ctx.fillText(`Seconds Remaining: ${SECONDS_PER_ROUND - elapsedTime}`, 20, 100);
};

/**
 * The main game loop. Most every game will have two distinct parts:
 * update (updates the state of the game, in this case our hero and monster)
 * render (based on the state of our game, draw the right things)
 */
const main = function () {
  update(); 
  render();
  // Request to do this again ASAP. This is a special method
  // for web browsers. 
  requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame.
// Safely ignore this line. It's mostly here for people with old web browsers.
// var w = window;
// requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
loadImages();
setupKeyboardListeners();
main();

