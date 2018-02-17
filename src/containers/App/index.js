// Core
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as tasksActions from '../../actions/tasks';

// Components
import Scheduler from 'components/Scheduler';

class App extends Component {
    render () {
        const { actions, todos } = this.props;

        return (
            <Scheduler
                actions = { actions }
                todos = { todos }
            />
        );
    }
}

const mapStateToProps = (state) => {
    const tasks = state.tasks.toJS();

    return {
        todos: tasks.todos,
        meta:  tasks.meta,
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(tasksActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
