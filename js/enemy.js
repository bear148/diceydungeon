export class Enemy {
    constructor(name, health, attack, defense, speed, image, boss=false) {
        this.name = name;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
        this.speed = speed;
        this.image = image;
        this.boss = boss;
    }
    
    createEnemy() {
        this.element = document.getElementById("enemy-sprite-container")
        
        this.element.innerHTML = '';

        if (!this.boss) {
            this.element.innerHTML = `
                <img src="${this.image}" alt="${this.name}">
                <div class="enemy-info">
                    <h3>${this.name}</h3>
                    <p>Health: <span class="health">${this.health}</span></p>
                    <p>Attack: ${this.attack}</p>
                    <p>Defense: ${this.defense}</p>
                    <p>Speed: ${this.speed}</p>
                </div>
            `;
        } else {
            this.element.innerHTML = `
                <img src="${this.image}" alt="${this.name}">
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
        let damage = Math.max(0, this.attack - target.defense);

        console.log(`${this.name} attacks ${target.name} for ${damage} damage!`);
        target.health -= (damage - target.defense);
        document.getElementById("health").innerText = target.health;

        if (target.health <= 0) {
            return false;
        }

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