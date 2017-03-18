/*
 * Actions change things in your application
 * Since this application uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 * 3) (optional) Add an async function like this:
 *    export function asyncYourAction(var) {
 *        return function(dispatch) {
 *             // Do async stuff here
 *             return dispatch(yourAction(var));
 *        }
 *    }
 *
 *    If you add an async function, remove the export from the function
 *    created in the second step
 */

import axios from 'axios';
import {
    SET_AUTH,
    CHANGE_FORM,
    SENDING_LOGIN_REQUEST,
    SET_ERROR_MESSAGE,
    SERVER_URL,
    SET_HOME_SCREEN_LOADING,
    SET_FEEDS
} from '../constants/AppConstants';
import * as errorMessages  from '../constants/MessageConstants';
import store from '../index';
import utilityMethods from '../utils/utilityMethods';

/**
 * Logs an user in
 * @param  {string} username The username of the user to be logged in
 * @param  {string} password The password of the user to be logged in
 */
export function loginUser(username, password) {


    return function(dispatch) {

        // Show the loading indicator, hide the last error
        dispatch(sendingLoginRequest(true));

        // If no username or password was specified, throw a field-missing error
        if (anyElementsEmpty({ username, password })) {
            dispatch(setErrorMessage(errorMessages.FIELD_MISSING));
            dispatch(sendingLoginRequest(false));
            return;
        }

        axios.post(`${SERVER_URL}/login`,{
            username: username, password:password
        }).then(function (response) {
            dispatch(sendingLoginRequest(false));
            if(response.status == 200 && response.data.meta.status == 200) {
                dispatch(setAuthState(true,response.data.data.user,''));
                utilityMethods.saveUserSession(response.data.data.user);
            } else {
                dispatch(setAuthState(false,{},response.data.meta.errorMessage));
            }
        }).catch(function (error) {
            console.log(error);
            dispatch(sendingLoginRequest(false));
        });

    }
}

/**
 * Logs the current user out
 */
export function logoutUser() {
    var storeData = store.getState();

    return function(dispatch) {
        dispatch(setHomeScreenLoading(true));
        axios.post(`${SERVER_URL}/logout`,{
            username: storeData.currentUser.id
        }).then(function (response) {
            dispatch(setHomeScreenLoading(false));
            if(response.status == 200 && response.data.meta.status == 200) {
                dispatch(setAuthState(false,{},''));
                utilityMethods.removeUserSession();
            } else {
                //display general error
            }
        }).catch(function (error) {
            dispatch(setHomeScreenLoading(false));
            console.log(error);
        });

    }
}

/**
 * Registers a user
 * @param  {string} username The username of the new user
 * @param  {string} password The password of the new user
 */
export function register(username, password) {
    return (dispatch) => {
        // Show the loading indicator, hide the last error
        dispatch(sendingRequest(true));
        // If no username or password was specified, throw a field-missing error
        if (anyElementsEmpty({ username, password })) {
            dispatch(setErrorMessage(errorMessages.FIELD_MISSING));
            dispatch(sendingRequest(false));
            return;
        }
        // Generate salt for password encryption
        const salt = genSalt(username);
        // Encrypt password
        bcrypt.hash(password, salt, (err, hash) => {
            // Something wrong while hashing
            if (err) {
                dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
                return;
            }
            // Use auth.js to fake a request
            auth.register(username, hash, (success, err) => {
                // When the request is finished, hide the loading indicator
                dispatch(sendingRequest(false));
                dispatch(setAuthState(success));
                if (success) {
                    // If the register worked, forward the user to the homepage and clear the form
                    forwardTo('/dashboard');
                    dispatch(changeForm({
                        username: "",
                        password: ""
                    }));
                } else {
                    switch (err.type) {
                        case 'username-exists':
                            dispatch(setErrorMessage(errorMessages.USERNAME_TAKEN));
                            return;
                        default:
                            dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
                            return;
                    }
                }
            });
        });
    }
}

/**
 * Sets the authentication state of the application
 * @param {boolean} isLoggedIn True means a user is logged in, false means no user is logged in
 * @param {object} currentUser logged in user object
 * @param {string} login error if any
 */
export function setAuthState(isLoggedIn, currentUser, loginError) {
    return {
        type: SET_AUTH,
        isLoggedIn:isLoggedIn,
        currentUser:currentUser,
        loginError:loginError
    };
}


export function getFeeds() {
    var storeData = store.getState();
    var userId = storeData.currentUser.id;
    var selectedBoard = storeData.selectedBoard;

    return function(dispatch) {

        axios.get(`${SERVER_URL}/feeds`)
            .then(function (response) {
                if(response.status == 200 && response.data.meta.status == 200) {
                    dispatch(setFeeds(response.data.data.feeds));
                } else {

                }
        }).catch(function (error) {
            console.log(error);
        });

    }


}

function setFeeds(data) {
    return {
        type: SET_FEEDS,
        feeds: data
    }
}


/**
 * Sets the form state
 * @param  {object} newState          The new state of the form
 * @param  {string} newState.username The new text of the username input field of the form
 * @param  {string} newState.password The new text of the password input field of the form
 * @return {object}                   Formatted action for the reducer to handle
 */
export function changeForm(newState) {
    return { type: CHANGE_FORM, newState };
}

/**
 * Sets the requestSending state, which displays a loading indicator during requests
 * @param  {boolean} sending The new state the app should have
 * @return {object}          Formatted action for the reducer to handle
 */
export function sendingLoginRequest(sending) {
    return {
        type: SENDING_LOGIN_REQUEST,
        sending:sending
    };
}

export function setHomeScreenLoading(homeScreenLoading) {
    return {
        type: SET_HOME_SCREEN_LOADING,
        homeScreenLoading:homeScreenLoading
    };
}


/**
 * Sets the errorMessage state, which displays the ErrorMessage component when it is not empty
 * @param message
 */
function setErrorMessage(message) {
    return (dispatch) => {
        dispatch({ type: SET_ERROR_MESSAGE, message });

        const form = document.querySelector('.form-page__form-wrapper');
        if (form) {
            form.classList.add('js-form__err-animation');
            // Remove the animation class after the animation is finished, so it
            // can play again on the next error
            setTimeout(() => {
                form.classList.remove('js-form__err-animation');
            }, 150);

            // Remove the error message after 3 seconds
            setTimeout(() => {
                dispatch({ type: SET_ERROR_MESSAGE, message: '' });
            }, 3000);
        }
    }
}

/**
 * Forwards the user
 * @param {string} location The route the user should be forwarded to
 */
function forwardTo(location) {
    console.log('forwardTo(' + location + ')');
    browserHistory.push(location);
}


/**
 * Checks if any elements of a JSON object are empty
 * @param  {object} elements The object that should be checked
 * @return {boolean}         True if there are empty elements, false if there aren't
 */
function anyElementsEmpty(elements) {
    for (let element in elements) {
        if (!elements[element]) {
            return true;
        }
    }
    return false;
}


