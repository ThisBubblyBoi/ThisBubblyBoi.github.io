let stored_name =  localStorage.getItem("name");
let stored_score = localStorage.getItem("score");
let stored_score_color = localStorage.getItem("last_color");
let stored_high = localStorage.getItem("high");
let stored_high_color = localStorage.getItem("high_color");
let html_element1, html_element2;

// Locally store player scores! Stores scores even after tab refreshes!

// Inspired from W3School's lesson on localStorage() -- https://www.w3schools.com/jsref/prop_win_localstorage.asp
function store_score() {

    console.log("Saving score...");

    localStorage.setItem("name", player.name);
    localStorage.setItem("score", player.points);
    localStorage.setItem("last_color", player.color);

    if (stored_high < player.points) { localStorage.setItem("high", player.points);
                                        localStorage.setItem("high_color", player.color);
                                        html_element2.innerHTML = "High score: " + stored_high; }

    print_score();
    console.log("Saved score!");

}

function print_score() {

    stored_name         =        localStorage.getItem("name");
    stored_score        =       localStorage.getItem("score");
    stored_high         =        localStorage.getItem("high");

    console.log("Name: " + stored_name + " | " + stored_score);

    if (stored_high !== undefined) {  console.log("High score: " + stored_high); }

    html_element1 = document.getElementById("message");

    html_element1.innerHTML = "Your score was saved!";
    setTimeout(()=> { html_element1.innerHTML = ""; } , 3000);

}

function update_HTML() {
    
    stored_score_color  =  localStorage.getItem("last_color");
    stored_high_color   =  localStorage.getItem("high_color");
    
    let score_color     =  document.querySelector(':root');
    let high_color      =  document.querySelector(':root');
    
    score_color.style.setProperty("--player_color", stored_score_color);
    high_color.style.setProperty("--high_color", stored_high_color);
    
}
