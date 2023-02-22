// imports
import Enemy from "./Enemy";

class Enemies{
    constructor() {

        // array with enemies
        this.enemies = [];
    }

    // create an enemy
    create(playerPositionX, playerPositionY){
        let enemy = new Enemy(playerPositionX, playerPositionY);
        this.enemies.push(enemy);
    }

    // animate for all enemies in enemies array
    animateEnemies(playerPositionX, playerPositionY, shots, points){
        for (let enemy of this.enemies){
            enemy.animateEnemy(playerPositionX, playerPositionY, shots, points);
        }
    }

}
// export
export default Enemies;