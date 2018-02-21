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
            type:    constants.FETCH_POSTS_FAIL,
            payload: error.message,
        });
    }
};

export const createTask = (data) => async (dispatch) => {
    dispatch({ type: constants.CREATE_TASK_REQUEST });

    try {
        const response = await fetch(api, {
            method:  'POST',
            headers: {
                Authorization:  token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: data,
            }),
        });

        const responseParsed = await response.json();

        if (response.status !== 200) {
            throw new Error(responseParsed.message);
        }

        dispatch({
            type:    constants.CREATE_TASK_SUCCESS,
            payload: responseParsed.data,
        });

    } catch (error) {
        dispatch({
            type:    constants.CREATE_TASK_FAIL,
            payload: error.message,
        });
    }
};

export const deleteTask = (id) => async (dispatch) => {
    dispatch({ type: constants.DELETE_TASK_REQUEST });

    try {
        const response = await fetch(`${api}/${id}`, {
            method:  'DELETE',
            headers: {
                Authorization: token,
            },
        });

        if (response.status !== 204) {
            const responseParsed = await response.json();

            throw new Error(responseParsed.message);
        }

        dispatch({
            type:    constants.DELETE_TASK_SUCCESS,
            payload: id,
        });

    } catch (error) {
        dispatch({
            type:    constants.DELETE_TASK_FAIL,
            payload: error.message,
        });
    }
};

export const updateTasks = (data) => async (dispatch) => {
    dispatch({ type: constants.UPDATE_TASKS_REQUEST });

    try {
        const response = await fetch(api, {
            method:  'PUT',
            headers: {
                Authorization:  token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseParsed = await response.json();

        if (response.status !== 200) {
            throw new Error(responseParsed.message);
        }

        dispatch({
            type:    constants.UPDATE_TASKS_SUCCESS,
            payload: responseParsed.data,
        });

    } catch (error) {
        dispatch({
            type:    constants.UPDATE_TASKS_FAIL,
            payload: error.message,
        });
    }
};
