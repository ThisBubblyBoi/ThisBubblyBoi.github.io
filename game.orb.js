class Orb {

    // Expect these values for orb object
    x;
    y;
    width;
    height;

    // Setup orb object class
    constructor(x, y) {

        this.x      =  x;
        this.y      =  y;
        this.width  = 30;
        this.height = 30;

    }

    // Show the orbs
    show() { fill(white); ellipse(this.x, this.y, this.width, this.height); }

    collisions() {

        // Check if any orbs are overlapping; if so, move orb to another location
        for (let x = 0; x < orbs.length; x ++) { if (this.is_touching(this, orbs[x]) && this !== orbs[x]) { this.reset_position() } }

        if (this.is_touching(this, player)) { this.reset_position(); scoreboard(); player.points += 1; }

    }

    reset_position() {

        this.x = getRandom(100, 1150); this.y = getRandom(350, 500);

    }

    is_touching(thing1, thing2) {

        return thing1.x   +   thing1.width   >   thing2.x   &&
               thing2.x   +   thing2.width   >   thing1.x   &&
               thing1.y   +   thing1.height  >   thing2.y   &&
               thing2.y   +   thing2.height  >   thing1.y;

    }



}