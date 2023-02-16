const likes = (state = [], action) => {
    switch (action.type) {
        case 'SET_LIKES':
            return action.payload.data;
        default:
            return state;
    }
} 

export default likes;