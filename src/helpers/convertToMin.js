
const addZero = (n) => {
	if (n < 10) return "0" + n;
	 else return "" + n;
}

export const convertMstoMin = (ms) => {
	const min = parseInt(ms / 1000 / 60);
	ms -= min * 60 * 1000;
	const sec = (ms / 1000);
	return `${addZero(min)}:${addZero(sec.toFixed(0))}`;
};