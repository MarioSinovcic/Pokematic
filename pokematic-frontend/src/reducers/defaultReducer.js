import { INCREMENT } from "../actions/actionTypes";

// default reducer
// Note: You can remove this reducer and create your own reducer

const initialState = {
    count: 0
};
  
export default function defaultReducer(state = initialState, action) {
    switch(action.type) {
      case INCREMENT:
      console.log(state.count);
        return {
            ...state,
          count: state.count + 1
        };
      default:
        return state;
    }
  }