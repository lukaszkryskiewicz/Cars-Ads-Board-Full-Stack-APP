import axios from 'axios';
import { API_URL } from '../config';

/* SELECTORS */
export const getAllAdsByNewest = ({ ads }) => ads.data.slice().reverse();
export const getAdById = ({ ads }, id) => ads.data.find(ad => ad._id === id);
export const searchAdByTitle = ({ ads }, searchPhrase) => ads.data.filter(ad =>
  ad.title.toLowerCase().includes(searchPhrase.toLowerCase()))

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


export const startRequest = payload => ({ payload, type: START_REQUEST });
export const endRequest = payload => ({ payload, type: END_REQUEST });
export const errorRequest = (payload, error) => ({ payload, error, type: ERROR_REQUEST });

export const loadAds = payload => ({ payload, type: LOAD_ADS });
export const addAd = payload => ({ payload, type: ADD_AD });
export const updateAd = payload => ({ payload, type: UPDATE_AD });
export const deleteAd = payload => ({ payload, type: DELETE_AD });


/* THUNKS */

export const loadAdsRequest = () => {
  return async dispatch => {

    dispatch(startRequest({ name: 'LOAD_ADS' }));
    try {

      let res = await axios.get(`${API_URL}/api/ads`);
      dispatch(loadAds(res.data));
      dispatch(endRequest({ name: 'LOAD_ADS' }));

    } catch (e) {
      dispatch(errorRequest({ name: 'LOAD_ADS', error: e.message }));
    }

  };
};

export const addAdRequest = (ad) => {
  return async dispatch => {

    dispatch(startRequest({ name: 'ADD_AD' }));
    try {
      let res = await axios.post(`${API_URL}/api/ads`, ad, {
        withCredentials: true
      });
      if (res.status !== 200) {
        throw new Error('Add Ad failed');
      }
      dispatch(addAd(res.data));
      dispatch(loadAdsRequest());
      dispatch(endRequest({ name: 'ADD_AD' }));

    } catch (e) {
      dispatch(errorRequest({ name: 'ADD_AD', error: e.message }));
    }

  };
};

export const editAdRequest = (id, ad) => {
  return async dispatch => {

    dispatch(startRequest({ name: 'UPDATE_ADD' }));
    try {
      let res = await axios.put(`${API_URL}/api/ads/${id}`, ad, {
        withCredentials: true
      });

      if (res.status !== 200) {
        throw new Error('Edit Ad failed');
      }
      dispatch(updateAd(res.data));
      dispatch(loadAdsRequest());
      dispatch(endRequest({ name: 'UPDATE_ADD' }));

    } catch (e) {
      dispatch(errorRequest({ name: 'UPDATE_ADD', error: e.message }));
    }

  };
};

export const removeAdRequest = (id) => {
  return async dispatch => {

    dispatch(startRequest({ name: 'DELETE_AD' }));
    try {

      await axios.delete(`${API_URL}/api/ads/${id}`, {
        withCredentials: true,
      });
      dispatch(deleteAd(id));
      dispatch(loadAdsRequest());
      dispatch(endRequest({ name: 'DELETE_AD' }));

    } catch (e) {
      dispatch(errorRequest({ name: 'DELETE_AD', error: e.message }));
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
    case LOAD_ADS:
      return { ...statePart, data: [...action.payload] };
    case ADD_AD:
      return { ...statePart, data: [...statePart.data, action.payload] };
    case UPDATE_AD:
      return { ...statePart, data: statePart.data.map(ad => ad.id === action.payload.id ? { ...ad, ...action.payload } : ad) };
    case DELETE_AD:
      return { ...statePart, data: statePart.data.filter(ad => ad.id !== action.payload.id) };
    case START_REQUEST:
      return { ...statePart, requests: { ...statePart.requests, [action.payload.name]: { pending: true, error: null, success: false } } };
    case END_REQUEST:
      return { ...statePart, requests: { ...statePart.requests, [action.payload.name]: { pending: false, error: null, success: true } } };
    case ERROR_REQUEST:
      return { ...statePart, requests: { ...statePart.requests, [action.payload.name]: { pending: false, error: action.error, success: false } } };
    default:
      return statePart;
  }
}
