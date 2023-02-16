const postData = (state = [], action) => {
    switch (action.type) {
        case 'SET_POST':
            return action.payload;
        default:
            return state;
    }
} 

export default postData;