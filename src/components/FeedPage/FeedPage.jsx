import { useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";
import { Card, CardHeader, CardContent, Avatar, Typography, Grid,} from '@mui/material';


function FeedPage() {
  const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);
  const otherUser = useSelector((store) => store.otherUser);
  const dispatch = useDispatch();
  const history = useHistory();

  console.log("test feed", feed);

  useEffect(() => {
    dispatch({
      type: 'SAGA_FETCH_FEED',
    })
  }, [])
  
  const likeSong = (song) => {
    
    let likedSongData = {
        song_id: song.spotify_song_id,
        user_id: user.id
    }

    console.log("liked this song", likedSongData)

    dispatch({
      type: 'SAGA_ADD_SONG',
      payload: likedSongData
    })
    
  }

  const handleProfileClick = (id) => {
    if (id === user.id){
      history.push("/profile")
    } else {
      dispatch({
        type: 'FETCH_OTHER_USER',
        payload: id
      })

      dispatch({
        type: 'SAGA_FETCH_OTHER_LIKES',
        payload: otherUser.id
      })

      history.push("/other");
    }
  }


  
  return (
    <div>
      <Grid container spacing={2}>
        {feed.map((post) => (
          <Grid item xs={12} key={post.id}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar src={post.profile_pic} alt={post.username} onClick={() => handleProfileClick(post.user_id)}/>
                }
                title={post.username}
              />
              <CardContent>
                <Typography>
                  "{post.post_text}"
                </Typography>
              </CardContent>
              <CardContent>
              <Typography>
                  {post.song_name}
                </Typography>
                <Typography>
                  {post.artist_name}
                </Typography>
                <img src={post.song_image}></img>
                <audio controls>
                  <source src={post.song_audio}></source>
                </audio>
                <button onClick={() => likeSong(post)}>♥️</button>
                <a href={post.spotify_url} target="_blank" rel="noopener noreferrer"><button>Open in Spotify</button></a>
                
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
       {/* {feed.map((post) => {
            return (
                <div key={post.id}>
                    <hr></hr>
                    <p onClick={() => handleProfileClick(post.user_id)}>Username: @{post.username}</p>
                    <p>Caption: "{post.post_text}"</p>
                    <p>Song Name: {post.song_name}</p>
                    <p>Artist: {post.artist_name}</p>
                    <img src={post.song_image}></img>
                    <audio controls>
                        <source src={post.song_audio}></source>
                    </audio>
                    <br></br>
                    <button onClick={() => likeSong(post)}>♥️</button>
                    <a href={post.spotify_url} target="_blank" rel="noopener noreferrer"><button>Open in Spotify</button></a>
                    <hr></hr>
                </div>
            )
        })} */}

}

// this allows us to use <App /> in index.js
export default FeedPage;
