// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles';
import Checkbox from 'theme/assets/Checkbox';

// Components
import Task from 'components/Task';

export default class Scheduler extends Component {
    state = {
        newTask: '',
        search:  '',
    };

    componentDidMount () {
        this.props.actions.fetchTodos();
    }

    handleChangeInput = (value, event) => {
        this.setState({
            [value]: event.target.value,
        });
    }

    handleEnterKey = (event) => {
        if (event.key === 'Enter') {
            this.props.actions.fetchTodos({
                search: this.state.search,
            });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { newTask: task } = this.state;

        if (task !== '' && task.length < 47 && task.trim() !== '') {
            this.props.actions.createTask(task.trim());
        }

        this.setState({
            newTask: '',
        });
    }

    completeAll = () => {
        const { todos } = this.props;
        const { updateTasks } = this.props.actions;
        let isCompleted = true;
        let completedTodos = null;

        todos.forEach((item) => {
            if (item.completed === false) {
                isCompleted = false;
            }
        });

        if (isCompleted) {
            completedTodos = todos.map((item) => ({
                ...item,
                completed: false,
            }));

            updateTasks(completedTodos);

            return;
        }

        completedTodos = todos.map((item) => {
            if (!item.completed) {
                return {
                    ...item,
                    completed: true,
                };
            }

            return item;
        });

        updateTasks(completedTodos);
    }

    render () {
        const { todos, actions } = this.props;
        const search = this.state.search.trim();
        const filtered = todos.filter((item) => {
            if (search.length > 0) {
                if (item.message.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
                    return item;
                }

                return null;
            }

            return item;
        });
        const allCompleted = todos.every((todo) => todo.completed);
        const todoList = filtered.map(({ id, message, completed, favorite }) => (
            <Task
                completed = { completed }
                favorite = { favorite }
                id = { id }
                key = { id }
                message = { message }
                remove = { () => actions.deleteTask(id) }
                update = { actions.updateTasks }
            />
        ));

        return (
            <section className = { Styles.scheduler }>
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input
                            placeholder = 'Поиск'
                            type = 'search'
                            value = { this.state.search }
                            onChange = { (e) => this.handleChangeInput('search', e) }
                            onKeyPress = { this.handleEnterKey }
                        />
                    </header>
                    <section>
                        <form onSubmit = { this.handleSubmit }>
                            <input
                                placeholder = 'Описание моей новой задачи'
                                type = 'text'
                                value = { this.state.newTask }
                                onChange = { (e) => this.handleChangeInput('newTask', e) }
                            />
                            <button>Добавить задачу</button>
                        </form>
                        <ul>{todoList}</ul>
                    </section>
                    <footer>
                        <Checkbox
                            checked = { allCompleted }
                            color1 = '#363636'
                            color2 = '#fff'
                            onClick = { this.completeAll }
                        />
                        <code>Все задачи выполнены</code>
                    </footer>
                </main>
            </section>
        );
    }
}
