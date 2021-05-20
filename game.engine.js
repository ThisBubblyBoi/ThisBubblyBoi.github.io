let player, world, controller, tick = 0, font, game_started; // Declare variables, don't initialize them (save for later)

const number_of_orbs = 5; // Creates less than this amount (because for loop attempts to stay under specified value)

let orbs = [], orb_cords_X = [], orb_cords_Y = [];

const number_of_poisons = 5; // Creates less than this amount (because for loop attempts to stay under specified value)

let poisons = [], poison_cords_X = [], poison_cords_Y = [];

const ui_text = "Welcome to White Point. In this 2D platformer game, use the 'W', 'A', and 'D' keys to move the player \naround. " +
                      "Attempt to collect as many orbs \n(white circles) as possible, while avoiding poisons \n(red circles). Good luck! ";

let main1 = "#ffdb15";
let main2 = "#141414";
let white = "#ffffff";
let red   = "#c40000";

let color = "#141414";
let bg = document.querySelector(':root');

// Start site in dark mode
document.addEventListener("DOMContentLoaded", function(event) { document.documentElement.setAttribute("data-theme", "dark"); });

// Switch site from dark to light mode on click
function changeMode() {
  
  console.log("Switching themes...");
  
  const current_theme = document.documentElement.getAttribute("data-theme");
  
  // Ternary operator syntax from W3 School's operator guide -- https://www.w3schools.com/jsref/jsref_operators.asp
  const new_theme = current_theme === "dark" ? "light" : "dark";
  
  // Set our current theme to the new one
  document.documentElement.setAttribute("data-theme", new_theme);
  
  console.log("Using " + new_theme + " mode.")

}


function preload() {

  font = "Bebas Neue";

  console.log("Assets preloaded...");

  console.log("Spawning orbs...");

  // Generate random orb positions
  for (let x = 0; x < number_of_orbs; x++) { orb_cords_X.push(getRandom(100, 1150)); orb_cords_Y.push(getRandom(350, 500)); }

  // Generate random poison positions
  for (let x = 0; x < number_of_poisons; x++) { poison_cords_X.push(getRandom(100, 1150)); poison_cords_Y.push(getRandom(350, 500)); }

}

function setup() {

  // Apply classes to empty variables
  console.log("Creating player...");
  player =    new Player();

  console.log("Creating world...");
  world  =    new World();

  console.log("Creating orbs...");
  for (let x = 0; x < number_of_orbs; x ++) { orbs.push(new Orb(orb_cords_X[x], orb_cords_Y[x])); } // Create orb object with randomly generated x and y coordinates

  console.log("Creating poisons...");
  for (let x = 0; x < number_of_poisons; x ++) { poisons.push(new Poison(poison_cords_X[x], poison_cords_Y[x])); } // Create poison object with randomly generated x and y coordinates

  console.log("Creating controller...");
  controller = new Controller();

  // Draw canvas with set size
  console.log("Creating game screen...");
  createCanvas(1250, 750);

  console.log("Game setup completed.");

  // Don't start game until user indicates they are ready to play
  game_started = false;
  
  // Update the HTML tags' colors, corresponds to last player colors at the time of the score save
  update_HTML();

  // If this user has played before, then show their last score
  html_element1 = document.getElementById("message");
  if (stored_score !== null || true) { html_element1.innerHTML = "Last score: " + stored_score; }

  html_element2 = document.getElementById("highscore");
  if (stored_score !== null || true) { html_element2.innerHTML = "High score: " + stored_high; }

}

class Controller {

  constructor() {

    this.up    = false;
    this.down  = false;
    this.right = false;
    this.left  = false;

    let keyEvent = (press) => {

      // [↑]
      if (press.code === "ArrowUp" && game_started)    { this.up    = press.type ===  "keydown"; }

      // [→]
      if (press.code === "ArrowRight" && game_started) { this.right = press.type ===  "keydown"; }

      // [↓]
      if (press.code === "ArrowDown" && game_started)  { this.down  = press.type ===  "keydown"; }

      // [←]
      if (press.code === "ArrowLeft" && game_started)  { this.left  = press.type ===  "keydown"; }

      // [SAVE | Z]
      document.addEventListener("keydown", function(event) {

        if (event.keyCode === 90 && (Number(stored_score) !== player.points) || stored_score === undefined) { return store_score(); }

      });

    }

    window.addEventListener("keydown", keyEvent);
    window.addEventListener("keyup", keyEvent);

  }

}

function draw() {

  if (game_started) {

    // Update world
    world.generate();

    // Update player
    player.update();
    player.show();

    // Update scoreboard
    scoreboard();

    // Update orbs
    for (let x = 0; x < number_of_orbs; x ++)      { orbs[x].collisions(); }
    for (let x = 0; x < number_of_orbs; x += 2)    { orbs[x].show(x); }

    // Update poisons
    for (let x = 0; x < number_of_poisons; x ++)   { poisons[x].collisions(); }
    for (let x = 0; x < number_of_poisons; x += 2) { poisons[x].show(x); }
    
    update_HTML();
    
  } else { menu(); }

}

class Box {

  x;
  y;
  width;
  height;

  constructor(x, y, width, height) {

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

  }

  draw() {

    rect(this.x, this.y, this.width, this.height, 10);

  }

  was_clicked() {

    if (mouseX > this.x  &&
        mouseX < this.x + this.width &&
        mouseY > this.y &&
        mouseY < this.y + this.height && mouseClicked) { return true; }

  }

}

function menu() {

  // UI box
  fill(main1);
  let border = new Box(325, 170, 600, 400);
  border.draw();
  fill(20, 20, 20);
  let ui = new Box(335, 180, 580, 380);
  ui.draw();

  // Start button
  fill(main1);
  let start = new Box(475, 500, 300, 50);
  start.draw();
  fill(20, 20, 20);
  textFont(font);
  textSize(50);
  textAlign(LEFT);
  text("START", 580, 505, 680);

  // Instructions
  fill(white);
  textSize(30);
  textAlign(CENTER);
  text(ui_text, 360, 205, 530, 355);

  // Start game once user is ready
  game_started = start.was_clicked();

}

// Check for mouse [left] clicks
let mouseClicked = false;

document.body.onmousedown   =   function() { mouseClicked   =    true; }
document.body.onmouseup     =   function() { mouseClicked   =   false; }

// Right before the window closes, save the player's scores
window.onbeforeunload =  ()=> { store_score(); }

// Logs player score in console
function scoreboard() {

  fill(main2);
  textFont(font);
  textSize(50);
  textAlign(LEFT);
  text("Score: " + player.points, 20, 55);

}

// Randomly generates a number, given the minimum and maximum possible values
// Syntax learned from Web Dev Simplified's Arrow Function tutorial: https://www.youtube.com/watch?v=h33Srr5J9nY
let getRandom = (min, max) => Math.floor(Math.random() * (max - min) ) + min;