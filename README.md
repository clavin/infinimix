# Infinimix
Infinimix (possibly inaptly named) is a fun side-project created simply for entertainment purposes.

Infinimix works by:
1. Getting a song from a user by some medium, and file upload, URL, and YouTube are all *implemented*
   and server-configurable mediums of song retrieval.
2. Once the audio is recieved and normalized to its PCM, beat detection is done to split up the audio into chunks (even
   if the audio isn't a song).
3. Each beat is then compared to every other beat for simliarity.
4. The most similar beats are then 'linked' together, so when they're played back they have a chance to jump to
   eachother, effectively remixing the song.

The project was inspired by the wonderful [Eternal Jukebox](https://eternal.abimon.org/), where the implementation is
better and restrictions are harsher (only Spotify's library is available, as the app builds off info that Spotify's API
provides).

## The Technical Details
Infinimix is made with a bunch of my favorite technologies:
* [TypeScript](https://www.typescriptlang.org/)
* [React](https://reactjs.org/)
* [webpack](https://webpack.js.org/)
* The web. (Thanks browsers. And old web engineers. And other people.)
* The [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API).

There's more to it (mostly linting and some libraries for the aforementioned), but those are the major ones.

Oh yeah, and I like to follow [gitmoji](https://gitmoji.carloscuesta.me/) for no real reason.

## In Development
Currently, the application is in development. As of this README going up, the commits previous to this one were of a
protoype version of Infinimix. Hereforth (maybe excluding the actual audio player components), all is past prototyping.

As such, I feel it would be helpful to roadmap what needs to be done, if not for any other reason than to keep myself
productive.

### Roadmap
* [x] Redo the whole repository to support TypeScript.
* [ ] Flowchart the whole application flow.
  * I feel it becomes simply a matter of sitting down and implementing once all the details are figured out. A flowchart
    is an amazing way to get those nitty-gritty details resolved so the journey of implementation is smooth sailing.
* [x] Reimplement the server, similar to the prototype, but a bit more modularly for testing reasons.
* [ ] Add test code for server functions.
* [ ] Reimplement the UI similar to the prototype, up to the internals of audio processing (therefore before creating
  the player implementation).
* [ ] Reimplement various audio processing internals:
  * [ ] Audio resolution (popular formats to PCM) regardless of input medium
  * [ ] Beat detection
  * [ ] Beat comparison
  * [ ] Tests (probably utilizing server internals)
* [ ] Create and implement an algorithm to jump between similar beats (and, in that, also *choose* what beats are
  considered similar enough to jump between)
  * Most of this will probably be down to some fun statistics that are done on each song, where the actual values (like
    *how* similar beats have to be) are based on normalized values, and therefore vary between songs.
* [ ] Create and implement a stunning audio player to play the song with the jumps applied, including some way of
  adjusting the values that dictate jumps and audio controls.
* [ ] Celebrate having made something pretty cool. 🎉
* [ ] Probably write more tests.
* [ ] Party once more, simply for having implemented more tests. 🎉
