'use strict';

const judasEl = document.querySelector('.dialogue-judas');
const nameTagEl = document.querySelector('.name-tag');
const nextBtnEl = document.getElementById('next-btn');
const startBtnEl = document.getElementById('start-btn');
const dialogueBoxEl = document.querySelector('.dialogue')

const openDialogue = [
    "嗨，我看你好像很閒。",
    "要不要和我玩個遊戲？",    
    "這個遊戲叫做「豬」（Pig Game），是一種骰子遊戲。",
    "連續骰骰子，骰出的點數可以累計到積分",
    "不過骰到一的人就是豬，要換人骰哦！",
    "在變成豬以前選擇保留，把積分累計到總分去吧。",
    "最先得到總分一百的人得勝。",
    "如何？準備好開始了嗎？"
]

const closeDialogue_playerWin = [
    "呀，恭喜你勝利啊？",
    "勝利的滋味是不是特別愉快？嗯？",
    "要不要再來一局？這回沒那麼容易讓你獲勝哦。"
]

const closeDialogue_judasWin = [
    "怎麼樣？愉快嗎？",
    "成為輸家當豬的滋味特別愉快吧？",
    "要不要再來一局啊？抖M？",
]

const dialogueScreen = document.getElementById('dialogue-screen');
const gameScreen = document.getElementById('game-screen');

const sectionEl_player = document.querySelector('.player--0');
const sectionEl_judas = document.querySelector('.player--1');

const scoreEl_player = document.getElementById('score--0');
const scoreEl_judas = document.getElementById('score--1');

const currentScoreEl_player = document.getElementById('current--0');
const currentScoreEl_judas = document.getElementById('current--1');

const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');
const pigEl = document.querySelector('.pig');

const judasHead = document.querySelector('.judas-head');
const judasBubble = document.querySelector('.dialogue-bubble');

const currentPlayer = {
    player: "player",
    score: scoreEl_player,
    currentScore: currentScoreEl_player
};

const winnerScore = 100;

let playerScore = 0;
let judasScore = 0;
let currentScore = 0;
let dice = 0;
let judasRollCount = 0;

let currentLine = 0;
let currentDialogues;

judasEl.addEventListener('click', () => {
    startDialogue(openDialogue);
    judasEl.removeEventListener();
});


function startDialogue(dialogues){
    currentDialogues = dialogues;
    currentLine = 0;
    startBtnEl.classList.add('hidden');
    nextBtnEl.classList.remove('hidden');
    nameTagEl.classList.remove('hidden');
    dialogueBoxEl.classList.remove('hidden');
    loadLine();
}

function loadLine(){
    dialogueBoxEl.innerText = currentDialogues[currentLine];
    if(currentLine >= currentDialogues.length){
        dialogueBoxEl.innerText = "";
        nextBtnEl.classList.add('hidden');
        nameTagEl.classList.add('hidden');
        startBtnEl.classList.remove('hidden');
    }
}

nextBtnEl.addEventListener('click', () => {
    currentLine++;
     loadLine();
});

startBtnEl.addEventListener('click', () => {
    dialogueScreen.classList.add('up');
    initializeGame();
});

function initializeGame(){
    sectionEl_judas.classList.remove('player--winner');
    sectionEl_player.classList.remove('player--winner');
    judasHead.src = "judas-head-usual.png";
    scoreEl_player.innerText = 0;
    scoreEl_judas.innerText = 0;
    currentScore = 0;
    playerScore = 0;
    judasScore = 0;
    dice = 0;
    setPlayerToPlayer();
}

function setPlayerToPlayer(){
    currentPlayer.player = "player";
    currentPlayer.score = scoreEl_player;
    currentPlayer.currentScore = currentScoreEl_player;
    sectionEl_judas.classList.remove('player--active');
    sectionEl_player.classList.add('player--active');
    judasBubble.classList.add('hidden');
    pigEl.classList.add('hidden');
    diceEl.classList.add('hidden');
    rollBtn.classList.remove('hidden');
    holdBtn.classList.remove('hidden');
}

