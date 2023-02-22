// imports
import Shot from "./Shot";

class Shots{

    constructor() {

        // empty array for saving shots
        this.shots = [];
    }

    // create shot
    create(playerPositionX, playerPositionY,  playerH, playerW, faceKeys){
        let shot = new Shot(playerPositionX, playerPositionY, playerH, playerW, faceKeys);
        this.shots.push(shot);
    }

    // animate shots
    animateShots(){
        for (let shot of this.shots){
            shot.animateShot();
        }
    }

}

// export
export default Shots;