
class Points{
    livewire;

    constructor() {
        this.points = 0;
        this.GameOver = false;

        setInterval(()=>{
            this.points+=10;
        },1000);
    }

    enemy(){
        this.points+= 100;
    }

    target(){
        this.points+= 1000;
    }

    player(){
        if(this.GameOver === false){
            alert(`Game Over! Dein Score ist: ` + this.points);
            location.reload();
            this.GameOver = true;
        }
    }

    animatePoints(){
        window.livewire.emit('newScore', this.points);
    }


}
export default Points;
