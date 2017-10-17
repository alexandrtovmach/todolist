import React, { Component } from 'react';

import './task.css';


export class Task extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hideDesc: false
        }
    }

    toogleHideDesc() {
        this.setState({
            hideDesc: !this.state.hideDesc
        })
    }

    editTask(event) {
        this.props.onShowEditForm(this.props.task);
    }

    removeTask(event) {
        this.props.onRemoveTask(this.props.task.id);
    }
    
    render() {
        return (
            <div className="row">
                <div className="task" onClick={this.toogleHideDesc.bind(this)}>
                    <div className="id">{this.props.task.id}</div>
                    <div className="name">{this.props.task.name}</div>
                    <div className="deadline">{this.props.task.deadline}</div>
                </div>
                <div className={this.state.hideDesc? 'description': 'hidden'}>
                    <blockquote>{this.props.task.description}</blockquote>
                    <div className="btn btn-edit centerContent" onClick={this.editTask.bind(this)}>Edit</div>
                    <div className="btn btn-remove centerContent" onClick={this.removeTask.bind(this)}>Remove</div>
                </div>
            </div>
        )
    }
}
