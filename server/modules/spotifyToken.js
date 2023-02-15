require('dotenv').config();
const SpotifyWebApi = require('spotify-web-api-node');

// Spotify API credentials
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

// Create the api object with the credentials
var spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret
});

const useSpotifyToken = (req, res, next) => {
    


        spotifyApi.clientCredentialsGrant().then(
            function(data) {
              console.log('The access token expires in ' + data.body['expires_in']);
              console.log('The access token is ' + data.body['access_token']);
              // Save the access token so that it's used in future calls
              spotifyApi.setAccessToken(data.body['access_token']);
              req.token = (data.body['access_token']);
              next();
            },
            function(err) {
              console.log('Something went wrong when retrieving an access token', err);
              res.sendStatus(500);
            }
          );
    
  };
  
  module.exports = { useSpotifyToken };
  