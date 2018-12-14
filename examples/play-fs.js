const fmp3 = require("../index.js");

const player = new fmp3("test.mp3");
player.play();

setTimeout(()=>{
	console.log("Pause");
	player.pause();
}, 10000);

setTimeout(()=>{
	console.log("Play");
	player.play();
}, 20000);
