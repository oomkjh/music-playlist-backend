const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let songs = [
  { id: 1, title: "Shut Up and Dance", artist: "WALK THE MOON" },
  { id: 2, title: "Cough Syrup", artist: "Young the Giant" },
  { id: 3, title: "Pumped Up Kicks", artist: "Foster The People" },
];

let playlists = [];

app.get("/api/songs", (req, res) => res.json(songs));

app.get("/api/playlists", (req, res) => res.json(playlists));

app.post("/api/playlists", (req, res) => {
  const { name } = req.body;
  const newPlaylist = { id: Date.now(), name, songs: [] };
  playlists.push(newPlaylist);
  res.status(201).json(newPlaylist);
});

app.post("/api/playlists/:id/songs", (req, res) => {
  const { songId } = req.body;
  console.log("playlists", playlists);

  const playlist = playlists.find((p) => p.id == req.params.id);
  const song = songs.find((s) => s.id == songId);
  if (playlist && song) {
    playlist.songs.push(song);
    res.json(playlist);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

app.delete("/api/playlists/:id/songs/:songId", (req, res) => {
  const playlist = playlists.find((p) => p.id == req.params.id);
  if (playlist) {
    playlist.songs = playlist.songs.filter((s) => s.id != req.params.songId);
    res.json(playlist);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
