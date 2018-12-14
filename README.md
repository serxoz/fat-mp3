# fat-mp3

Play an MP3 from a file or directly from a HTTP stream through your speakers.

## Usage

```js
const fmp3 = require("fat-mp3");

// Play an MP3 from a file.
const filePlayer = new fmp3("test.mp3");
filePlayer.play();

// Pause it after ten seconds.
setTimeout(() => {
	player.pause();
}, 10000);

// Play an MP3 file over HTTP.
const hPlayer = new fmp3("http://somesite.com/test.mp3");
hPlayer.play();

```
