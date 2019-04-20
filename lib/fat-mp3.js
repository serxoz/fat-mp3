const lame = require("lame");
const speaker = require("speaker");
const request = require("request");
const fs = require("fs");
const volume = require("pcm-volume");

const FAT_URI_TYPE_FILE = 0x0;
const FAT_URI_TYPE_HTTP = 0x1;

class FatMp3
{

	/**
	 * @param {String} uri The uri to the MP3.
	 */
	constructor(uri) {
		if (typeof uri === "undefined")
			throw("No uri defined for FatMp3 constructor.");

		this.uri = uri;
		this._uriType = this._guessUriType(uri);
		this._volume = new volume();
		this._lame = new lame.Decoder();
		this._speaker = null;
		this._ioStream = null;
		this._speakerStream = null;
		this._pauseLock = false;
		this._events = {};
	}

	/**
	 * Hooks an event to a callback.
	 * @param {String} event The event string.
	 * @param {Function} callback The callback function.
	 * @return {Void}
	 */
	on(event, callback) {
		if (! this._events.hasOwnProperty(event))
			this._events[event] = [];

		this._events[event].push(callback);
	}

	/**
	 * Determines the uri type based on the file name.
	 * @param {String} uri The uri string.
	 * @return {Number} The constant number representation of the uri type.
	 */
	_guessUriType(uri) {
		if (uri.length < 4)
			return FAT_URI_TYPE_FILE;

		return (uri.substr(0,4) == "http") ? FAT_URI_TYPE_HTTP : FAT_URI_TYPE_FILE;
	}

	/**
	 * Starts the buffer being filled and decoded.
	 * @return {Void}
	 */
	startBuffering() {
		switch (this._uriType) {
			case FAT_URI_TYPE_FILE:
				this._ioStream = fs.createReadStream(this.uri).pipe(this._lame)
					.pipe(this._volume);
				break;
			case FAT_URI_TYPE_HTTP:
				this._ioStream = request(this.uri)
					.on("error", this._onStreamError.bind(this))
					.pipe(this._lame).pipe(this._volume);
				break;
		}

		this._ioStream.on("end", () => {
			if (this._events.hasOwnProperty("end"))
				for (let f of this._events.end)
					f();
		});
	}

	/**
	 * Triggered when a HTTP request error occurs.
	 * @param {Error} err The error object form request.
	 * @return {Void}
	 */
	_onStreamError(err) {
		console.log("ERROR");
		process.exit(0);
		if (this._events.hasOwnProperty("error"))
			for (let f of this._events.error)
				f(err);
	}

	/**
	 * Plays the audio stream.
	 * @return {Void}
	 */
	play() {
		if (this._speaker)
			return;

		if (! this._ioStream)
			this.startBuffering();

		this._speaker = new speaker();
		this._ioStream.pipe(this._speaker);
	}

	/**
	 * Pauses the current audio stream.
	 * @param {Function} callback The function to call once playback is paused.
	 * @return {Void}
	 */
	pause(callback) {
		if (! this._speaker || this._pauseLock)
			return;

		this._pauseLock = true;
		this._ioStream.unpipe(this._speaker);
		setTimeout(() => {
			this._speaker.close();
			this._speaker = null;
			this._pauseLock = false;
			if (typeof callback === "function")
				callback();
		}, 501);
	}

	/**
	 * Set the current stream audio level.
	 * @param {Flaot} level The audio level for playback (0.0 - 1.0).
	 * @return {Void}
	 */
	setVolume(level) {
		if (level < 0)
			level = 0;

		if (level > 1)
			level = 1;

		this._volume.setVolume(level);
	}

};

module.exports = FatMp3;
