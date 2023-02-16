import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchLikedSongs(action) {
    // 3. send search takes the dispatch from 'SAGA_FETCH_SEARCH', and supplying the function with the search term.
    try{
        // 4. assigns the term to the searchQuery variable.
        const userId = action.payload;
        console.log("saga payload: " + userId);
        
        // 5. set params with the variable of searchQuery as an object.
        const likedSongs = yield  axios({
            method:  'GET',
            url: '/api/spotify/likes',
            params: {userId}
        })

        console.log(likedSongs)
        // Send API data to results reducer
     yield put ({
        // 9. this sets the state of the reducer with the corresponding type.
        type: 'SET_LIKES',
        payload: likedSongs
        })
    }catch (error){
        console.log(`fetchLikedSongs broke POST saga index`, error);
    }
}

function* fetchFeed(action) {
    
    try {
        
        const feedPosts = yield  axios({
            method:  'GET',
            url: '/api/spotify/feed',
        })

        console.log("feedpost", feedPosts);

     yield put ({
        type: 'SET_FEED',
        payload: feedPosts
        })

    } catch (error) {
        console.log(`fetchLikedSongs broke POST saga index`, error);
    }
}



function* sendSearchQuery(action) {
    // 3. send search takes the dispatch from 'SAGA_FETCH_SEARCH', and supplying the function with the search term.
    try{
        // 4. assigns the term to the searchQuery variable.
        const searchQuery = action.payload;
        console.log(searchQuery);
        // 5. set params with the variable of searchQuery as an object.
        const response = yield  axios({
            method:  'GET',
            url: '/api/spotify/search',
            params: {searchQuery}
        })
        // Send API data to results reducer
     yield put ({
        // 9. this sets the state of the reducer with the corresponding type.
        type: 'SET_SEARCH',
        payload: response
        })
    }catch (error){
        console.log(`sendSearchQuery broke POST saga index`, error);
    }
}

function* addSong(action){
    try {
      const response = yield axios.post('/api/spotify/add_song', action.payload);
      console.log("this is the response from server!", response);
      yield put({ type: 'SAGA_FETCH_LIKES' }) 
    } catch (error){
      console.log('Error with addSong saga', error)
    }
}

function* deleteSong(action){
    console.log("this is action", action);
    try {
        const response = yield axios.delete(`/api/spotify/${action.payload.song_id}`, action.payload)
        console.log('action.payload song_id:', action.payload.song_id)
        console.log('action.payload user_id:', action.payload.user_id)
        console.log('response:', response)
    
    
        // yield put to bring the DOM back in sync
        yield put({ type: 'SAGA_FETCH_LIKES' })
      } catch (error) {
        console.error('Error deleteItem in shelf.saga:', error)
      }
}

function* postSong(action){
    try {
        const postSongData = action.payload;
        
        const response = yield axios.post('/api/spotify/post/song', postSongData);
        console.log("this is the response:", response)

        yield put({ type: 'SAGA_FETCH_FEED' })

        
    } catch (error){
      console.log('Error with addSong saga', error)
    }
}

function* postSongData(action){
    try {
        const postSongData = action.payload;
        console.log("post songdata:", postSongData);
        
        yield put ({
        type: 'SET_POST',
        payload: postSongData
        })
            
    } catch (error){
      console.log('Error with addSong saga', error)
    }
}



function* songSaga() {
    yield takeLatest('SAGA_FETCH_SEARCH', sendSearchQuery);
    yield takeLatest('SAGA_ADD_SONG', addSong);
    yield takeLatest('SAGA_DELETE_SONG', deleteSong);
    yield takeLatest('SAGA_POST_SONG', postSong);
    yield takeLatest('SAGA_POST_SONG_DATA', postSongData);
    yield takeLatest('SAGA_FETCH_LIKES', fetchLikedSongs);
    yield takeLatest('SAGA_FETCH_FEED', fetchFeed);

}

export default songSaga;