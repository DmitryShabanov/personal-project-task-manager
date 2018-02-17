import { fromJS } from 'immutable';

import constants from '../actions/tasks/constants';

const todos = [
    {
        id:        'xjh',
        message:   'Успешно пройти React-интенсив компании Lectrum',
        completed: true,
        important: true,
    },
    {
        id:        'xjr',
        message:   'Взять автограф у Джареда Лето',
        completed: false,
        important: false,
    },
    {
        id:        'xrh',
        message:   'Зарегестрировать бабушку в Твиче',
        completed: false,
        important: false,
    },
    {
        id:        'rjh',
        message:   'Записать собаку на груминг',
        completed: false,
        important: false,
    },
    {
        id:        'xph',
        message:   'Научиться играть на барабанах',
        completed: false,
        important: false,
    }
];

const initialState = fromJS(todos);

export default (state = initialState, action) => {
    switch (action.type) {
        case constants.CREATE_TASK_REQUEST:
            return state.unshift(fromJS({
                id:        action.payload,
                message:   action.payload,
                completed: false,
                important: false,
            }));
        default:
            return state;
    }
};
