import { API_URL } from "../config";

/* SELECTORS */
export const getUser = ({ user }) => user

/* ACTIONS */

// action name creator
const reducerName = 'users';
const createActionName = name => `app/${reducerName}/${name}`;

const LOG_IN = createActionName('LOG_IN');

export const logIn = payload => ({ payload, type: LOG_IN });


/* THUNKS */


/* INITIAL STATE */

const initialState = null;

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case LOG_IN:
      return action.payload;
    default:
      return statePart;
  }
}
