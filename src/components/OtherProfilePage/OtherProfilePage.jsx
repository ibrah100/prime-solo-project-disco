import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from "react";
import { Card, CardHeader, CardContent, Avatar, Typography, Grid,} from '@mui/material';



function OtherProfilePage() {
  const otherUser = useSelector((store) => store.otherUser);
  const otherLikes = useSelector((store) => store.otherLikes);
  const dispatch = useDispatch();




  useEffect(() => {
    dispatch({
      type: 'SAGA_FETCH_OTHER_LIKES',
      payload: otherUser.id
    })
  }, [])

  const likeSong = (song) => {
    
    let likedSongData = {
        song_id: song.spotify_song_id,
        user_id: otherUser.id
    }

    console.log("liked this song", likedSongData)

    dispatch({
      type: 'SAGA_ADD_SONG',
      payload: likedSongData
    })
    
  }



  return (
    <>
        <div className="container">
        <h2>@{otherUser.username}</h2>
        <img src={otherUser.profile_pic} width='64' ></img>
        <p>BIO:</p>
        <p>{otherUser.bio}</p>
        </div>
        <h2>Liked Songs</h2>
        <Grid container spacing={2}>
          {otherLikes.map((song) => (
            <Grid item xs={12} key= {song.id}>
              <Card>
                <CardContent>
                  <Typography>
                    {song.name}
                  </Typography>
                  <Typography>
                    {song.album.artists[0].name}
                  </Typography>
                  <img src={song.album.images[2].url}></img>
                  <audio controls>
                    <source src={song.song_audio}></source>
                  </audio>
                  <button onClick={() => likeSong(song)}>♥️</button>
                  <a href={song.external_urls.spotify} target="_blank" rel="noopener noreferrer"><button>Open in Spotify</button></a>
                </CardContent>
              </Card>
            </Grid>  
          ))}
        </Grid>
    </>
  );
}

// this allows us to use <App /> in index.js
export default OtherProfilePage;