const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const gameOverMessage = document.querySelector('.game-over');
const restartButton = document.querySelector('.restart-button');

// Crie um novo objeto de áudio para o som de pulo
const jumpSound = new Audio('./sons/jump-up-245782.mp3');

// Crie um novo objeto de áudio para o som de game over
const gameOverSound = new Audio('./sons/smb_gameover.wav');

// Crie um novo objeto de áudio para a música de fundo
const backgroundMusic = new Audio('./sons/game-music-loop-6-144641.mp3');
backgroundMusic.loop = true; // Faz com que a música toque em loop

let gameRunning = true;

const jump = () => {
    // Reproduza o som de pulo
    jumpSound.play();
    
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

const gameOver = (pipePosition) => {
    // Pausa a música de fundo se estiver tocando
    if (!backgroundMusic.paused) {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0; // Reinicia a música para o começo
    }
    
    // Reproduza o som de game over
    gameOverSound.play();

    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = 'none';
    mario.style.bottom = `${pipePosition}px`;

    mario.src = './images/game-over.png';
    mario.style.width = '75px';
    mario.style.marginLeft = '50px';

    clearInterval(loop);

    gameOverMessage.style.display = 'block';
    restartButton.style.display = 'block';
    gameRunning = false; // Atualiza o estado do jogo
}

const resetGame = () => {
    // Reinicie o jogo
    pipe.style.animation = '';
    pipe.style.left = '';

    mario.style.animation = '';
    mario.style.bottom = '';

    mario.src = './images/mario.gif';
    mario.style.width = '';
    mario.style.marginLeft = '';

    gameOverMessage.style.display = 'none';
    restartButton.style.display = 'none';

    gameRunning = true; // Atualiza o estado do jogo
    startGameLoop();
}

const updateGame = () => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        gameOver(pipePosition);
    }
}

let loop;

const startGameLoop = () => {
    loop = setInterval(updateGame, 10);
}

// Adicione o evento para iniciar o jogo após a interação do usuário
document.addEventListener('keydown', (event) => {
    if (gameRunning && backgroundMusic.paused) {
        backgroundMusic.play();
    }
    if (gameRunning) {
        jump();
    }
});

restartButton.addEventListener('click', resetGame);

// Inicie o loop do jogo
startGameLoop();

