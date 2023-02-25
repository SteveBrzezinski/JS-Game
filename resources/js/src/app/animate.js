// imports
import Player from "./Player/Player";
import Target from "./Target/Target";
import Enemies from "./Enemy/Enemies";
import Points from "./Points/Points";
import Settings from "./Settings/Settings";

// Classes in variables
let player = new Player();
let target = new Target();
let enemies = new Enemies();
let points = new Points();
let settings = new Settings();

// create enemy
enemies.create(player.x, player.y);

// create all 10 sec an Enemy
setInterval(() => {
    enemies.create(player.x, player.y);
}, 10000)

// way it is carried out
function animate(){
    settings.animateSettings(player, target, enemies, points);
    target.animateTarget(player.x, player.y, points);
    enemies.animateEnemies(player.x, player.y, player.shots.shots, points);
    player.animatePlayer(points);
    points.animatePoints();
    requestAnimationFrame(animate);
}

// export
export const ANIMATE = animate();
