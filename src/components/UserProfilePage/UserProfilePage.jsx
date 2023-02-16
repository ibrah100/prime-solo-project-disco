import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from "react";


function UserProfilePage() {
  const user = useSelector((store) => store.user);
  const likes = useSelector((store) => store.likes);
  const dispatch = useDispatch();

  console.log("Here are the likes", likes);


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
        <p>Your ID is: {user.id}</p>
        <img src={user.profile_pic} width='64' ></img>
        <p>BIO: {user.bio}</p>
        </div>
        <h2>Liked Songs</h2>
        {likes.map((song) => {
            return (
                <ul key={song.id}>
                    <li>Song Name: {song.name}</li>
                    <li>Artist: {song.album.artists[0].name}</li>
                    <li><img src={song.album.images[2].url}></img></li>
                    <button onClick={() => deleteSong(song)}>-</button>
                    <a href={song.external_urls.spotify} target="_blank" rel="noopener noreferrer"><button>Open in Spotify</button></a>
                </ul>
            )
        })}
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserProfilePage;