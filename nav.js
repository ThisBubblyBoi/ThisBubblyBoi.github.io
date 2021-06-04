// All the code for the top navigation bar can be found here!

console.log("Navigation script is running...");

function select(item, x) {

  // Log which page the user will be forwarded to
  console.log("Going to the '" + x + "' page!");

  // Unselect other items from "active" state, set to "inactive"
  var all = document.getElementsByTagName("a");
  for (let x = 0; x < all.length; x ++) {

    if (all[x].className == "active") { all[x].className = "inactive"; }

  }

  // Update that page to be the active page in the nav bar
  document.getElementById(x).className = "active";

}

// If nav bar button was clicked, set it as the "current" selection
function selection() {

  var bar = document.getElementById("nav-bar");

  if (bar.className === "nav-bar") { bar.className += " responsive"; } 
    
  else { bar.className = "nav-bar"; }

}