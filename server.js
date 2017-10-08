const express = require('express');
const ytdl = require('ytdl-core');

/** The maximum allowed length of a video. */
const MaxYouTubeLength = 60 * 15;

/** The port to run the express `app` on. */
const Port = process.env.PORT || 8080;
const app = express();

// Publish everything in the `public/` directory.
app.use(express.static('./public'));

// Proxy the song with the given id to the client (same-origin policy restricts this on the client).
app.get('/api/yt/song/:id', (req, res) => {
  ytdl.getInfo(req.params.id)
    .then((info) => {
      if (info.length_seconds > MaxYouTubeLength)
        return Promise.reject(new Error(`Length of video exceeds ${MaxYouTubeLength} seconds; too long.`));

      const format = ytdl.chooseFormat(info.formats, { filter: 'audioonly' });

      // Set the status to 200 and pipe the song back.
      if (format.type)
        res.type(format.type);

      res.status(200);
      ytdl.downloadFromInfo(info, { format: format }).pipe(res);
    })
    .catch((err) => res.status(500).send(err.toString()).end());
});

// And we're off to the internets!
app.listen(Port, (err) => {
  if (err)
    return console.log(err);
  console.log(`Listening on port ${Port}`);
});
