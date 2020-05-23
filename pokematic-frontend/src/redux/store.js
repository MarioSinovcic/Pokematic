import { createStore } from 'redux';
import rootReducers from './reducers';
import { persistStore } from 'redux-persist';


// creating and persist store for the redux structure
const store = createStore(
    rootReducers,
);
const persistor = persistStore(store);

export  { store, persistor};