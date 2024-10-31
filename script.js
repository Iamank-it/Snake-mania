const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");

// Responsive canvas size
canvas.width = 400;
canvas.height = 400;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;

// Snake variables
let snakeX, snakeY, xVelocity, yVelocity, snakeParts, tailLength;

// Apple variables
let appleX, appleY;

// Score variable
let score;

// Game loop control
let gameInterval;

function initializeGame() {
  snakeX = 10;
  snakeY = 10;
  xVelocity = 0;
  yVelocity = 0;
  snakeParts = [];
  tailLength = 2;

  appleX = Math.floor(Math.random() * tileCount);
  appleY = Math.floor(Math.random() * tileCount);

  score = 0;
  scoreDisplay.textContent = score;

  // Start the game loop
  gameInterval = setInterval(drawGame, 100);
}

function drawGame() {
  changeSnakePosition();
  let isGameOver = checkGameOver();
  if (isGameOver) return;

  clearScreen();
  drawApple();
  drawSnake();

  if (snakeX === appleX && snakeY === appleY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
    scoreDisplay.textContent = score;
  }
}

function clearScreen() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = "lightgreen";
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }

  snakeParts.push({ x: snakeX, y: snakeY });
  while (snakeParts.length > tailLength) {
    snakeParts.shift();
  }

  ctx.fillStyle = "green";
  ctx.fillRect(snakeX * tileCount, snakeY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
  snakeX += xVelocity;
  snakeY += yVelocity;
}

function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkGameOver() {
  let gameOver = false;

  if (xVelocity === 0 && yVelocity === 0) return false;

  // Wall collision
  if (snakeX < 0 || snakeX >= tileCount || snakeY < 0 || snakeY >= tileCount) {
    gameOver = true;
  }

  // Self-collision
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    if (part.x === snakeX && part.y === snakeY) {
      gameOver = true;
      break;
    }
  }

  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "50px Verdana";
    ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
    clearInterval(gameInterval); // Stop the game loop
  }

  return gameOver;
}

// Restart game function
function restartGame() {
  clearInterval(gameInterval); // Stop the current game loop
  initializeGame(); // Reinitialize game variables and start a new game loop
}

// Control snake
document.body.addEventListener("keydown", event => {
  switch (event.keyCode) {
    case 38:
      if (yVelocity === 0) {
        yVelocity = -1;
        xVelocity = 0;
      }
      break;
    case 40:
      if (yVelocity === 0) {
        yVelocity = 1;
        xVelocity = 0;
      }
      break;
    case 37:
      if (xVelocity === 0) {
        xVelocity = -1;
        yVelocity = 0;
      }
      break;
    case 39:
      if (xVelocity === 0) {
        xVelocity = 1;
        yVelocity = 0;
      }
      break;
  }
});

initializeGame(); // Start the game when the page loads
