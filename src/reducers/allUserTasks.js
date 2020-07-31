const allUserTasks = (state = [], action) => {
    switch(action.type){
        case 'GET_ALL_USER_TASKS': 
            state = action.payload
            return state
        default:
            return state;
    }
}

export default allUserTasks;