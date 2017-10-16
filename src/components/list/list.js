import React, { Component } from 'react';
import { Task } from './task/task';

import './list.css';


export class List extends Component {
    constructor(props) {
        super(props)
    }

    generateList() {
        if (!this.props.taskList || !this.props.taskList.length) return
        return this.props.taskList.map((elem, i) => {
            return (
                <Task
                    key={elem.id}
                    task={elem}
                    onShowEditForm={this.props.onShowEditForm}
                />
            )
        })
    }

    render() {
        return (
            <div>
                {this.generateList()}
                <div className="row btn btn-add centerContent" onClick={this.props.onShowAddForm}>Add task</div>
            </div>
        )
    }
}
