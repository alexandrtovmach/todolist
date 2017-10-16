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
        event.preventDefault();
        this.props.onShowEditForm(this.props.task);
    }

    render() {
        return (
            <div className="row">
                <div className="verticalAlignContent task" onClick={this.toogleHideDesc.bind(this)}>
                    <div>{this.props.task.id}</div>
                    <div>{this.props.task.name}</div>
                    <div>{this.props.task.deadline}</div>
                </div>
                <div className={this.state.hideDesc? '': 'hidden'}>
                    {this.props.task.description}
                    <div className="btn btn-edit centerContent" onClick={this.editTask.bind(this)}>Edit</div>
                    <div className="btn btn-remove centerContent">Remove</div>
                </div>
            </div>
        )
    }
}
