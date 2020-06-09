import { ADD_CONVERSATION } from "./actionTypes";
// src/actions/index.js

export function addConversation(payload) {
  return { type: ADD_CONVERSATION, payload };
}
