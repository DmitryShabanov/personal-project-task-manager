import { fromJS } from 'immutable';

import constants from '../actions/tasks/constants';

const initialState = fromJS({
    isPostsFetching: false,
    isTaskCreating:  false,
    isTaskDeleting:  false,
    isTasksUpdating: false,

    fetchPostsError:  undefined,
    createTaskError:  undefined,
    deleteTaskError:  undefined,
    updateTasksError: undefined,

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

        // DELETE_TASK
        case constants.DELETE_TASK_REQUEST:
            return state.set('isTaskDeleting', true);
        case constants.DELETE_TASK_FAIL:
            return state.merge(fromJS({
                isTaskDeleting:  false,
                deleteTaskError: action.payload,
            }));
        case constants.DELETE_TASK_SUCCESS:
            return state.merge(fromJS({
                isTaskDeleting: false,
                todos:          state.get('todos').filter((todo) => todo.get('id') !== action.payload),
            }));

        // UPDATE_TASK
        case constants.UPDATE_TASKS_REQUEST:
            return state.set('isTasksUpdating', true);
        case constants.UPDATE_TASKS_FAIL:
            return state.merge(fromJS({
                isTasksUpdating:  false,
                updateTasksError: action.payload,
            }));
        case constants.UPDATE_TASKS_SUCCESS: {
            const updateValues = fromJS(action.payload);
            const merged = state.get('todos').map((item) => {
                let result = item;

                updateValues.forEach((update) => {
                    if (update.get('id') === item.get('id')) {
                        result = item.merge(update);
                    }
                });

                return result;
            });

            return state.merge(fromJS({
                isTasksUpdating: false,
                todos:           merged,
            }));
        }

        default:
            return state;
    }
};