function setPlayerToJudas(){
    currentPlayer.player = "judas";
    currentPlayer.score = scoreEl_judas;
    currentPlayer.currentScore = currentScoreEl_judas;
    sectionEl_judas.classList.add('player--active');
    sectionEl_player.classList.remove('player--active');
    pigEl.classList.add('hidden');
    rollBtn.classList.add('hidden');
    holdBtn.classList.add('hidden');

    //judas start
    judasRollCount = Math.floor(Math.random() * 6) + 2;
    judasRollDice();
}

rollBtn.addEventListener('click', () => {
    rollDice();
});

function rollDice(){
    dice = Math.floor(Math.random() * 6) + 1;
    rollBtn.classList.add('hidden');
    holdBtn.classList.add('hidden');
    judasBubble.classList.add('hidden');
    judasHead.src = "judas-head-usual.png";
    pigEl.classList.add('hidden');
    diceEl.classList.remove('hidden');
    diceEl.classList.add('roll');
    setTimeout(showResult, 1000);
    setTimeout(checkResult, 1300);
}

function showResult(){
    diceEl.src = `diceRedAlt${dice}.png`;
}

function checkResult(){
    diceEl.classList.remove('roll');
    checkDice();
}

function checkDice(){
    if(dice != 1){
        currentScore += dice;
        currentPlayer.currentScore.innerText = currentScore;
        if(currentPlayer.player == "judas"){
            judasRollDice();
        }else{
            rollBtn.classList.remove('hidden');
            holdBtn.classList.remove('hidden');
        }
    }
    else{
        pigEl.classList.remove('hidden');
        currentScore = 0;
        currentPlayer.currentScore.innerText = 0;

        if(currentPlayer.player == "judas"){
            judasHead.src = "judas-head-lose.png";
            judasBubble.innerHTML = '嘖！';
        }

        setTimeout(switchPlayer, 1000);
    }
}

function switchPlayer(){
    if(currentPlayer.player == "player"){
        setPlayerToJudas();
    }
    else{
        judasRollCount = 0;
        setPlayerToPlayer();
    }
}

function judasRollDice(){

    const totalScore = judasScore + currentScore;

    if(judasRollCount > 0 && totalScore < 100){
        judasBubble.classList.remove('hidden');
        judasBubble.innerText = "擲骰！"
        judasHead.src = "judas-head-roll.png";
        judasRollCount--;
        setTimeout(rollDice, 1000);
    }
    else{
        judasHead.src = "judas-head-usual.png";
        judasBubble.classList.remove('hidden');
        judasBubble.innerText = "保留！"
        judasRollCount = 0;
        judasScore += currentScore;
        holdCurrentScore(judasScore);
    }
}

holdBtn.addEventListener('click', () => {
    playerScore += currentScore;
    holdCurrentScore(playerScore);
});

function holdCurrentScore(target){
    diceEl.classList.add('hidden');
    currentScore = 0;
    currentPlayer.currentScore.innerText = currentScore;
    runScore(currentPlayer.score, target);

    checkScore();
}

function runScore(element, target){
    const updateElement = () => {
        const current = +element.innerText;
        const increment = 1;
        if(current < target){
            element.innerText = `${Math.ceil(current + increment)}`;
            setTimeout(updateElement, 50);
        }else{
            element.innerText = target;
        }
    }
    updateElement();
}

function checkScore(){
    if(playerScore < winnerScore && judasScore < winnerScore){
        setTimeout(switchPlayer, 1000);
    }
    else if(playerScore >= winnerScore){
        sectionEl_player.classList.add('player--winner');
        judasHead.src = "judas-head-roll.png";
        judasBubble.classList.remove('hidden');
        judasBubble.innerText = "恭喜啊"
        endGame("player");

    }
    else if(judasScore >= winnerScore){
        sectionEl_judas.classList.add('player--winner');
        judasHead.src = "judas-head-win.png";
        judasBubble.classList.remove('hidden');
        judasBubble.innerText = "贏啦！"
        endGame("judas");
    }
}

function endGame(winner){
    rollBtn.classList.add('hidden');
    holdBtn.classList.add('hidden');
    setTimeout(showEndDialogue, 3000, winner);
}

function showEndDialogue(winner){
    dialogueScreen.classList.remove('up');
    startBtnEl.innerText = "再玩一次";
    const dialogue = winner == "player" ? closeDialogue_playerWin : closeDialogue_judasWin;
    startDialogue(dialogue);
}