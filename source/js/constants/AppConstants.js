/*
 * AppConstants
 * These are the variables that determine what our central data store (reducer.js)
 * changes in our state. When you add a new action, you have to add a new constant here
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'YOUR_ACTION_CONSTANT';
 */

// The initial application state
export const INITIAL_STATE = {
    formState: {
        username: '',
        password: ''
    },
    sendingLoginRequest: false,
    loggedIn: false,
    errorMessage: '',
    currentUser:{},
    loginError:'',
    homeScreenLoading:false,
    feeds:[]
};

export const SERVER_URL = 'https://demo5100262.mockable.io';
export const CHANGE_FORM = 'CHANGE_FORM';
export const SET_AUTH = 'SET_AUTH';
export const SET_FEEDS = 'SET_FEEDS';
export const SENDING_REQUEST = 'SENDING_REQUEST';
export const SENDING_LOGIN_REQUEST = 'SENDING_LOGIN_REQUEST';
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const FETCH_POST = 'FETCH_POST';
export const DELETE_POST = 'DELETE_POST';
export const SELECT_BOOK = "SELECT_BOOK";
export const LOGIN_USER = "LOGIN_USER";
export const SET_HOME_SCREEN_LOADING = "SET_HOME_SCREEN_LOADING";