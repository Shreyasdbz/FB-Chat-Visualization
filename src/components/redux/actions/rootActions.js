import { ADD_CONVERSATION } from "./actionTypes";
import { ADD_JSON_FILE } from "./actionTypes";
// src/actions/index.js

export function addConversation(payload) {
  return { type: ADD_CONVERSATION, payload };
}

export function addJsonFile(payload) {
    return { type: ADD_JSON_FILE, payload};
}