import {combineReducers} from 'redux';
import addNewTask from './addNewTask';
import isLogged from './isLogged';
import saveUserInStore from './saveUserInStore';
import allUserTasks from './allUserTasks';
import searchAnnounce from './search';


const allReducers = combineReducers({
    addNewTask,
    isLogged,
    saveUserInStore,
    allUserTasks,
    searchAnnounce
})

export default allReducers;