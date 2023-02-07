import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* sendSearchQuery (action) {
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
      const response = yield axios.post('/api/spotify/', action.payload);
      console.log("this is the response from server!", response); 
    } catch (error){
      console.log('Error with addItem in ItemTable', error)
    }
  }

function* songSaga() {
    yield takeLatest('SAGA_FETCH_SEARCH', sendSearchQuery);
    yield takeLatest('SAGA_ADD_SONG', addSong);
}

export default songSaga;