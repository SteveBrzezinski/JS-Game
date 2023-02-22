// imports
import Canvas from "../Canvas";

// save classes in variable
let canvas = new Canvas();

class Shot{

    // shot settings
    constructor(playerPositionX, playerPositionY, playerH, playerW, faceKeys) {

        this.delete = false;
        this.close = false;

        this.speed = 6;

        this.h = 10;
        this.w = 10;
        this.x = playerPositionX + (playerH / 2) - (this.h / 2);
        this.y = playerPositionY + (playerW / 2) - (this.w / 2);

        this.direction = {
            'KeyW': false,
            'KeyA': false,
            'KeyS': false,
            'KeyD': false
        }

        for(const key in this.direction){
            if(faceKeys[key] === true){
                this.direction[key] = true;
            }
        }
    }

    // draw shot
    draw(){
        canvas.CONTEXT.fillStyle = "blue";
        canvas.CONTEXT.fillRect(this.x, this.y, this.w, this.h);
    }

    // clear shot
    clear(){
        canvas.CONTEXT.clearRect(this.x, this.y, this.w, this.h);
    }

    // direction of shot
    directionShot(){

        if(this.direction['KeyW'] === true){
            if(this.y !== 0){
                this.y--;
            }else {
                this.delete = true;
            }
        }

        if(this.direction['KeyA'] === true){
            if(this.x !== 0){
                this.x--;
            }else{
                this.delete = true;
            }
        }

        if(this.direction['KeyS'] === true){
            if(this.y !== canvas.CANVAS_HEIGHT - this.h){
                this.y++;
            }else{
                this.delete = true;
            }
        }

        if(this.direction['KeyD'] === true){
            if(this.x !== canvas.CANVAS_WIDTH - this.w){
                this.x++;
            }else{
                this.delete = true;
            }
        }
    }

    // animate shot
    animateShot(){
        if(this.delete === false){
            for (let count = 0; count !== this.speed; count++){
                this.clear();
                this.directionShot();
                this.draw();
            }
        }else if(this.close === false){
            this.clear();
            delete this.h;
            delete this.w;
            delete this.x;
            delete this.y;
            this.close = true;
        }
    }
}

// export
export default Shot;