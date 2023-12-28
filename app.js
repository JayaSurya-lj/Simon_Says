//key press then start game -> level = 1 then button flash
// gameseq[] and userseq[]
// -> check if userseq and gameseq equal
let gameSeq = []
let userSeq = []

let btns = ["red","yellow","blue","green"];

let highScore = 0;

let started = false;
let level = 0;

let h2 = document.querySelector('h2');
let h3 = document.querySelector('h3');

document.addEventListener("keypress",function(){
    if(started==false)
    {
        console.log("Game Started");
        started = true;
        levelUp();
    }
    
});
function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}
function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250);
}
function levelUp(){
    userSeq = [];
    level++;
    if(highScore<level) highScore = level;
    h2.innerText = `Level ${level}`;
    //random button selection
    let randIdx = Math.floor(Math.random()*4);
    if(randIdx==4) randIdx--;
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`#${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randBtn);
}
function checkAns(idx){
    // console.log("curr level : ",level);
    if(userSeq[idx]==gameSeq[idx])
    {
        // console.log("Same Value");
        if(gameSeq.length==userSeq.length)
        {
            setTimeout(levelUp,100);
        }
    }
    else
    {
        h3.innerHTML = `Your HighScore is <b>${highScore}</b> <br></br>`;
        h2.innerHTML = `Game Over! Your Score is <b>${level}</b> <br> Press Any Key to Start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        reset();
    }
}
function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
function btnPress(){
    // console.log(this);
    let btn = this;
    userFlash(btn);
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}
let atllBtns = document.querySelectorAll('.btn');
for(btn of atllBtns){
    btn.addEventListener("click",btnPress);
}
