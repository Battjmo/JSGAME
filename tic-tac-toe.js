document.addEventListener("DOMContentLoaded", () => {
    const gameCanvas = document.getElementById("gameCanvas");
    const ctx = gameCanvas.getContext("2d");
    const game = new Game(ctx);
    gameCanvas.width = game.canvasWidth;
    gameCanvas.height = game.canvasHeight;
    game.bindKeys();
    game.drawBoard();
});

class Game {
    constructor(ctx) {
        //Canvas
        this.canvasWidth = 600;
        this.canvasHeight = 600;
        this.ctx = ctx;
        this.mark1 = "X";
        this.mark2 = "Y";
        this.firstColumnLine = this.canvasWidth * (1/3);
        this.secondColumnLine = this.canvasWidth * (2/3);
        this.firstRowLine = this.canvasHeight * (1/3);
        this.secondRowLine = this.canvasHeight * (2/3);
        this.readClick = this.readClick.bind(this);
    }

    drawBoard() {
        this.ctx.fillStyle = "#ffffff";
        //first column
        this.ctx.rect(this.firstColumnLine - 5, 0, 5, this.canvasHeight);
        //second column
        this.ctx.rect(this.secondColumnLine - 5, 0, 5, this.canvasHeight);
        this.ctx.rect(0, this.firstRowLine - 5, this.canvasWidth, 5);
        this.ctx.rect(0, this.secondRowLine - 5, this.canvasWidth, 5);
        this.ctx.fill();
   
    }

    readClick(e) {
        const rect = e.target.getBoundingClientRect();
        const scaleX = e.target.offsetWidth / rect.width;
        const scaleY = e.target.offsetHeight / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        if (x < this.firstColumnLine) {
            if (y < this.firstRowLine) {
                console.log("top left");
                this.drawO((this.firstColumnLine - 10) / 2, (this.firstRowLine) / 2);
            }
            if (y > this.firstRowLine && y < this.secondRowLine) {
                this.drawO((this.firstColumnLine - 10) / 2, (this.canvasHeight / 2));
                console.log("middle left");
            }
            if (y > this.secondRowLine) {
                this.drawO((this.firstColumnLine - 10) / 2, this.canvasHeight * (5/6));
                console.log("bottom left");
            }
        }
        else if (x > this.firstColumnLine && x < this.secondColumnLine) {
            if (y < this.firstRowLine) {
                this.drawO((this.secondColumnLine - 10) * (3/4), this.firstRowLine / 2);
                console.log("top middle");
            }
            if (y > this.firstRowLine && y < this.secondRowLine) {
                this.drawO((this.secondColumnLine - 10) * (3 / 4), this.canvasHeight / 2);
                console.log("dead center");
            }
            if (y > this.secondRowLine) {
                this.drawO((this.secondColumnLine - 10) * (3 / 4), this.canvasHeight * (5 / 6));
                console.log("bottom middle");
            }
        }
        else if (x > this.secondColumnLine) {
            if (y < this.firstRowLine) {
                console.log("top right");
                this.drawO((this.canvasWidth - 10) * (5 / 6), this.firstRowLine / 2);

            }
            if (y > this.firstRowLine && y < this.secondRowLine) {
                this.drawO((this.canvasWidth - 10) * (5 / 6), this.canvasHeight / 2);

            }
            if (y > this.secondRowLine) {
                this.drawO((this.canvasWidth - 10) * (5 / 6), this.canvasHeight * (5 / 6));

            }
        }
    }

    drawO(x, y){
        console.log("in drawO");
        console.log(x);
        console.log(y);
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.firstColumnLine / 2 - 10, 0, Math.PI * 2);
        this.ctx.strokeStyle = "#ffffff";
        this.ctx.lineWidth = 10;
        this.ctx.stroke();
        this.ctx.closePath();
    }

    drawX(x, y) {
        this.beginPath();
    }

    bindKeys() {
        document.getElementById("gameCanvas").addEventListener("click", this.readClick.bind(this), false);
    }
}





