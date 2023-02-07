const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();
const SpotifyWebApi = require('spotify-web-api-node');
const { useSpotifyToken } = require('../modules/spotifyToken.js');

// // Spotify API credentials
// const client_id = process.env.SPOTIFY_CLIENT_ID;
// const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

// // Create the api object with the credentials
// var spotifyApi = new SpotifyWebApi({
//   clientId: client_id,
//   clientSecret: client_secret
// });

// Retrieve an access token.
// spotifyApi.clientCredentialsGrant().then(
//   function(data) {
//     console.log('The access token expires in ' + data.body['expires_in']);
//     console.log('The access token is ' + data.body['access_token']);

//     // Save the access token so that it's used in future calls
//     spotifyApi.setAccessToken(data.body['access_token']);
    
//   },
//   function(err) {
//     console.log('Something went wrong when retrieving an access token', err);
//   }
// );



// Will be used for searching later
// axios({
//   url: "https://api.spotify.com/v1/search?q=brokeboi&type=track&market=US&limit=10",
//   method: 'GET',
//   headers: {
//     'Accept':'application/json',
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${spotifyApi.getAccessToken()}` 
//   },
// }).then((response) => {
//   console.log(response.data.tracks)
// }).catch((error) => {
//   console.log('GET server side fail:', error);
// });






router.post('/token', (req, res) => {
  // Retrieving access token from Spotify API
  spotifyApi.clientCredentialsGrant().then(
    function(data) {
      console.log('The access token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
      res.sendStatus(201);
    },
    function(err) {
      console.log('Something went wrong when retrieving an access token', err);
      res.sendStatus(500);
    }
  );
});

router.get('/token', (req, res) => {
  const token = spotifyApi.getAccessToken();
  console.log('do we have a token?', token);
  res.sendStatus(200)
})

router.get('/search', useSpotifyToken, (req, res) => {
  const searchQuery = req.query
  console.log('do we have a search query?', searchQuery);
  const token = req.token;

  res.sendStatus(200);
  console.log ('This is the token:', token)

  // axios({
  //   url: `https://api.spotify.com/v1/search?q=${searchTerm}&type=track&market=US&limit=10`,
  //   method: 'GET',
  //   headers: {
  //     'Accept':'application/json',
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}` 
  //   },
  // }).then((response) => {
  //   console.log(response.data.tracks)
  // }).catch((error) => {
  //   console.log('GET server side fail:', error);
  // });
  
})

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
  
});

module.exports = router;
