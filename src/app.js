import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HttpService } from './services/httpService';
import { List } from './components/list/list';
import { Form } from './components/form/form';
import './app.css';
import './general.css';



class App extends Component {
    constructor(props) {
        super(props);

        HttpService({type: 'GET', path: '/api/plans'})
        .then((response) => {
            this.props.onGetedTaskList(response.data);
        })
        .catch((err) => {
            console.log(err);
        })

    }

    render() {
        if (!this.props.hideForm) {
            return (
                <div className="main">
                    <Form
                        onCloseForm={this.props.onCloseForm}
                        hideForm={this.props.hideForm}
                        taskForEdit={this.props.taskForEdit}
                        onAddTask={this.props.onAddTask}
                        onEditTask={this.props.onEditTask}
                    />
                    <List
                        taskList={this.props.taskList}
                        onShowEditForm={this.props.onShowEditForm}
                        onShowAddForm={this.props.onShowAddForm}
                        onRemoveTask={this.props.onRemoveTask}
                    />
                </div>
            )
        } else {
            return (
                <div className="main">
                    <List
                        taskList={this.props.taskList}
                        onShowEditForm={this.props.onShowEditForm}
                        onShowAddForm={this.props.onShowAddForm}
                        onRemoveTask={this.props.onRemoveTask}
                    />
                </div>
            )
        }
    }
}
export default connect(
    (state) => ({
        taskList: state.taskList,
        hideForm: state.hideForm,
        taskForEdit: state.taskForEdit
    }),
    (dispatch) => ({
        onCloseForm: () => {
            dispatch({type: 'CLOSE_FORM'});
        },
        onGetedTaskList: (tasks) => {
            dispatch({type: 'GETED_TASK_LIST', payload: tasks});
        },
        onShowEditForm: (task) => {
            dispatch({type: 'SHOW_EDIT_FORM', payload: task});
        },
        onShowAddForm: () => {
            dispatch({type: 'SHOW_ADD_FORM'});
        },
        onAddTask: (task) => {
            dispatch({type: 'ADD_TASK', payload: task});
        },
        onEditTask: (task) => {
            dispatch({type: 'EDIT_TASK', payload: task});
        },
        onRemoveTask: (id) => {
            dispatch({type: 'REMOVE_TASK', payload: id});
        },
    })
)(App);
