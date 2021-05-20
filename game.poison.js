class Poison {

    // Expect these values for orb object
    x;
    y;

    // Setup orb object class
    constructor(x, y) {

        this.x      =  x;
        this.y      =  y;
        this.width  = 30;
        this.height = 30;

    }

    // Show the orbs
    show() { fill(red); ellipse(this.x, this.y, this.width, this.height); }

    collisions() {

        // Check if any orbs are overlapping; if so, move orb to another location
        for (let x = 0; x < poisons.length; x ++) { if (this.is_touching(this, poisons[x]) && this !== poisons[x]) { this.reset_position(); } }

        if (this.is_touching(this, player)) { this.reset_position(); scoreboard(); player.points -= 1; }

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