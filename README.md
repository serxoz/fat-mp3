# fat-mp3

Play an MP3 from a file or directly from a HTTP stream through your speakers.

## Basic usage

```js
const fmp3 = require("fat-mp3");

// Play an MP3 from a file.
const filePlayer = new fmp3("test.mp3");
filePlayer.play();

// Pause it after ten seconds.
setTimeout(() => {
	player.pause(() => {
		console.log("Pause complete callback fired!");
	});
}, 10000);

// Play an MP3 file over HTTP.
const hPlayer = new fmp3("http://somesite.com/test.mp3");
hPlayer.play();

```

### More detailed features

#### Begin buffering over HTTP in the background before playing

```js
const fmp3 = require("fat-mp3");
const hPlayer = new fmp3("http://somesite.com/test.mp3");
hPlayer.on("error", (err) => {
	console.log("An error occurred.");
	console.error(err);
});
hPlayer.startBuffering();

// Let the player buffer for thirty seconds before playback begins.
setTimeout(() => {
	hPlayer.play();
}, 30000);
```
