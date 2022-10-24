const GAMEBOARD = document.querySelector(".game-board");
const SCOREUI = document.querySelector(".score-board");
const NEWGAME = document.querySelector(".new-game");
const HIGHSCORE = document.querySelector(".high-score");
var high = 0;

class Board{
    createBoard(){};
    constructor(rows, columns){
        this.rows = rows;
        this.columns = columns;
        this.index = 0;
        this.board = [];
        this.createBoard();
        this.boardUi = Array.from(document.querySelectorAll(".square"));
        this.score = 0;
    }

    createBoard(){
        for (var r=0; r<this.rows; r++){
            this.board[r] = [];
            var divRow = document.createElement("div");
            divRow.style.display = "flex";
            GAMEBOARD.appendChild(divRow);
            for (var c=0; c<this.columns; c++){
                var divCol = document.createElement("div");
                divCol.style.width = "150px";
                divCol.style.height = "150px";
                divCol.style.display = "flex";
                divCol.style.alignItems = "center";
                divCol.style.justifyContent = "center";
                divCol.style.font = "bold 40px Arial";
                divCol.style.color = "#fff"
                divCol.setAttribute("class", "square");
                divRow.appendChild(divCol);
                this.board[r][c] = 0;
            }
        }
        return this.board;
    }

    checkAdjacent(){
        for (var row = 0; row < this.rows; row++){
            for (var col = 0; col < this.columns - 1; col++){
                if (this.board[row][col] == this.board[row][col + 1]){
                    return false;
                }
                if (this.board[row][col] == 0 || this.board[row][col + 1] == 0){
                    return false;
                }
            }
        }
    
        for (var col = 0; col < this.columns; col++){
            for (var row = 0; row < this.rows-1; row++){
                if (this.board[row][col] == this.board[row + 1][col]){
                    return false;
                }
                if (this.board[row][col] == 0 || this.board[row + 1][col] == 0){
                    return false;
                }
            }
        }
        return true;
    }

    changeColor(num){
        switch(num) {
            case 0:
                return "#fff"
            case 2:
                return "#b0703f"
            case 4:
                return "#f09956"
            case 8:
                return "#ff821c"
            case 16:
                return "#ff7300"
            case 32:
                return "#ffd900"
            case 2048:
                return "#fa3200"
            default:
                return "#ffe133"
        }
    }

    moveUp(){
        var moved = false;
        for (var col = 0; col < this.columns; col++){
            var nums = [];
            for (var i = 0; i < this.rows; i++){
                if (this.board[i][col] != 0){
                    nums.push(this.board[i][col])
                }
            }
    
            var row = 0;
            var curr = 0;
            while (curr < nums.length){
                if (curr + 1 < nums.length && nums[curr] == nums[curr+1]){
                    moved = true;
                    this.board[row][col] = nums[curr] * 2;
                    this.boardUi[row * this.rows + col].innerHTML = nums[curr]*2;
                    this.boardUi[row * this.rows + col].style.backgroundColor  = this.changeColor(this.board[row][col]);
                    this.score += this.board[row][col]
                    curr+=2;
                }
                else{
                    if (this.board[row][col] != nums[curr]){
                        moved = true;
                    }
                    this.board[row][col] = nums[curr];
                    this.boardUi[row * this.rows + col].innerHTML = nums[curr];
                    this.boardUi[row * this.rows + col].style.backgroundColor  = this.changeColor(this.board[row][col]);
                    curr++;
                }
                row++;
            }
    
            for (var i = row; i < this.rows; i++){
                this.board[i][col] = 0;
                this.boardUi[i * this.rows + col].innerHTML = "";
                this.boardUi[i * this.rows + col].style.backgroundColor  = this.changeColor(0);
            }
        }
        return moved;
    }

    moveDown(){
        var moved = false;
        for (var col = 0; col < this.columns; col++){
            var nums = [];
            for (var i = this.rows-1; i >= 0; i--){
                if (this.board[i][col] != 0){
                    nums.push(this.board[i][col]);
                }
            }
    
            var row = this.rows - 1;
            var curr = 0;
            while (curr < nums.length){
                if (curr + 1 < nums.length && nums[curr] == nums[curr+1]){
                    moved = true;
                    this.board[row][col] = nums[curr] * 2;
                    this.boardUi[row * this.rows + col].innerHTML = nums[curr]*2;
                    this.boardUi[row * this.rows + col].style.backgroundColor  = this.changeColor(this.board[row][col]);
                    this.score += this.board[row][col];
                    curr+=2;
                }
                else{
                    if (this.board[row][col] != nums[curr]){
                        moved = true;
                    }
                    this.board[row][col] = nums[curr];
                    this.boardUi[row * this.rows + col].innerHTML = nums[curr];
                    this.boardUi[row * this.rows + col].style.backgroundColor  = this.changeColor(this.board[row][col]);
                    curr++;
                }
                row--;
            }
    
            for (var i = row; i >= 0; i--){
                this.board[i][col] = 0;
                this.boardUi[i * this.rows + col].innerHTML = "";
                this.boardUi[i * this.rows + col].style.backgroundColor  = this.changeColor(0)
            }
        }
        return moved;
    }

