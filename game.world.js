class World {

    generate() {

        // Update game -- Everything runs on ticks
        tick++;

        // Draw background with half opacity
        fill(20, 20, 20, 128);
        rect(0, 0, 1280, 720);

        // Draw top and bottom
        for (let x = 0; x < 3; x ++) { fill(player.color); rect(0, (x * 680), 1280, 70); }

        // If 100 ticks have passed, redraw solid background
        // Used to get rid of leftover translucent frames from player
        if (tick % 200 === 1) {

            fill(main2);
            rect(0, 0, 1280, 650)

        }

        // After every 2000 ticks, change the position of poisons
        if (tick % 400 === 0) {

            for (let x = 0; x < number_of_poisons; x ++) {

                poisons[x].reset_position();

            }

        }

    }

}