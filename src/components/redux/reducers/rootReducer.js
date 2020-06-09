import { ADD_CONVERSATION } from "../actions/actionTypes";

const initialState = {
  conversations: [],
  fileList: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CONVERSATION:
      return {
        ...state,
        ...state.conversations.push(action.payload.conversationAdd)
      };
    default:
      return state;
  }
}

export default rootReducer;
