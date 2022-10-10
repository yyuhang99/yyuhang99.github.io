let squares = document.querySelectorAll(".square");
let match = document.querySelector(".match");
let startButton = document.querySelector(".start-button");
let scoreTracker = document.querySelector(".score");
let colors = {};
let remember = [];
let gameProgress = false;
let x;

let lives = 5;
let point = 0;
let score = 0;
let goal = 10;

function reverseBoardColors(){
    let arr = Array.from(squares);
    for(let i = 0; i < arr.length; i++){
        let element = arr[i];
        element.setAttribute("style", "white")
    }
}

function startGame(){
    setBoardColors(Array.from(squares));
    gameProgress = true;
};

function restart(){
    reverseBoardColors();
    remember = [];
    match.style.backgroundColor = "white";
    lives = 5;
    point = 0;
    startGame();
}

function gameOver(){
    gameProgress = false;
    lives = 5;
    point = 0;
    score = 0;
    reverseBoardColors();
    remember = [];
    match.style.backgroundColor = "white";
}

function randomColor(){
    let rnd = Math.floor(Math.random() * Object.keys(colors).length);
    return Object.keys(colors)[rnd];
};

function squareEvent(element){
    return function(){
        if (gameProgress && lives > 0 && point < 14){
            let index = Array.from(squares).indexOf(element);
            if (element.style.backgroundColor == ""){
                if (remember[index] == match.style.backgroundColor){
                    point++;
                    element.style.backgroundColor = remember[index];
                    console.log("Correct Guess! ",  point, " left!");
                }
                else{
                    lives--;
                    element.style.backgroundColor = remember[index];
                    console.log("Wrong Guess! ", lives, " lives left!");
                }
            }
            if(lives == 0){
                console.log("You are out of guesses! You Lose!");
                setTimeout(gameOver, 1000);
            } 
            
            if (point == goal){
                score++;
                scoreTracker.innerHTML = `Score: ${score}`;
                setTimeout(restart, 2000);
            }
        }
    }
}

function setEvent(){
    if (gameProgress){
        for(let i = 0; i < squares.length; i++){
            squares[i].addEventListener("click", squareEvent(squares[i]));
        }
    }
}

function setBoardColors(arr){
    colors = {
        "coral": goal,
        "lightblue": goal,
        "crimson": goal,
        "seagreen": goal,
        "yellow": goal,
    };

    match.style.backgroundColor = randomColor();

    for(let i = 0; i < arr.length; i++){
        let rndColor = randomColor();
        let element = arr[i];
        element.setAttribute("style", `background-color:${rndColor}`)
        colors[rndColor] -= 1;
        remember[i] = rndColor;

        if (colors[rndColor] == 0){
            delete colors[rndColor];
        }
    }

    setTimeout(reverseBoardColors, 3000);
    setTimeout(setEvent, 1000);
};


startButton.addEventListener("click", function(e){
    if (!gameProgress){
        startGame();
    }
});
