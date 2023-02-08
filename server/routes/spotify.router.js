const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();
const SpotifyWebApi = require('spotify-web-api-node');
const { useSpotifyToken } = require('../modules/spotifyToken.js');

// Searches Spotify with API, returns search results of songs
router.get('/search', useSpotifyToken, (req, res) => {
  const searchQuery = req.query.searchQuery
  console.log('do we have a search query?', searchQuery);
  const token = req.token;
  console.log ('This is the token:', token)

  axios({
    url: `https://api.spotify.com/v1/search?q=${searchQuery}&type=track&market=US&limit=25`,
    method: 'GET',
    headers: {
      'Accept':'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
  }).then((response) => {
    res.send(response.data.tracks.items)
  }).catch((error) => {
    console.log('GET /api/spotify/search side fail:', error);
    res.sendStatus(500);
  });
  
})

// Get all liked songs from database for a specific user
router.get('/likes', useSpotifyToken, (req, res) => {
  console.log("user id is from:", req.query.userId);
  const token = req.token;

  let sqlQuery = `
  SELECT "song_id" FROM "liked_songs"
	JOIN "user"
		ON "user"."id" = "liked_songs"."user_id"
	WHERE "liked_songs"."user_id" = $1;
  `;

  pool.query(sqlQuery, [req.query.userId])
  .then(result => {
    
    // Turning song ids into a acceptable string query for Spotify API
    const likedSongsIdsQuery = result.rows.map(({song_id}) => song_id).join('%2C')
    
    console.log("GET - All songs ids:", likedSongsIdsQuery);

    axios({
      url: `https://api.spotify.com/v1/tracks?ids=${likedSongsIdsQuery}`,
      method: 'GET',
      headers: {
        'Accept':'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
    }).then((response) => {
      res.send(response.data.tracks)
    }).catch((error) => {
      console.log('GET /api/spotify/likes server side fail:', error);
      res.sendStatus(500);
    });
    
    
  }).catch(error => {
    console.log('ERROR in /api/spotify/likes GET route', error);
    res.sendStatus(500)
  })

});

// Adds liked song from client side to liked_songs database
router.post('/add_song', (req, res) => {
  const sqlQuery = `
    INSERT INTO "liked_songs" ("song_id", "user_id")
    VALUES ($1, $2)
  `;
  const sqlValues = [req.body.song_id, req.body.user_id];

  pool.query(sqlQuery, sqlValues)
    .then((result) => {
      console.log(`Added song into liked_songs`);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.error('Error POST /api/spotify', error);
      res.sendStatus(500); 
    })
});

module.exports = router;
