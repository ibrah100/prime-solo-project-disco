import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";



function SearchPage() {
// 11. results is what we got from the index.js results reducer.
  const results = useSelector(store => store.results);
  const likes = useSelector(store => store.likes);
  const [searchInput, setSearchInput] = useState('');
  const user = useSelector(store => store.user)
  const dispatch = useDispatch();

  console.log(user);  
  console.log('Here are your results', results);

  useEffect(() => {
    dispatch({
      type: 'SAGA_FETCH_LIKES',
      payload: user.id
    })
  }, [])

  console.log("Here are the likes", likes);

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
            {results.map((song) => {
                return (

                    
                <ul key={song.id}>
                    <li>Song Name: {song.name}</li>
                    <li>Artist: {song.album.artists[0].name}</li>
                    <li><img src={song.album.images[2].url}></img></li>
                    <audio controls>
                        <source src={song.preview_url}></source>
                    </audio>
                    <button onClick={() => likeSong(song)}>♥️</button>
                    <a href={song.external_urls.spotify} target="_blank" rel="noopener noreferrer"><button>Open in Spotify</button></a>
                </ul>
                )
            })}
        </div>
    </>
  
  );
}

export default SearchPage;
