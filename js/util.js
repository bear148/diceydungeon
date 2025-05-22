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

export function getRandomArmorImage() {
	const armor = Array.from({ length: 30 }, (_, i) => `/assets/armor/armor${i + 1}.png`);

	return armor[Math.floor(Math.random() * armor.length)];
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

export function contentGenerator(item) {
	return `

`;
}

export function RNG(chance) {
	return (getRandomInt(0, 101) <= chance);
}