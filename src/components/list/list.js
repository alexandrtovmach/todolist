import React, { Component } from 'react';
import { Task } from './task/task';

import './list.css';


export class List extends Component {

    generateList() {
        if (!this.props.taskList || !this.props.taskList.length) return
        return this.props.taskList.map((elem, i) => {
            return (
                <Task
                    key={elem.id}
                    task={elem}
                    onShowEditForm={this.props.onShowEditForm}
                    onRemoveTask={this.props.onRemoveTask}
                />
            )
        })
    }

    render() {
        return (
            <div>
                {this.generateList()}
                <div className={this.props.taskList? "row btn btn-add centerContent": 'hidden'} onClick={this.props.onShowAddForm}>Add task</div>
            </div>
        )
    }
}
