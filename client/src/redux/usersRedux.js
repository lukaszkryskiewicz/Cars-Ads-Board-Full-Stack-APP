import axios from 'axios';
import { API_URL } from "../config";

/* SELECTORS */
export const getUser = ({ user }) => user.login

/* ACTIONS */

// action name creator
const reducerName = 'users';
const createActionName = name => `app/${reducerName}/${name}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const LOG_IN = createActionName('LOG_IN');
const LOG_OUT = createActionName('LOG_OUT');

export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = error => ({ error, type: ERROR_REQUEST });

export const logIn = payload => ({ payload, type: LOG_IN });
export const logOut = payload => ({ payload, type: LOG_OUT });

/* THUNKS */
export const checkLogedUser = () => {
  return async dispatch => {
    dispatch(startRequest());
    try {

      let res = await axios.get(`${API_URL}/auth/user`, {
        withCredentials: true,
      });
      dispatch(logIn(res.data));
      dispatch(endRequest());

    } catch (e) {
      dispatch(errorRequest(e.message))
    }

  };
};


/* INITIAL STATE */

const initialState = {
  login: null,
  request: {}
};

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case LOG_IN:
      return { ...statePart, login: action.payload.login };
    case LOG_OUT:
      return { ...statePart, login: null };
    case START_REQUEST:
      return { ...statePart, request: { pending: true, error: null, success: false } };
    case END_REQUEST:
      return { ...statePart, request: { pending: false, error: null, success: true } };
    case ERROR_REQUEST:
      return { ...statePart, request: { pending: false, error: action.error, success: false } };
    default:
      return statePart;
  }
}
