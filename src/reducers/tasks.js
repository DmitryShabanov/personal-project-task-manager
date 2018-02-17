import { fromJS } from 'immutable';

import constants from '../actions/tasks/constants';

const initialState = fromJS({
    isPostsFetching: false,
    isTaskCreating:  false,

    fetchPostsError: undefined,
    createTaskError: undefined,

    todos: [],
    meta:  {},
});

export default (state = initialState, action) => {
    switch (action.type) {
        // FETCH_POSTS
        case constants.FETCH_POSTS_REQUEST:
            return state.set('isPostsFetching', true);
        case constants.FETCH_POSTS_FAIL:
            return state.merge(fromJS({
                isPostsFetching: false,
                fetchPostsError: action.payload,
            }));
        case constants.FETCH_POSTS_SUCCESS:
            return state.merge(fromJS({
                isPostsFetching: false,
                todos:           action.payload.todos,
                meta:            action.payload.meta,
            }));

        // CREATE_TASK
        case constants.CREATE_TASK_REQUEST:
            return state.set('isTaskCreating', true);
        case constants.CREATE_TASK_FAIL:
            return state.merge(fromJS({
                isTaskCreating:  false,
                createTaskError: action.payload,
            }));
        case constants.CREATE_TASK_SUCCESS:
            return state.merge(fromJS({
                isTaskCreating: false,
                todos:          state.get('todos').unshift(fromJS(action.payload)),
            }));

        default:
            return state;
    }
};
