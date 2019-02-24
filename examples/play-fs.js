const fmp3 = require("../index.js");

const player = new fmp3("test.mp3");

setTimeout(() => {
	player.setVolume(0.5);
}, 2000);

player.on("end", () => {
	console.log("Playback finished.");
});
player.play();

