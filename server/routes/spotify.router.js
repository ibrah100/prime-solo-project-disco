const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();
const SpotifyWebApi = require('spotify-web-api-node');
const { useSpotifyToken } = require('../modules/spotifyToken.js');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// Searches Spotify with API, returns search results of songs
router.get('/search', useSpotifyToken, (req, res) => {
  const searchQuery = req.query.searchQuery
  console.log('do we have a search query?', searchQuery);
  const token = req.token;
  console.log ('This is the token:', token)

  axios({
    url: `https://api.spotify.com/v1/search?q=${searchQuery}&type=track&market=US&limit=5`,
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

// Get all liked songs from database for current user
router.get('/likes', useSpotifyToken, (req, res) => {
  console.log("user id is from current:", req.user.id);
  const token = req.token;

  let sqlQuery = `
  SELECT "song_id" FROM "liked_songs"
	JOIN "user"
		ON "user"."id" = "liked_songs"."user_id"
	WHERE "liked_songs"."user_id" = $1
  ORDER BY "liked_songs"."id" DESC;
  `;

  pool.query(sqlQuery, [req.user.id])
  .then(result => {
    
    // Turning song ids into a acceptable string query for Spotify API
    const likedSongsIdsQuery = result.rows.map(({song_id}) => song_id).join('%2C')
    
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

// Get all liked songs for other users when viewing profile
router.get('/other/likes', useSpotifyToken, (req, res) => {
  const otherUserId = req.query.otherUserId;
  console.log("user id is from other:", otherUserId);
  const token = req.token;

  let sqlQuery = `
  SELECT "song_id" FROM "liked_songs"
	JOIN "user"
		ON "user"."id" = "liked_songs"."user_id"
	WHERE "liked_songs"."user_id" = $1
  ORDER BY "liked_songs"."id" DESC;
  `;

  pool.query(sqlQuery, [otherUserId])
  .then(result => {
    
    // Turning song ids into a acceptable string query for Spotify API
    const otherLikedSongsIdsQuery = result.rows.map(({song_id}) => song_id).join('%2C')
    console.log(otherLikedSongsIdsQuery)
    
    
    axios({
      url: `https://api.spotify.com/v1/tracks?ids=${otherLikedSongsIdsQuery}`,
      method: 'GET',
      headers: {
        'Accept':'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
    }).then((response) => {
      console.log(response.data.tracks)
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

// Get all posts for feed
router.get('/feed', (req, res) => {

  let sqlQuery = `
  SELECT posts.id, post_text, song_name, artist_name, song_image, spotify_url, user_id, username, spotify_song_id, song_audio, profile_pic FROM "posts"
	JOIN "user"
		ON "user"."id" = "posts"."user_id"
	ORDER BY "created_at" DESC;
  `;

  pool.query(sqlQuery)
    .then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      console.error('Error GET /api/spotify/posts', error);
      res.sendStatus(500);  
    });

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

// Post song with caption to be displayed in feed
router.post('/post/song', (req, res) => {

  console.log("req", req.body)
  const sqlQuery = `
    INSERT INTO "posts" ("post_text", "song_name", "artist_name", "song_image", "spotify_url", "song_audio", "user_id", "spotify_song_id")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
  `;
  
  const sqlValues = [req.body.post_text, req.body.song_name, req.body.artist_name, req.body.song_image, req.body.spotify_url, req.body.song_audio, req.body.user_id, req.body.song_id];

  pool.query(sqlQuery, sqlValues)
    .then((result) => {
      console.log(`Added into posts`, result);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.error('Error POST /api/spotify', error);
      res.sendStatus(500); 
    })
});

// Delete song from client side from liked_songs database
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  let songId = req.params.id
  // if logged in you can access user.id
  let userId = req.user.id

  console.log("song id is:", songId, "user id is:", userId);



  let sqlValues = [songId, userId]
  let sqlQuery = `
  DELETE FROM "liked_songs"
	WHERE "liked_songs"."user_id" = $2
	AND "liked_songs"."song_id" = $1`;

      pool.query(sqlQuery, sqlValues)
      .then((dbRes) => {
        console.log('dbRes.rows', dbRes.rows)
          res.sendStatus(200);
      })
      .catch((dbErr) => {
          console.log(`error in POST: serverside`, dbErr);
          res.sendStatus(500);
      });



    });


module.exports = router;
