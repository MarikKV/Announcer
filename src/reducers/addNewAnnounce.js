const addNewAnnounce = (state = {}, action) => {
    switch(action.type){
        case 'ADD_ANNOUNCE': 
            state = action.payload
            return state
        default:
            return state;
    }
}

export default addNewAnnounce;