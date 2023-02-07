import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";


function SearchPage() {
// 11. results is what we got from the index.js results reducer.
  const results = useSelector(store => store.results);
  const [searchInput, setSearchInput] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  console.log('Here are your results', results);

// 1. Sending dispatch to SAGA_FETCH_SEARCH with searchInput 
  const handleSubmit = (event) => {
    event.preventDefault();
    
    dispatch({
      type: 'SAGA_FETCH_SEARCH',
      payload: searchInput
    })

   
  }
  return (
    <>
    <h2>SEARCH</h2>
    <form onSubmit={handleSubmit}>
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
            <li>Song Name: {song.album.name}</li>
            <li>Artist: {song.album.artists[0].name}</li>
            <li><img src={song.album.images[2].url}></img></li>
        </ul>
        )
    })}
</div>
  </>
  
  );
}

// this allows us to use <App /> in index.js
export default SearchPage;
