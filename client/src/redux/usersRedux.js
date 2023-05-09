import axios from 'axios';
import { API_URL } from '../config';

/* SELECTORS */
export const getUser = ({ user }) => user.data

/* ACTIONS */

// action name creator
const reducerName = 'user';
const createActionName = name => `app/${reducerName}/${name}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const LOAD_USERS = createActionName('LOAD_USERS');
const ADD_USER = createActionName('ADD_USER');
const DELETE_USER = createActionName('DELETE_USER')


export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = error => ({ error, type: ERROR_REQUEST });

export const loadUsers = payload => ({ payload, type: LOAD_USERS });
export const addUser = payload => ({ payload, type: ADD_USER });
export const deleteUser = payload => ({ payload, type: DELETE_USER });


/* THUNKS */

export const loadUsersRequest = () => {
  return async dispatch => {

    dispatch(startRequest());
    try {

      let res = await axios.get(`${API_URL}/user`);
      dispatch(loadUsers(res.data));
      dispatch(endRequest());

    } catch (e) {
      dispatch(errorRequest(e.message));
    }

  };
};

/* INITIAL STATE */

const initialState = {
  data: [],
  requests: {},
};

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case LOAD_USERS:
      return { ...statePart, data: [...action.payload] };
    case ADD_USER:
      return { ...statePart, data: [...statePart.data, action.payload] };
    case DELETE_USER:
      return { ...statePart, data: [statePart.filter(user => user.id !== action.payload.id)] };
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
