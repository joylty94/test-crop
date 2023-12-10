const decomposeHangul = (char) => {
	const baseCode = char.charCodeAt(0) - 0xac00;
	const jongseongBase = 28;
	const jungseongBase = 21;

	const jongseong = baseCode % jongseongBase;
	const jungseong = ((baseCode - jongseong) / jongseongBase) % jungseongBase;
	const choseong =
		((baseCode - jongseong) / jongseongBase - jungseong) / jungseongBase;

	return [choseong, jungseong, jongseong];
};

const compareHangul = (char1, char2) => {
	console.log(char1, char2);
	const [choseong1, jungseong1, jongseong1] = decomposeHangul(char1);
	const [choseong2, jungseong2, jongseong2] = decomposeHangul(char2);
	console.log(choseong1, jungseong1, jongseong1);
	console.log(choseong2, jungseong2, jongseong2);

	// if (choseong1 && choseong2) {
	// 	return choseong1 !== choseong2;
	// }
	if (choseong1 === -53) {
		return false;
	}
	if (jongseong1 && (jongseong2 || jongseong2 === 0)) {
		console.log(jongseong1, jongseong2);
		return jongseong1 !== jongseong2;
	}
	if ((jungseong1 || jungseong1 === 0) && (jungseong2 || jungseong2 === 0)) {
		return jungseong1 !== jungseong2;
	}
};
