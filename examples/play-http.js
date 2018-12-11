const fmp3 = require("../index.js");

const player = new fmp3("http://k007.kiwi6.com/hotlink/p1924y0omx/Souriez_Quand_les_oiseaux_chantent_.mp3");
player.startBuffering();
player.play();

setTimeout(()=>{
	console.log("Pause");
	player.pause();
}, 10000);

setTimeout(()=>{
	console.log("Play");
	player.play();
}, 20000);