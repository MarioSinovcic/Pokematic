// import { combineReducers } from 'redux';

// calling the default reducer to create a link
import pokemonReducer from './pokemonReducer';

/**
 * Add this code once you have multiple reducers
 */

// const rootReducers = combineReducers({
//     // add reducer files references here
//     defaultReducer
// });



const rootReducers = pokemonReducer;

export default rootReducers;