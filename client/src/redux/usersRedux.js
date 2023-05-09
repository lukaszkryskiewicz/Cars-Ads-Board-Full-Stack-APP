import { API_URL } from "../config";

/* SELECTORS */
export const getUser = ({ user }) => user

/* ACTIONS */

// action name creator
const reducerName = 'users';
const createActionName = name => `app/${reducerName}/${name}`;

const LOG_IN = createActionName('LOG_IN');
const LOG_OUT = createActionName('LOG_OUT');

export const logIn = payload => ({ payload, type: LOG_IN });
export const logOut = payload => ({ payload, type: LOG_OUT });

/* THUNKS */


/* INITIAL STATE */

const initialState = null;

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case LOG_IN:
      return action.payload;
    case LOG_OUT:
      return null;
    default:
      return statePart;
  }
}
