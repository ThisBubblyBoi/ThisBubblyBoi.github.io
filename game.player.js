class Player {

    // Setup player attributes
    constructor() {

        this.x          =       100;
        this.y          =       395;
        this.velocity_Y =         0;
        this.velocity_X =         0;
        this.width      =        50;
        this.height     =        50;
        this.jumping    =     false;
        this.color      =     main1;
        this.gravity    =         2;
        this.points     =         0;
        this.points     =         0;
        this.name       =  "Player";

    }

    move() {

        // Jump & change player color [↑]
        if (controller.up && !this.jumping) { this.jumping = true; this.jump(); }

        // Go down, nothing really happens (gravity does the job) [↓]
        // Kept for when game is expanded and will require the use of the ↓ key
        if (controller.down) { }

        // Go left [←]
        if (controller.left) { this.velocity_X -= 1; }

        // Go right [→]
        if (controller.right) { this.velocity_X += 1; }

    }

    jump() { this.velocity_Y -= 35; this.getRandomColor(); }

    check() {

        // Too far up
        if (this.y <= 70) { this.y = 70; }

        // Too far down
        if (this.y >= 630) { this.y = 630; this.jumping = false; }

        // Too far left, teleports to other side
        if (this.x < 0) { this.x = 1200; }

        // Too far right, teleports to other side
        if (this.x > 1200) { this.x = 0; }

    }

    // Get a random player color
    getRandomColor() {

        if (this.jumping) {

            // Explanation: Each color has RGB values from 0 to 255, or 256 total options
            // Since colors start from "000000" and go until "FFFFFF", there are ((256^3) - 1) possibilities
            // (256^3) - 1 = 16777215
            // Use this number, and a random number from Math.Random(), to get a random color
            // Idea from: https://css-tricks.com/snippets/javascript/random-hex-color/
            this.color = Math.floor(Math.random() * 16777215).toString(16);
            this.color =  "#" + this.color;
        }

        else { return this.color; }
    }

    show() {

        // Show player
        fill(this.color);
        strokeWeight(0);
        rect(this.x, this.y, this.width, this.height);

    }

    update() {

        this.velocity_Y +=    this.gravity;
        this.x          += this.velocity_X;
        this.y          += this.velocity_Y;
        this.velocity_Y *=             0.9;
        this.velocity_X *=             0.9;

        this.move();
        this.check();

    }

}