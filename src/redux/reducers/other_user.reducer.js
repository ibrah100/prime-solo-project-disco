const otherUser = (state = {}, action) => {
    switch (action.type) {
      case 'SET_OTHER_USER':
        return action.payload;
      case 'UNSET_OTHER_USER':
        return {};
      default:
        return state;
    }
  };

  export default otherUser;