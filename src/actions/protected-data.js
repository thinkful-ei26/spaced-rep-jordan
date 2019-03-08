import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_PROTECTED_DATA_REQUEST = 'FETCH_PROTECTED_DATA_REQUEST';
export const fetchProtectedDataRequest = data => ({
    type: FETCH_PROTECTED_DATA_REQUEST,
    data
});

export const FETCH_PROTECTED_DATA_SUCCESS = 'FETCH_PROTECTED_DATA_SUCCESS';
export const fetchProtectedDataSuccess = data => ({
    type: FETCH_PROTECTED_DATA_SUCCESS,
    data
});

export const FETCH_PROTECTED_DATA_ERROR = 'FETCH_PROTECTED_DATA_ERROR';
export const fetchProtectedDataError = error => ({
    type: FETCH_PROTECTED_DATA_ERROR,
    error
});

export const fetchProtectedData = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/api/questions`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((data) => { 

            let returnObj = {
                currentWord:data[0].text, 
                currentAnswer: data[0].answer,
                numberOfCorrectAnswersForWord:data[0].score, 
                wordsAttempts:data[0].attempts
            }
            dispatch(fetchProtectedDataSuccess(returnObj))
        })

        .catch(err => {
            dispatch(fetchProtectedDataError(err));
        });
};