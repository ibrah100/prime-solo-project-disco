const postData = (state = [], action) => {
    switch (action.type) {
        case 'SET_POST':
            console.log("this is the:", action.payload);
            return action.payload;
        default:
            return state;
    }
} 

export default postData;