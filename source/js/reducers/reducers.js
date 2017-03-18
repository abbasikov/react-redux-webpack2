/*
 * The reducer takes care of our data
 * Using actions, we can change our application state
 * To add a new action, add it to the switch statement in the homeReducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return objectAssign({}, state, {
 *       stateVariable: action.var
 *   });
 */

import {
	INITIAL_STATE,
	CHANGE_FORM,
	SET_AUTH,
	SENDING_LOGIN_REQUEST,
	SET_ERROR_MESSAGE,
	SET_FEEDS,
	SET_HOME_SCREEN_LOADING } from '../constants/AppConstants';

// Object.assign is not yet fully supported in all browsers, so we fallback to a polyfill
const objectAssign = Object.assign || require('object.assign');

// Takes care of changing the application state
//Never mutate or manipulate state directly. Always return a new state.
export default function rootReducer(state = INITIAL_STATE, action = null) {
	switch (action.type) {
		case CHANGE_FORM:
			return objectAssign({}, state, {
				formState: action.newState
			});
			break;
		case SET_AUTH:
			return objectAssign({}, state, {
				loggedIn: action.isLoggedIn,
				currentUser:action.currentUser,
				loginError:action.loginError
			});
			break;
		case SENDING_LOGIN_REQUEST:
			return objectAssign({}, state, {
				sendingLoginRequest: action.sending
			});
			break;
		case SET_FEEDS:
			return objectAssign({}, state, {
				feeds: action.feeds
			});
			break;
		case SET_ERROR_MESSAGE:
			return objectAssign({}, state, {
				errorMessage: action.message
			});
		case SET_HOME_SCREEN_LOADING:
			return objectAssign({}, state, {
				homeScreenLoading: action.homeScreenLoading
			});
		default:
			return state;
	}
};


