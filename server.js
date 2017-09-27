const express = require('express');
const expressFileUpload = require('express-fileupload');

const getPCMData = require('./lib/getPCMData.js');
const getYouTubeSong = require('./lib/getYouTubeSong.js');

const port = 8080;
const app = express();

// Publish everything in the `public/` directory.
app.use(express.static('./public'));

// Handle file uploads using `express-fileupload`.
app.use(expressFileUpload());

/**
 * A small utility to respond with raw PCM.
 * @param {Response} res - The express.js response object for the request.
 * @param {number[]} pcm - The PCM to respond with.
 * @returns {void}
 */
function respondPCM(res, pcm) {
  res.set('Content-Type', 'application/octet-stream');
  res.send(pcm);
}

app.get('/api/pcm/yt/:id', (req, res) => {
  // Get the song, turn it into raw PCM, and send it back to the client.
  getYouTubeSong(req.params.id)
    .then((song) => getPCMData(song.stream))
    .then((pcm) => respondPCM(res, pcm))
    .catch((err) => res.status(500).send(err));
});

app.get('/api/pcm/upload', (req, res) => {
  // Make sure there's a song file that's been uploaded.
  if (!req.files || !req.files.song)
    return res.status(400).send('Expecting upload.');
  
  // Get the PCM data from the song and send it back.
  getPCMData(req.files.song.data)
    .then((pcm) => respondPCM(res, pcm))
    .catch((err) => res.status(500).send(err));
});

// And we're off to the internets!
app.listen(port, (err) => {
  if (err)
    return console.log(err);

  console.log(`Listening on port ${port}`);
});
