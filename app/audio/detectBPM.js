// Adapted to fit this project from José M. Pérez:
// https://jmperezperez.com/bpm-detection-javascript/

const OfflineAudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;

function detectPeaks(data) {
  const partSize = data.sampleRate/2;
  const numParts = data.length/partSize;
  const channels = new Array(data.numberOfChannels);
  let peaks = new Array(Math.floor(numParts));

  for (let i = 0; i < channels.length; i++)
    channels[i] = data.getChannelData(i);

  for (let i = 0; i < numParts; i++) {
    const max = {
      position: i * partSize,
      volume: 0
    };

    for (let j = i * partSize; j < (i + 1) * partSize; j++) {
      const volume = data.numberOfChannels === 2
        ? Math.max(Math.abs(channels[0][j]), Math.abs(channels[1][j]))
        : Math.abs(channels[0][j]);

      if (volume > max.volume) {
        max.position = j;
        max.volume = volume;
      }
    }

    peaks[i] = max;
  }

  peaks.sort((a, b) => b.volume - a.volume);
  peaks = peaks.splice(0, peaks.length / 2);
  peaks.sort((a, b) => a.position - b.position);

  return peaks;
}

function groupPeaksByInterval(peaks, sampleRate) {
  const groups = [];

  peaks.forEach((peak, index) => {
    for (let i = 1; (index + i) < peaks.length && i < 6; i++) {
      let tempo = (60 * sampleRate) / (peaks[index + i].position - peak.position);

      while (tempo < 60)
        tempo *= 2;
      while (tempo > 180)
        tempo /= 2;

      tempo = Math.round(tempo);

      const existingGroup = groups.find((group) => group.tempo === tempo);

      if (existingGroup !== undefined) {
        existingGroup.count += 1;
      } else {
        groups.push({
          tempo,
          count: 1
        });
      }
    }
  });

  return groups;
}

function chooseBPM(intervals) {
  return Math.round(intervals.sort((a, b) => b.count - a.count)[0].tempo);
}

function detectOffset(peaks, sampleRate, bpm) {
  return (peaks[0].position / sampleRate) % (60 / bpm);
}

export default function detectBPM(audioBuffer) {
  return new Promise((resolve, reject) => {
    const context = new OfflineAudioContext(
      audioBuffer.numberOfChannels,
      audioBuffer.length,
      audioBuffer.sampleRate
    );

    // Make the input audio buffer a source
    const source = context.createBufferSource();
    source.buffer = audioBuffer;

    const lowpass = context.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = 150;
    lowpass.Q.value = 1;
    source.connect(lowpass);

    const highpass = context.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.value = 100;
    highpass.Q.value = 1;
    lowpass.connect(highpass);
    highpass.connect(context.destination);

    context.oncomplete = (event) => {
      const peaks = detectPeaks(event.renderedBuffer, audioBuffer.sampleRate);
      const intervals = groupPeaksByInterval(peaks, audioBuffer.sampleRate);
      const bpm = chooseBPM(intervals);
      const offset = detectOffset(peaks, audioBuffer.sampleRate, bpm);

      resolve({
        bpm,
        offset
      });
    };

    source.start(0);
    context.startRendering();
  });
}
