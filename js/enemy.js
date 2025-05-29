import { PLAYER } from "./game.js";
import { getRandomInt } from "./util.js";

export class Enemy {
    constructor(name, health, attack, defense, speed, image, xp, boss=false, flip=true ) {
        this.startingHealth = health;
        this.startingAttack = attack;
        this.startingDefense = defense;

        this.name = name;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
        this.speed = speed;
        this.image = image;
        this.xp = xp;
        this.boss = boss;
        this.flip = flip;
    }
    
    createEnemy() {
        this.element = document.getElementById("enemy-sprite-container")
        this.health = this.startingHealth;
        this.health = this.health + (PLAYER.level * 10);

        this.attack = (this.attack >= 1800) ? 1800 : this.startingAttack + (PLAYER.level * 2);
        this.defense = this.startingDefense + (PLAYER.level * 2);
        
        this.element.innerHTML = '';

        if (this.flip) {
            this.element.innerHTML += `<img src="${this.image}" alt="${this.name}" class="flip">`;
        } else {
            this.element.innerHTML += `<img src="${this.image}" alt="${this.name}">`;
        }

        if (!this.boss) {
            this.element.innerHTML += `
                <div class="enemy-info">
                    <h3>${this.name}</h3>
                    <p>Health: <span class="health">${this.health}</span></p>
                    <p>Attack: ${this.attack}</p>
                    <p>Defense: ${this.defense}</p>
                    <p>Speed: ${this.speed}</p>
                </div>
            `;
        } else {
            this.element.innerHTML += `
                <div class="enemy-info">
                    <h3><span class="boss">BOSS</span> ${this.name}</h3>
                    <p>Health: <span class="health">${this.health}</span></p>
                    <p>Attack: ${this.attack}</p>
                    <p>Defense: ${this.defense}</p>
                    <p>Speed: ${this.speed}</p>
                </div>
            `;
        }
    }

    attackEnemy(target) {
        let damage = getRandomInt(0, this.attack - (target.defense * 0.1));

        if (damage < 0) {
            damage = 0;
        }
        
        target.health -= (damage);
        document.getElementById("health").innerText = target.health;

        return damage;
    }

    takeDamage(damage) {
        if (this.health <= 0) {
            return;
        }

        this.health -= (damage - this.defense);

        document.querySelector(".health").innerText = this.health;

        if (this.health < 0) {
            this.health = 0;
        }
    }

    isDead() {
        return this.health <= 0;
    }
}