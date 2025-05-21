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