import { Game } from './game.js';

document.getElementById("startGame").addEventListener('click', () => {
    console.log("Start Game");
    new Game();
});