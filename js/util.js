import { ARMOR_TYPE } from "./enums.js";
import { PLAYER } from "./game.js";

const tooltip = document.getElementById("tooltip");

export function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
}

export function getRandomWeaponImage() {
	const weapons = [
		"assets/weapons/club.png",
		"/assets/weapons/dagger.png",
		"/assets/weapons/greatsword1.png",
		"/assets/weapons/greatsword2.png",
		"/assets/weapons/knife.png",
		"/assets/weapons/short_sword1.png",
		"/assets/weapons/short_sword2.png",
	];

	return weapons[Math.floor(Math.random() * weapons.length)];
}

export function getRandomSpellImage() {
	const spells = [
		"/assets/spells/scroll1.png",
		"/assets/spells/scroll2.png",
		"/assets/spells/scroll3.png",
		"/assets/spells/scroll4.png",
		"/assets/spells/scroll5.png",
		"/assets/spells/scroll6.png",
		"/assets/spells/scroll7.png",
		"/assets/spells/scroll8.png",
	];

	return spells[Math.floor(Math.random() * spells.length)];
}

export function getRandomSpellName() {
	const spellNames = [
		"Fireball",
		"Ice Spike",
		"Lightning Bolt",
		"Earthquake",
		"Wind Slash",
		"Water Wave",
		"Shadow Strike",
		"Arcane Blast",
	];

	return spellNames[Math.floor(Math.random() * spellNames.length)];
}

export function getRandomArmorType() {
	const types = [
		ARMOR_TYPE.head,
		ARMOR_TYPE.chest,
		ARMOR_TYPE.boots,
		ARMOR_TYPE.gloves,
	];

	return types[Math.floor(Math.random() * types.length)];
}

export function getRandomArmorImage(type) {
	switch (type) {
		case ARMOR_TYPE.head:
			const head = Array.from({ length: 7 }, (_, i) => `/assets/armor/head${i + 1}.png`);
			return head[Math.floor(Math.random() * head.length)];
		case ARMOR_TYPE.chest:
			const chest = Array.from({ length: 12 }, (_, i) => `/assets/armor/chest${i + 1}.png`);
			return chest[Math.floor(Math.random() * chest.length)];
		case ARMOR_TYPE.boots:
			const boots = Array.from({ length: 4 }, (_, i) => `/assets/armor/boots${i + 1}.png`);
			return boots[Math.floor(Math.random() * boots.length)];
		case ARMOR_TYPE.gloves:
			const gloves = Array.from({ length: 4 }, (_, i) => `/assets/armor/gloves${i + 1}.png`);
			return gloves[Math.floor(Math.random() * gloves.length)];
		default:
			return "/assets/err.png";
	}
}

export function getRandomBookImage() {
	let books = Array.from({ length: 61 }, (_, i) => `/assets/books/book${i + 1}.png`);
	return books[Math.floor(Math.random() * books.length)];
}

export function showTooltip(content, x, y) {
	tooltip.innerHTML = content;
    tooltip.style.left = x + 10 + "px";
    tooltip.style.top = y + 10 + "px";
	tooltip.classList.remove("hidden");
}

export function hideTooltip() {
	tooltip.classList.add("hidden");
}

export function RNG(chance) {
	return (getRandomInt(0, 101) <= chance);
}

export function formalArmorName(type) {
	switch (type) {
		case ARMOR_TYPE.head:
			return "Head";
		case ARMOR_TYPE.chest:
			return "Chest";
		case ARMOR_TYPE.boots:
			return "Boots";
		case ARMOR_TYPE.gloves:
			return "Gloves";
		default:
			return "Unknown";
	}
}

export function	refreshPlayerStats() {
	document.getElementById("hlth").innerText = PLAYER.health;
	document.getElementById("def").innerText = PLAYER.defense;
	document.getElementById("atk").innerText = PLAYER.attack;
	document.getElementById("xp").innerText = PLAYER.xp;
	document.getElementById("lvl").innerText = PLAYER.level;
	document.getElementById("hlth").innerText = PLAYER.health;
	document.getElementById("gold").innerText = PLAYER.coins;
	document.getElementById("attack").innerText = PLAYER.attack;
	document.getElementById("defense").innerText = PLAYER.defense;
	document.getElementById("health").innerText = PLAYER.health;
}

export function updateAllCoinCounters() {
	document.getElementById("gold").innerText = PLAYER.coins;
	document.getElementById("store-coins").innerText = PLAYER.coins;
}