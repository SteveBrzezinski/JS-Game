class Settings{
    constructor() {

    }

    player(player, target, enemies){
        if(target.targetCount === 10){
            player.speed++;
            enemies.create();
            target.targetCount = 0;
        }
    }

    animateSettings(player, target, enemies, points){
        this.player(player, target, enemies);
    }
}
export default Settings;