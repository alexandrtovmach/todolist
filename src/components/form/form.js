import React, { Component } from 'react';

import './form.css';


export class Form extends Component {

    submitForm(event) {
        event.preventDefault();
        const taskObj = {
            name: this.refs.name.value,
            description: this.refs.description.value,
            deadline: +this.refs.deadline.value
        }
        if (this.props.taskForEdit && this.props.taskForEdit.id) {
            taskObj.id = this.props.taskForEdit.id;
            this.props.onEditTask(taskObj);
        } else {
            this.props.onAddTask(taskObj);
        }
        
        this.props.onCloseForm();
    }

    render() {
        return (
            <div className={this.props.hideForm? 'hidden': 'wrapper centerContent'}>
                <form onSubmit={this.submitForm.bind(this)}>
                    <label>Title:
                        <br />
                        <input ref="name" placeholder="Title of task..." defaultValue={this.props.taskForEdit? this.props.taskForEdit.name: ''}/>
                    </label>
                    <label>Description:
                        <br />
                        <textarea ref="description" placeholder="About task..." defaultValue={this.props.taskForEdit? this.props.taskForEdit.description: ''}/>
                    </label>
                    <label>Deadline on hour: 
                        <br />
                        <input type="number" ref="deadline" min="0" max="23" placeholder="00-23" defaultValue={this.props.taskForEdit? this.props.taskForEdit.deadline: ''}/>
                    </label>
                    <span className="exit" onClick={this.props.onCloseForm}>x</span>
                    <button className="btn btn-add">{this.props.taskForEdit? 'Edit': 'Add'}</button>
                </form>
            </div>
        )
    }
}
