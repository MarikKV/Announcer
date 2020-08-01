const allAnnounces = (state = [], action) => {
    switch(action.type){
        case 'GET_ALL_USER_ANNOUNCES': 
            state = action.payload
            return state
        default:
            return state;
    }
}

export default allAnnounces;