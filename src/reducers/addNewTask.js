const addNewTask = (state = {}, action) => {
    switch(action.type){
        case 'ADD_TASK': 
            state = action.payload
            return state
        default:
            return state;
    }
}

export default addNewTask;