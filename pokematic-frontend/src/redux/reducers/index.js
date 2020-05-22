// import { combineReducers } from 'redux';

// calling the default reducer to create a link
import pokemonReducer from './pokemonReducer';
import { persistReducer } from 'redux-persist';

// Local storage in window browser for persistence
import storage from 'redux-persist/lib/storage';


const persistConfig = {
    // Where in the reducer do we want to start storing?
    key: 'root',
    storage,
  }


/**
 * Add this code once you have multiple reducers
 */

// const rootReducers = combineReducers({
//     // add reducer files references here
//     defaultReducer
// });


const rootReducers = pokemonReducer;

export default persistReducer(persistConfig, rootReducers);