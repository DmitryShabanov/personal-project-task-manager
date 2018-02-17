import constants from './constants';
import { api, token } from '../../configs';

export const fetchTodos = (params = {}) => async (dispatch) => {
    dispatch({ type: constants.FETCH_POSTS_REQUEST });

    const { page = 1, size = 10, search = '' } = params;

    try {
        const response = await fetch(`${api}?page=${page}&size=${size}&search=${search}`, {
            method:  'GET',
            headers: {
                Authorization: token,
            },
        });

        const responseParsed = await response.json();

        if (response.status !== 200) {
            throw new Error(responseParsed.message);
        }

        dispatch({
            type:    constants.FETCH_POSTS_SUCCESS,
            payload: {
                todos: responseParsed.data,
                meta:  responseParsed.meta,
            },
        });

    } catch (error) {
        dispatch({
            tepe:    constants.FETCH_POSTS_FAIL,
            payload: error.message,
        });
    }
};

export const createTask = (message) => async (dispatch) => {
    dispatch({ type: constants.CREATE_TASK_REQUEST });

    try {
        const response = await fetch(api, {
            method:  'POST',
            headers: {
                Authorization:  token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message,
            }),
        });

        const responseParsed = await response.json();

        console.log('createTask', responseParsed);

        if (response.status !== 200) {
            throw new Error(responseParsed.message);
        }

        dispatch({
            type:    constants.CREATE_TASK_SUCCESS,
            payload: responseParsed.data,
        });

    } catch (error) {
        dispatch({
            tepe:    constants.CREATE_TASK_FAIL,
            payload: error.message,
        });
    }
};
