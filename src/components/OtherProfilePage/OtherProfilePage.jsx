import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from "react";


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


  return (
    <>
        <div className="container">
        <h2>@{otherUser.username}</h2>
        <p>Your ID is: {otherUser.id}</p>
        <img src={otherUser.profile_pic} width='64' ></img>
        <p>BIO: {otherUser.bio}</p>
        </div>
        <h2>Liked Songs</h2>
        {otherLikes.map((song) => {
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
export default OtherProfilePage;