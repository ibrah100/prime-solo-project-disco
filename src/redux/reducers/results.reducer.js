const results = (state = [], action) => {
    switch (action.type) {
        case 'SET_SEARCH':
            console.log("this is the:", action.payload.data);
            return action.payload.data;
        default:
            return state;
    }
} 

export default results;