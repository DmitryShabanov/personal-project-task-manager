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
    };

    handleChangeInput = (value, event) => {
        this.setState({
            [value]: event.target.value,
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { newTask: task } = this.state;

        if (task !== '' && task.length < 47) {
            this.props.createTask(task);
            this.setState({
                newTask: '',
            });
        }
    }

    complete = (id) => {}
        // this.setState(({ todos }) => ({
        //     todos: todos.map((todo) => {
        //         if (todo.id === id) {
        //             todo.completed = !todo.completed;
        //         }
        //
        //         return todo;
        //     }),
        // }));

    changePriority = (id) => {}
        // this.setState(({ todos }) => ({
        //     todos: todos.map((todo) => {
        //         if (todo.id === id) {
        //             todo.important = !todo.important;
        //         }
        //
        //         return todo;
        //     }),
        // }));

    completeAll = () => {}
        // this.setState(({ todos }) => ({
        //     todso: todos.map((todo) => {
        //         todo.completed = true;
        //
        //         return todo;
        //     }),
        // }));

        // create({
        //     id:        'fdhgfjgkhghfjgkh',
        //     message:   'fdhgfjgkhghfjgkh',
        //     completed: false,
        //     important: false,
        // });

    render () {
        const { todos } = this.props;
        const allCompleted = todos.every((todo) => todo.completed);
        const todoList = todos.map(({ id, message, completed, important }) => (
            <Task
                changePriority = { this.changePriority }
                complete = { this.complete }
                completed = { completed }
                id = { id }
                important = { important }
                key = { id }
                message = { message }
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