    movedLeft(){
        var moved = false;
        for (var r=0; r < this.rows; r++){
            var nums = [];
            for (var c=0; c < this.columns; c++){
                if (this.board[r][c] != 0){
                    nums.push(this.board[r][c]);
                }
            }

            var curr = 0;
            var col = 0;
            while (curr < nums.length){
                if (curr + 1 < nums.length && nums[curr] == nums[curr+1]){
                    moved = true;
                    this.board[r][col] = nums[curr] * 2;
                    this.boardUi[r * this.rows + col].innerHTML = nums[curr]*2;
                    this.boardUi[r * this.rows + col].style.backgroundColor  = this.changeColor(this.board[r][col]);
                    this.score += this.board[r][col]
                    curr+=2;
                }
                else{
                    if (this.board[r][col] != nums[curr]){
                        moved = true;
                    }
                    this.board[r][col] = nums[curr];
                    this.boardUi[r * this.rows + col].innerHTML = nums[curr];
                    this.boardUi[r * this.rows + col].style.backgroundColor  = this.changeColor(this.board[r][col]);
                    curr++;
                }
                col++;
            }

            for (var i = col; i < this.columns; i++){
                this.board[r][i] = 0;
                this.boardUi[r * this.rows + i].innerHTML = "";
                this.boardUi[r * this.rows + i].style.backgroundColor  = this.changeColor(0);

            }
        }
        return moved;
    }

    moveRight(){
        var moved = false;
        for (var r = 0; r < this.rows; r++){
            var nums = [];
            for (var c = this.columns-1; c >= 0; c--){
                if (this.board[r][c] != 0){
                    nums.push(this.board[r][c]);
                }
            }
    
            var col = this.columns-1;
            var curr = 0;
            while (curr < nums.length){
                if (curr + 1 < nums.length && nums[curr] == nums[curr+1]){
                    moved = true;
                    this.board[r][col] = nums[curr] * 2;
                    this.boardUi[r * this.rows + col].innerHTML = nums[curr]*2;
                    this.boardUi[r * this.rows + col].style.backgroundColor  = this.changeColor(this.board[r][col]);
                    this.score += this.board[r][col]
                    curr+=2;
                }
                else{
                    if (this.board[r][col] != nums[curr]){
                        moved = true;
                    }
                    this.board[r][col] = nums[curr];
                    this.boardUi[r*this.rows + col].innerHTML = nums[curr];
                    this.boardUi[r * this.rows + col].style.backgroundColor  = this.changeColor(this.board[r][col]);
                    curr++;
                }
                col--;
            }
    
            for (var i = col; i >= 0; i--){
                this.board[r][i] = 0;
                this.boardUi[r * this.rows + i].innerHTML = "";
                this.boardUi[r * this.rows + i].style.backgroundColor  = this.changeColor(0);
            }
        }
        return moved;    
    }

    randomCell(){
        var emptyCells = [];
        for (var r=0; r<this.rows; r++){
            for (var c=0; c<this.columns; c++){
                if (this.board[r][c] == 0){
                    emptyCells.push(r * this.columns + c);
                }
            }
        }
        if (emptyCells.length > 0){
            var rng = Math.floor(Math.random() * emptyCells.length);
            var r = Math.floor(emptyCells[rng]/this.rows);
            var c = emptyCells[rng]%this.columns;
            this.board[r][c] = 2;
            this.boardUi[emptyCells[rng]].innerHTML = "2";  
            this.boardUi[emptyCells[rng]].style.backgroundColor = this.changeColor(this.board[r][c]);
        } 
    }

    updateScore(){
        SCOREUI.innerHTML = "Score: " + this.score;
        if (this.score > high){
            high = this.score;
            HIGHSCORE.innerHTML = "High Score: " + high;
        } 
    }
}

var board1 = new Board(4,4);
board1.randomCell();
board1.randomCell();
window.addEventListener("keydown", (event) =>{
    if (!board1.checkAdjacent()){
        switch(event.key){
            case "w":
                if (board1.moveUp()){
                    board1.randomCell();
                    board1.updateScore();
                }
                break;
            case "a":
                if (board1.movedLeft()){
                    board1.randomCell();
                    board1.updateScore();
                }
                break;
            case "s":
                if (board1.moveDown()){
                    board1.randomCell();
                    board1.updateScore();
                }
                break;
            case "d":
                if (board1.moveRight()){
                    board1.randomCell();
                    board1.updateScore();
                }
                break;
        }
    }
})

NEWGAME.addEventListener("click", (e) =>{
    while (GAMEBOARD.lastElementChild){
        GAMEBOARD.removeChild(GAMEBOARD.lastElementChild);
    }
    for (var i = 0; i < this.board1.boardUi.length; i++){
        board1.boardUi[i].remove();
    }
    board1.boardUi = [];
    board1.board = [];
    board1.board = board1.createBoard();
    board1.score = 0;
    board1.updateScore();
    board1.boardUi = Array.from(document.querySelectorAll(".square"));
    console.log(board1.boardUi);
    board1.randomCell();
    board1.randomCell();
})
