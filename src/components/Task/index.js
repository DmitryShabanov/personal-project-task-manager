// Core
import React, { Component } from 'react';
import cx from 'classnames';

// Instruments
import Styles from './styles';
import Checkbox from 'theme/assets/Checkbox';
import Delete from 'theme/assets/Delete';
import Edit from 'theme/assets/Edit';
import Star from 'theme/assets/Star';

export default class Task extends Component {
    state = {
        message:   this.props.message,
        isEditing: false,
    }

    handleEnterKey = (event) => {
        if (event.key === 'Enter') {
            this.onClickEditButton();
        }
    }

    onClickEditButton = () => {
        const { update, id, completed, favorite, message: prevMessage } = this.props;
        const { message, isEditing } = this.state;

        if (isEditing) {
            if (message === '' || message.length > 47 || message.trim() === '' || message.trim() === prevMessage) {
                this.setState({
                    isEditing: !this.state.isEditing,
                    message:   prevMessage,
                });

                return;
            }

            update([
                {
                    id,
                    message: message.trim(),
                    favorite,
                    completed,
                }
            ]);
        }

        this.setState({
            isEditing: !this.state.isEditing,
        });
    }

    changeMessage = (value) => {
        this.setState({
            message: value,
        });
    }

    complete = () => {
        const { id, message, favorite, completed, update } = this.props;

        update([
            {
                id,
                message,
                completed: !completed,
                favorite,
            }
        ]);
    };

    changePriority = () => {
        const { id, message, favorite, completed, update } = this.props;

        update([
            {
                id,
                message,
                completed,
                favorite: !favorite,
            }
        ]);
    };

    render () {
        const { completed, favorite, remove } = this.props;
        const { isEditing } = this.state;

        const styles = cx(Styles.task, {
            [Styles.completed]: completed,
        });

        return (
            <li className = { styles }>
                <div>
                    <Checkbox
                        checked = { completed }
                        color1 = '#3B8EF3'
                        color2 = '#FFF'
                        onClick = { this.complete }
                    />
                    <input
                        disabled = { !this.state.isEditing }
                        type = 'text'
                        value = { this.state.message }
                        onChange = { (event) => this.changeMessage(event.target.value) }
                        onKeyPress = { this.handleEnterKey }
                    />
                </div>
                <div>
                    <Star
                        checked = { favorite }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this.changePriority }
                    />
                    {
                        completed ?
                            null
                            : (
                                <Edit
                                    color1 = '#3B8EF3'
                                    color2 = { isEditing ? '#3B8EF3' : '#000' }
                                    onClick = { this.onClickEditButton }
                                />
                            )
                    }
                    <Delete color1 = '#3B8EF3' color2 = '#000' onClick = { remove } />
                </div>
            </li>
        );
    }
}
