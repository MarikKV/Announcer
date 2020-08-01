export const login = () => {
    return {
        type: "SIGN_IN"
    }
}

export const addNewAnnounce = (props) => {
    return {
        type: "ADD_ANNOUNCE",
        payload: props
    }
}

export const saveUserInLocalStore = (props) => {
    return {
        type: "SAVE_USER_IN_STORE",
        payload: props
    }
}

export const getAnnounce = (props) => {
    return {
        type: "GET_ALL_USER_ANNOUNCES",
        payload: props
    }
}

export const searchAnnounce = (props) => {
    return {
        type: "SEARCH_ANNOUNCE",
        payload: props
    }
}


