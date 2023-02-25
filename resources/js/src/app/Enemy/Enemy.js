// imports
import Canvas from "../Canvas";
import shot from "@/src/app/Player/Shot";

// Classes in variables
let canvas = new Canvas();

class Enemy{

    // enemy Settings
    constructor(playerPositionX, playerPositionY) {

        this.delete = false;
        this.close = false;

        this.speed = 1;

        this.playerPositionX = playerPositionX;
        this.playerPositionY = playerPositionY;

        this.w = 50;
        this.h = 50;

        this.x = this.spawnPositionX();
        this.y = this.spawnPositionY();

        this.hitbox = (this.h / 2) + (this.w / 2);

        this.hp = 2;
    }

    // set a new spawnX position for a new enemy
    spawnPositionX(){

        let abs1 = Math.abs(this.playerPositionX);
        let abs2 = Math.abs(this.playerPositionX - (canvas.CANVAS_WIDTH - this.w));

        if(abs1 >= abs2){
            return 50;
        }

        return canvas.CANVAS_WIDTH - this.w - 50;
    }

    // set a new spawnY position for a new enemy
    spawnPositionY(){

        let abs1 = Math.abs(this.playerPositionY);
        let abs2 = Math.abs(this.playerPositionY - (canvas.CANVAS_HEIGHT - this.h));

        if(abs1 >= abs2){
            return 50;
        }

        return canvas.CANVAS_HEIGHT - this.h - 50;
    }

    shotHitsEnemy(shots, points){
        for(let shot of shots){
            // Berechne den Abstand zwischen shot und gegner
            let xDistanceShot = Math.abs((shot.x - (this.w / 2)) - this.x);
            let yDistanceShot = Math.abs((shot.y - (this.h / 2)) - this.y);
            let distanceShot = Math.sqrt((xDistanceShot * xDistanceShot) + (yDistanceShot * yDistanceShot));
            // do that if shot hit enemy
            if (distanceShot < this.hitbox && shot.delete === false) {
                shot.delete = true;
                this.hp--;
                if(this.hp === 0){
                    this.delete = true;
                    points.enemy();
                }
            }
        }
    }

    moveEnemy(playerPositionX, playerPositionY, points)
    {
        // Berechne den Abstand zwischen player und gegner
        let xDistance = Math.abs(playerPositionX - this.x);
        let yDistance = Math.abs(playerPositionY - this.y);
        let distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);

        // Wenn der Abstand kleiner als der gewünschte Radius ist, gib eine Nachricht aus
        if (distance < this.hitbox) {
            points.player();
        }

        if(xDistance <= (canvas.CANVAS_WIDTH / 2)){

            // run to player
            if(playerPositionX < this.x){
                this.x--;
            }
            if(playerPositionX > this.x){
                this.x++;
            }

            if(yDistance <= (canvas.CANVAS_HEIGHT / 2)){

                if (playerPositionY < this.y) {
                    this.y--;
                }
                if (playerPositionY > this.y) {
                    this.y++;
                }
            }else{
                if (playerPositionY < this.y) {
                    this.y++;
                }
                if (playerPositionY > this.y) {
                    this.y--;
                }
            }

        }else{
            // run to player
            if(playerPositionX < this.x){
                this.x++;
            }
            if(playerPositionX > this.x){
                this.x--;
            }
            if(yDistance <= (canvas.CANVAS_HEIGHT / 2)){

                if (playerPositionY < this.y) {
                    this.y--;
                }
                if (playerPositionY > this.y) {
                    this.y++;
                }
            }else{
                if (playerPositionY < this.y) {
                    this.y++;
                }
                if (playerPositionY > this.y) {
                    this.y--;
                }
            }

        }


        if(this.x === 0){
            this.x = canvas.CANVAS_WIDTH - this.w - 1;
        }
        else if(this.x === canvas.CANVAS_WIDTH - this.w){
            this.x = 1;
        }
        else if(this.y === 0){
            this.y = canvas.CANVAS_HEIGHT - this.h - 1;
        }
        else if(this.y === canvas.CANVAS_HEIGHT - this.h){
            this.y = 1;
        }
    }

    // draw enemy
    draw(){
        // set color and fill Rect
        canvas.CONTEXT.fillStyle = "red";
        canvas.CONTEXT.fillRect(this.x, this.y, this.w, this.h);
    }

    // clear rect
    clear(){
        canvas.CONTEXT.clearRect(this.x, this.y, this.w, this.h);
    }

    // animate Enemy
    animateEnemy(playerPositionX, playerPositionY, shots, points){
        if(this.delete === false){
            for (let count = 0; count !== this.speed; count++){
                this.clear();
                this.shotHitsEnemy(shots, points);
                this.moveEnemy(playerPositionX, playerPositionY, points);
                this.draw();
            }
        }
        else if(this.close === false){
            // delete enemy
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
export default Enemy;
