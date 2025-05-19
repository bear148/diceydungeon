import { Game } from './game.js';

let game;

document.getElementById("startGame").addEventListener('click', () => {
    console.log("Start Game");
    game = new Game();
});