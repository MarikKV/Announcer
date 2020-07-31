const searchAnnounce = (state = '', action) => {
    switch(action.type){
        case 'SEARCH_ANNOUNCE': 
            state =  action.payload
            return state
        default:
            return state;
    }
}

export default searchAnnounce;