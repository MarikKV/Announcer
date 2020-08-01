import {combineReducers} from 'redux';
import addNewAnnounce from './addNewAnnounce';
import isLogged from './isLogged';
import saveUserInStore from './saveUserInStore';
import allAnnounces from './allAnnounces';
import searchAnnounce from './search';


const allReducers = combineReducers({
    addNewAnnounce,
    isLogged,
    saveUserInStore,
    allAnnounces,
    searchAnnounce
})

export default allReducers;