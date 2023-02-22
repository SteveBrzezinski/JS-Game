class Canvas{
    constructor() {
        this.CANVAS = document.getElementById("canvas");
        this.CANVAS_HEIGHT = this.CANVAS.height = 500;
        this.CANVAS_WIDTH = this.CANVAS.width = 1000;
        this.CONTEXT = this.CANVAS.getContext('2d');
    }
}
export default Canvas;