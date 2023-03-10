import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardHeader, CardContent, Avatar, Typography, Grid,} from '@mui/material';



function SearchPage() {
// 11. results is what we got from the index.js results reducer.
  const results = useSelector(store => store.results);
  const [searchInput, setSearchInput] = useState('');
  const user = useSelector(store => store.user)
  const dispatch = useDispatch();
  const history = useHistory();
  

// 1. Sending dispatch to SAGA_FETCH_SEARCH with searchInput 
  const handleSearch = (event) => {
    event.preventDefault();
    
    dispatch({
      type: 'SAGA_FETCH_SEARCH',
      payload: searchInput
    })

  }

  const likeSong = (song) => {
    
    let likedSongData = {
        song_id: song.id,
        user_id: user.id
    }

    console.log("liked this song", likedSongData)

    dispatch({
      type: 'SAGA_ADD_SONG',
      payload: likedSongData
    })

    
  }

  const postSong = (song) => {
    
    let postSongData = {
        song_id: song.id,
        user_id: user.id,
        song_name: song.name,
        artist_name: song.album.artists[0].name,
        song_image: song.album.images[2].url,
        spotify_url: song.external_urls.spotify,
        song_audio: song.preview_url,
    }

    console.log("This is the song you want to post:", postSongData)

    dispatch({
        type: 'SAGA_POST_SONG_DATA',
        payload: postSongData
      })

    history.push('/post');
  }


  return (
    <>
        <h2>SEARCH</h2>
        <form onSubmit={handleSearch}>
            <input
            placeholder="Search..."
            type="text"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            />
            <button>Submit</button>
        </form>
        <div>
            <Grid container spacing={2}>
                {results.map((song) => (
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
                                <source src={song.preview_url}></source>
                            </audio>
                            <button onClick={() => likeSong(song)}>??????</button>
                            <a href={song.external_urls.spotify} target="_blank" rel="noopener noreferrer"><button>Open in Spotify</button></a>
                            <button onClick={() => postSong(song)}>Post</button>
                        </CardContent>
                    </Card>

                ))}
        
            </Grid>

        </div>
    </>
  
  );
}

export default SearchPage;
