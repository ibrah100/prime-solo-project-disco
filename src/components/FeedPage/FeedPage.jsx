import { useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';

function FeedPage() {
  const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

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
    dispatch({
      type: 'FETCH_OTHER_USER',
      payload: id
    })
  }


  
  return (
    <div>
       {feed.map((post) => {
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
        })}

    </div>
  );
}

// this allows us to use <App /> in index.js
export default FeedPage;