// imports
import Canvas from "../Canvas";

// Classes in variables
let canvas = new Canvas();

class Target{

    // Target Settings
    constructor() {
        this.h = 50;
        this.w = 50;
        this.hitbox = (this.h / 2) + (this.w / 2);
        this.x = Math.floor(Math.random() * ((canvas.CANVAS_WIDTH - this.w) + 1));
        this.y = Math.floor(Math.random() * ((canvas.CANVAS_HEIGHT - this.h) + 1));
        this.targetCount = 0;
    }

    draw(){
        canvas.CONTEXT.fillStyle = "green";
        canvas.CONTEXT.fillRect(this.x, this.y, this.w, this.h);
    }

    clear(){
        canvas.CONTEXT.clearRect(this.x, this.y, this.w, this.h);
    }

    // Create a new target on another random position if player hit target
    new(playerPositionX, playerPositionY, points){

        // Calculate the distance between player and target
        let xDistance = Math.abs(playerPositionX  - this.x);
        let yDistance = Math.abs(playerPositionY - this.y);
        let distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);

        // If player hit box of target create a new target on other random position
        if(distance < this.hitbox){
            this.targetCount++;
            points.target();
            this.x = Math.floor(Math.random() * ((canvas.CANVAS_WIDTH - this.w) + 1));
            this.y = Math.floor(Math.random() * ((canvas.CANVAS_HEIGHT - this.h) + 1));
        }
    }

    // way it is carried out
    animateTarget(playerPositionX, playerPositionY, points){
        this.clear();
        this.new(playerPositionX, playerPositionY, points);
        this.draw();
    }
}
export default Target;