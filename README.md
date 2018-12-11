# fat-mp3

Play an MP3 from a file or directly from a HTTP stream through your speakers.

## Usage

```js
const fmp3 = require("../index.js");

const filePlayer = new fmp3("test.mp3");
filePlayer.startBuffering();
filePlayer.play();

setTimeout(()=>{
	player.pause();
}, 10000);

const hPlayer = new fmp3("http://somesite.com/test.mp3");
hPlayer.startBuffering();
hPlayer.play();

```