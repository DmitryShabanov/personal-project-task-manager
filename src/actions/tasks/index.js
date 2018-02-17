import constants from './constants';

export const createTask = (data) => ({
    type:    constants.CREATE_TASK_REQUEST,
    payload: data,
});

export const createTaskSuccess = () => ({
    type: constants.CREATE_TASK_SUCCESS,
});

export const createTaskFail = () => ({
    type: constants.CREATE_TASK_FAIL,
});
