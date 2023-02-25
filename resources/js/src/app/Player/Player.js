// imports
import Canvas from "../Canvas";
import KeySettings from "./KeySettings";
import Shots from "./Shots";

// Classes in variables
let canvas = new Canvas();
let keySettings = new KeySettings();
let shots = new Shots();

class Player{

    // Player Settings
    constructor() {
        this.shots = shots;
        this.w = 50;
        this.h = 50;
        this.startX = (canvas.CANVAS_WIDTH / 2) - (this.w / 2);
        this.startY = (canvas.CANVAS_HEIGHT / 2) - (this.h / 2);
        this.x = this.startX;
        this.y = this.startY;
        this.speed = 4;
        this.faceKeys = {
            'KeyW': false,
            'KeyA': false,
            'KeyS': false,
            'KeyD': false
        }
        this.shot = 0;
        this.hitbox = (this.h / 2) + (this.w / 2);
    }

    // face show direction
    faceDirection(){
        for (const keySettingsKey in keySettings.keyArray) {
            if (keySettings.keyArray[keySettingsKey] === true) {
                for (const key in this.faceKeys) {
                    if (key !== keySettingsKey && (this.faceKeys[keySettingsKey] === false || this.faceKeys[keySettingsKey] === true) ) {
                        this.faceKeys[key] = false;
                        this.faceKeys[keySettingsKey] = true;
                    }
                }
            }
        }
    }

    // show player where the cube is looking
    face(){
        canvas.CONTEXT.fillStyle = "yellow";

        const directions = [
            { key: "KeyW", x: this.x, y: this.y, w: this.w, h: 10 },
            { key: "KeyA", x: this.x, y: this.y, w: 10, h: this.h },
            { key: "KeyS", x: this.x, y: this.y + 40, w: this.w, h: 10 },
            { key: "KeyD", x: this.x + 40, y: this.y, w: 10, h: this.h },
        ];

        directions.map(({key, x, y, w, h}) =>{
            if (this.faceKeys[key] === true) {
                canvas.CONTEXT.fillRect(x, y, w, h);
            }
        })
    }

    // make Player move
    move(){
        if(keySettings.keyArray['KeyW'] === true){
            if(this.y !== 0){
                this.y--;
            }else{
                this.y = (canvas.CANVAS_HEIGHT - this.h);
            }
        }
        if(keySettings.keyArray['KeyA'] === true){
            if(this.x !== 0){
                this.x--;
            }else{
                this.x = (canvas.CANVAS_WIDTH - this.w);
            }
        }
        if(keySettings.keyArray['KeyS'] === true){
            if(this.y !== (canvas.CANVAS_HEIGHT - this.h)){
                this.y++;
            }else{
                this.y = 0;
            }
        }
        if(keySettings.keyArray['KeyD'] === true){
            if(this.x !== (canvas.CANVAS_WIDTH - this.w)){
                this.x++;
            }else{
                this.x = 0;
            }
        }
    }

    // draw player
    draw(points){

        // do that for all shots of shots
        for(let shot of shots.shots){

            // set default values
            let xDistanceShot = null;
            let yDistanceShot = null;

            if(shot.direction['KeyW'] === true || shot.direction['KeyA'] === true){
                xDistanceShot = Math.abs(shot.x - this.x);
                yDistanceShot = Math.abs(shot.y - this.y);
            }else if (shot.direction['KeyS'] === true || shot.direction['KeyD'] === true){
                xDistanceShot = Math.abs((shot.x - this.w + shot.w) - this.x);
                yDistanceShot = Math.abs((shot.y - this.h + shot.h) - this.y);
            }

            // check if isset a values
            if(xDistanceShot != null && yDistanceShot != null){

                // calculate distance between shot and player
                let distanceShot = Math.sqrt((xDistanceShot * xDistanceShot) + (yDistanceShot * yDistanceShot));

                // do that if shot hit player
                if (distanceShot < this.hitbox && shot.delete === false) {
                    if(shot.killPlayer === true){
                        shot.delete = true;
                        points.player();
                    }
                }
            }
        }

        canvas.CONTEXT.fillStyle = "black";
        canvas.CONTEXT.fillRect(this.x, this.y, this.w, this.h);
    }

    // clear player
    clear(){
        canvas.CONTEXT.clearRect(this.x, this.y, this.w, this.h);
    }

    // let player shoot
    shoot(){
        if(this.shot === 0){
            if(keySettings.keyArray['Space'] === true){
                this.shots.create(this.x, this.y, this.w, this.h, this.faceKeys);
                this.shot = 1;
                setTimeout(() => {
                    this.shot = 0;
                }, 1000)
            }

        }
    }

    // way it is carried out
    animatePlayer(points){
        this.shoot();
        this.shots.animateShots();
        for (let count = 0; count !== this.speed; count++){
            this.clear();
            this.move();
            this.draw(points);
            this.faceDirection();
            this.face();
        }
    }
}

// export
export default Player;
