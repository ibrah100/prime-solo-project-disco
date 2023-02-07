const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();
const SpotifyWebApi = require('spotify-web-api-node');
const { useSpotifyToken } = require('../modules/spotifyToken.js');


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

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
  console.log("This is the song you liked from post", req.body);
  
});

module.exports = router;
