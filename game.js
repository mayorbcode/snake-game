import { SNAKE_SPEED, updateSnake, drawSnake, getSnakeHead, snakeIntersection } from './snake.js';
import { updateFood, drawFood } from './food.js';
import { outsideGrid } from './grid.js';

const gameBoard = document.querySelector('#game-board');

let lastRenderTime = 0;
let gameOver = false;

// set up game loop
const main = (currentTime) => {
  if (gameOver === true) {
    if (confirm('You lost, Press ok to restart.')) {
      window.location = '/'
    }
    return 
  }

  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
  
  // console.log('Render');
  lastRenderTime = currentTime;

  update();
  draw();
} 

window.requestAnimationFrame(main);

function update() {
  updateSnake();
  updateFood();
  checkDeath();
}

function draw() {
  gameBoard.innerHTML = '';
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}


