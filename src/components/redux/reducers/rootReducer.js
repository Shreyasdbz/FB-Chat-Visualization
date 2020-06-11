import { ADD_CONVERSATION } from "../actions/actionTypes";
import { ADD_JSON_FILE } from '../actions/actionTypes'

const initialState = {
  conversations: [],
  jsonFiles: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CONVERSATION:
      return {
        ...state,
        ...state.conversations.push(action.payload.conversationAdd)
      };
    case ADD_JSON_FILE:
        return{
            ...state,
            ...state.jsonFiles.push(action.payload.jsonFileAdd)
        }
    default:
      return state;
  }
}

export default rootReducer;
