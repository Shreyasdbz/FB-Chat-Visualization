import { SET_SIGNIN } from '../actions/actionTypes'
import { ADD_CONVERSATION } from "../actions/actionTypes";
import { UPDATE_CONVERSATION } from "../actions/actionTypes";
import { ADD_JSON_FILE } from '../actions/actionTypes'

const initialState = {
  conversations: [],
  jsonFiles: [],
  signedIn: false
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SIGNIN:
      return {
        ...state,
        ...state.signedIn = action.payload
      };
    case ADD_CONVERSATION:
      return {
        ...state,
        ...state.conversations.push(action.payload)
      };
    case UPDATE_CONVERSATION:
      for(let i=0; i<state.conversations.length; i++){
        if(state.conversations[i].thread_path === action.payload.thread_path){
          for(let j=0; j<action.payload.messages; j++){
            state.conversations[i].jsonMessageList.push(action.payload.messages[j])
          }
        }
      }
      return state;
    case ADD_JSON_FILE:
        return{
            ...state,
            ...state.jsonFiles.push(action.payload)
        };
    default:
      return state;
  }
}

export default rootReducer;
