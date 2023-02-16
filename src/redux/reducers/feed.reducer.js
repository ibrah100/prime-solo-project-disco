const feed = (state = [], action) => {
    switch (action.type) {
        case 'SET_FEED':
            return action.payload.data;
        default:
            return state;
    }
} 

export default feed;