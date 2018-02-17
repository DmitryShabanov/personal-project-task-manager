// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createTask } from '../../actions/tasks';

// Components
import Scheduler from 'components/Scheduler';

class App extends Component {
    render () {
        const { createTask: create, tasks } = this.props;

        return (
            <Scheduler
                createTask = { create }
                todos = { tasks }
            />
        );
    }
}

const mapStateToProps = (state) => ({
    tasks: state.tasks.toJS(),
});

const mapDispatchToProps = (dispatch) => ({
    createTask: (item) => dispatch(createTask(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
