import { SET_SIGNIN } from "./actionTypes";
import { ADD_CONVERSATION } from "./actionTypes";
import { UPDATE_CONVERSATION } from './actionTypes'
import { ADD_JSON_FILE } from "./actionTypes";
// src/actions/index.js

export function setSignIn(payload) {
  return { type: SET_SIGNIN, payload };
}

export function addConversation(payload) {
  return { type: ADD_CONVERSATION, payload };
}

export function updateConversation(payload){
  return { type: UPDATE_CONVERSATION, payload };
}

export function addJsonFile(payload) {
    return { type: ADD_JSON_FILE, payload};
}