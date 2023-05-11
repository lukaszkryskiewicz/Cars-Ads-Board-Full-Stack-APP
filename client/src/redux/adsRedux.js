import axios from 'axios';
import { API_URL } from '../config';

/* SELECTORS */
export const getAllAds = ({ ads }) => ads.data
export const getAdById = ({ ads }, id) => ads.data.find(ad => ad._id === id);

/* ACTIONS */

// action name creator
const reducerName = 'ads';
const createActionName = name => `app/${reducerName}/${name}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const LOAD_ADS = createActionName('LOAD_ADS');
const ADD_AD = createActionName('ADD_AD');
const UPDATE_AD = createActionName('UPDATE_AD')
const DELETE_AD = createActionName('DELETE_AD')


export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = error => ({ error, type: ERROR_REQUEST });

export const loadAds = payload => ({ payload, type: LOAD_ADS });
export const addAd = payload => ({ payload, type: ADD_AD });
export const updateAd = payload => ({ payload, type: UPDATE_AD });
export const deleteAd = payload => ({ payload, type: DELETE_AD });


/* THUNKS */

export const loadAdsRequest = () => {
  return async dispatch => {

    dispatch(startRequest());
    try {

      let res = await axios.get(`${API_URL}/api/ads`);
      dispatch(loadAds(res.data));
      dispatch(endRequest());

    } catch (e) {
      dispatch(errorRequest(e.message));
    }

  };
};

/* INITIAL STATE */

const initialState = {
  data: [],
  request: {},
};

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case LOAD_ADS:
      return { ...statePart, data: [...action.payload] };
    case ADD_AD:
      return { ...statePart, data: [...statePart.data, action.payload] };
    case UPDATE_AD:
      return { ...statePart, data: statePart.data.map(ad => ad.id === action.payload.id ? { ...ad, ...action.payload } : ad) };
    case DELETE_AD:
      return { ...statePart, data: statePart.filter(ad => ad.id !== action.payload.id) };
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
