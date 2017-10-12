import { EventEmitter } from 'events';

import detectBPM from './detectBPM';

export default class Song extends EventEmitter {
  constructor() {
    super();

    this.context = new AudioContext();
    this.pcm = null;
    this.bpm = -1;

    this.ready = false;
    this.status = '';
  }

  _updateStatus(newStatus, ready = false) {
    this.ready = ready;
    this.status = newStatus;
    this.emit('progress', newStatus, ready);
  }

  processSong(inputType, inputData) {
    this._updateStatus('Resolving song data from input');

    return Song.audioDataFromInput(inputType, inputData)
      .then((songData) => {
        this._updateStatus('Getting PCM of song data');
        return this.decodeAudioData(songData);
      })
      .then((pcmData) => {
        this.pcm = pcmData;
        this._updateStatus('Getting BPM of song');
        return detectBPM(pcmData);
      })
      .then((bpm) => {
        this.bpm = bpm;
        this._updateStatus('Analyzing beats');
        // TODO:
      })
      .then(() => {
        this._updateStatus('Done', true);
      });
  }

  static audioDataFromInput(inputType, inputData) {
    return new Promise((resolve, reject) => {
      switch (inputType) {
        case 'YouTube': {
          fetch('/api/yt/song/' + encodeURIComponent(inputData))
            .then((resp) => resp.arrayBuffer())
            .then((data) => resolve(data));
          return;
        }

        case 'File': {
          const reader = new FileReader();
          reader.addEventListener('load', () => resolve(reader.result));
          reader.readAsArrayBuffer(inputData);
          return;
        }

        case 'URL': {
          // This requires basically proxying _any_ connection, a security concern that needs to be dealt with in a more
          // obvious way/ways (i.e. a setting on the server that turns it on/off, checking responses to be valid audio)
          reject('URL is not currently supported');
          return;
        }
      }
    });
  }

  decodeAudioData(audioData) {
    return new Promise((resolve, reject) => {
      this.context.decodeAudioData(audioData, (data) => {
        resolve(data);
      });
    });
  }
}
