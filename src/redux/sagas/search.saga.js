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

function* searchSaga() {
    yield takeLatest('SAGA_FETCH_SEARCH', sendSearchQuery);
}

export default searchSaga;