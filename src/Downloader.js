const { METHODS, _METHODS } = require('./methods.js');

class Downloader {
  constructor({ output, spotifyURI, spotifyToken, threads, method }) {
    this._output = output ? output : null;
    this._spotifyURI = spotifyURI ? spotifyURI : null;
    this._spotifyToken = spotifyToken ? spotifyToken : null;
    this.threads(threads);
    this.method(method);
  }
  /**
  * Set the Output path
  * @param {?string} outputPath - Set folder path of output, or use null to recieve buffers in output
  */
  output(outputPath) {
    this._output = outputPath;
    return this;
  }
  /**
  * Set the spotify URI of item to download
  * @param {string} uri - URI of item to download must be in format "spotify:type:id"
  */
  spotifyURI(uri) {
    this._spotifyURI = uri;
    return this;
  }
  /**
  * Set your spotify web API token
  * @param {string} token - Spotify web API token
  */
  spotifyToken(token) {
    this._spotifyToken = token;
    return this;
  }
  /**
  * Set number of concurrent downloads
  * @param {number} count - Number of threads to concurrently be used
  */
  threads(count) {
    let nThreads = parseInt(count);
    this._threads = isNaN(nThreads) ? 5 : nThreads;
    return this;
  }
  /**
  * Set start method
  * @param {METHODS} method - Method to use
  */
  method(method) {
    this._method = (method in METHODS) ? method : METHODS.DOWNLOAD;
    return this;
  }
  serialize() {
    return {
      output: this._output,
      spotifyURI: this._spotifyURI,
      spotifyToken: this._spotifyToken,
      threads: this._threads,
    };
  }
  /**
  * Start the set method
  * @returns {Promise} Promise that resolves all tracks when they have finished
  */
  start() {
    return _METHODS[this._method](this.serialize());
  }
}

module.exports = {
  Downloader: Downloader,
  METHODS: METHODS
};
