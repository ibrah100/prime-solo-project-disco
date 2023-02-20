import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from "react";
import { Card, CardHeader, CardContent, Avatar, Typography, Grid,} from '@mui/material';



function UserProfilePage() {
  const user = useSelector((store) => store.user);
  const likes = useSelector((store) => store.likes);
  const dispatch = useDispatch();

  console.log("Here are the user", user);


  useEffect(() => {
    dispatch({
      type: 'SAGA_FETCH_LIKES',
      payload: user.id
    })
  }, [])

  const deleteSong = (song) => {
    console.log("this is song data", song);

    let deletedSongData = {
        song_id: song.id,
        user_id: user.id
    }

    console.log("deleted this song", deletedSongData)

    dispatch({
      type: 'SAGA_DELETE_SONG',
      payload: deletedSongData
    })
  }

  return (
    <>
        <div className="container">
        <h2>@{user.username}</h2>
        <img src={user.profile_pic} width='64' ></img>
        <p>BIO:</p>
        <p>{user.bio}</p>
        </div>
        <h2>Liked Songs</h2>
        <Grid container spacing={2}>
          {likes.map((song) => (
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
                  <button onClick={() => deleteSong(song)}>-</button>
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
export default UserProfilePage;