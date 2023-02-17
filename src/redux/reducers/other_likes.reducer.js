const otherLikes = (state = [], action) => {
    switch (action.type) {
        case 'SET_OTHER_LIKES':
            return action.payload.data;
        default:
            return state;
    }
} 

export default otherLikes;