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
        this.board = [[1, 1, 1], [1, 1, 1], [1, 1, 1]]
        this.currentPlayer = this.mark1;
        this.cellSize = this.canvasWidth * (1/3);
        this.firstColumnLine = this.canvasWidth * (1/3);
        this.secondColumnLine = this.canvasWidth * (2/3);
        this.firstRowLine = this.canvasHeight * (1/3);
        this.secondRowLine = this.canvasHeight * (2/3);
        this.readClick = this.readClick.bind(this);
    }

    drawBoard() {
        this.ctx.fillStyle = "#ffffff";
        this.ctx.rect(this.firstColumnLine - 2.5, 0, 5, this.canvasHeight);
        this.ctx.rect(this.secondColumnLine - 2.5, 0, 5, this.canvasHeight);
        this.ctx.rect(0, this.firstRowLine - 2.5, this.canvasWidth, 5);
        this.ctx.rect(0, this.secondRowLine - 2.5, this.canvasWidth, 5);
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
                if (this.currentPlayer === this.mark1) {
                    this.drawX(this.firstColumnLine / 2, (this.firstRowLine) / 2);
                    this.board[0][0] = this.mark1;
                } else {
                    this.drawO(this.firstColumnLine / 2, (this.firstRowLine) / 2);
                    this.board[0][0] = this.mark2;
                }
                this.switchPlayer();
            }
            if (y > this.firstRowLine && y < this.secondRowLine) {
                if (this.currentPlayer === this.mark1) {
                    this.drawX(this.firstColumnLine / 2, (this.canvasHeight / 2));
                    this.board[1][0] = this.mark1;
                } else { 
                    this.drawO(this.firstColumnLine / 2, (this.canvasHeight / 2));
                    this.board[1][0] = this.mark2;
                }
                this.switchPlayer();
            }
            if (y > this.secondRowLine) {
                if (this.currentPlayer === this.mark1) {
                    this.drawX(this.firstColumnLine / 2, this.canvasHeight * (5 / 6));
                    this.board[2][0] = this.mark1;
                } else {
                    this.drawO(this.firstColumnLine / 2, this.canvasHeight * (5 / 6));
                    this.board[2][0] = this.mark2;
                }
                this.switchPlayer();
            }
        }
        else if (x > this.firstColumnLine && x < this.secondColumnLine) {

            if (y < this.firstRowLine) {
                if (this.currentPlayer === this.mark1) {
                    this.drawX(this.secondColumnLine * (3 / 4), this.firstRowLine / 2);
                } else {
                    this.drawO(this.secondColumnLine * (3 / 4), this.firstRowLine / 2);
                }
                this.switchPlayer();
            }
            if (y > this.firstRowLine && y < this.secondRowLine) {
                if (this.currentPlayer === this.mark1) {
                    this.drawX(this.secondColumnLine * (3 / 4), this.canvasHeight / 2);
                } else {
                    this.drawO(this.secondColumnLine * (3 / 4), this.canvasHeight / 2);
                }
                this.switchPlayer();
                
            }
            if (y > this.secondRowLine) {
                if (this.currentPlayer === this.mark1) {
                    this.drawX(this.secondColumnLine * (3 / 4), this.canvasHeight * (5 / 6));
                } else {
                    this.drawO(this.secondColumnLine * (3 / 4), this.canvasHeight * (5 / 6));
                }
                this.switchPlayer();
            }
        }
        else if (x > this.secondColumnLine) {
            if (y < this.firstRowLine) {
                if (this.currentPlayer === this.mark1) {
                    this.drawX(this.canvasWidth * (5 / 6), this.firstRowLine / 2);
                } else {
                    this.drawO(this.canvasWidth * (5 / 6), this.firstRowLine / 2);
                }
                this.switchPlayer();

            }
            if (y > this.firstRowLine && y < this.secondRowLine) {
                if (this.currentPlayer === this.mark1) {
                    this.drawX(this.canvasWidth * (5 / 6), this.canvasHeight / 2);
                } else {
                    this.drawO(this.canvasWidth * (5 / 6), this.canvasHeight / 2);
                }
                this.switchPlayer();
              
            }
            if (y > this.secondRowLine) {
                if (this.currentPlayer === this.mark1) {
                    this.drawX(this.canvasWidth * (5 / 6), this.canvasHeight * (5 / 6));
                } else {
                    this.drawO(this.canvasWidth * (5 / 6), this.canvasHeight * (5 / 6));
                }
                this.switchPlayer();
            }
        }
    }

    drawO(x, y){
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.firstColumnLine / 2 - 10, 0, Math.PI * 2);
        this.ctx.strokeStyle = "#ffffff";
        this.ctx.lineWidth = 10;
        this.ctx.stroke();
        this.ctx.closePath();
    }

    drawX(x, y) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = "#ffffff";
        this.ctx.lineWidth = 10;

        this.ctx.moveTo(x - (this.cellSize) / 2, y - (this.cellSize / 2));
        this.ctx.lineTo(x + (this.cellSize) / 2, y + (this.cellSize / 2));
        this.ctx.moveTo(x - (this.cellSize) / 2, y + (this.cellSize / 2));
        this.ctx.lineTo(x + (this.cellSize) / 2, y - (this.cellSize / 2));

        this.ctx.stroke();
        this.ctx.closePath();
    }

    switchPlayer() {
        if (this.currentPlayer === this.mark1) {
            this.currentPlayer = this.mark2;
        } else {
            this.currentPlayer = this.mark1;
        }
    }

    bindKeys() {
        document.getElementById("gameCanvas").addEventListener("click", this.readClick.bind(this), false);
    }
}





