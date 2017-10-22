import { HttpService } from '../services/httpService';

export function game(state = {}, action) {
    state.taskList = state.taskList;
    state.hideForm = state.hideForm || true;
    state.taskForEdit = state.taskForEdit;

    switch (action.type) {
        case 'CLOSE_FORM': {      
            return {
                ...state,
                hideForm: true
            };
            break;
        }
        case 'SHOW_EDIT_FORM': {
            return {
                ...state,
                taskForEdit: action.payload,
                hideForm: false
            };
            break;
        }
        case 'SHOW_ADD_FORM': {
            return {
                ...state,
                taskForEdit: null,
                hideForm: false
            };
            break;
        }
        case 'GETED_TASK_LIST': {
            return {
                ...state,
                taskList: action.payload
            };
            break;
        }
        case 'ADD_TASK': {
            HttpService({type: 'POST', path: '/api/plans', body: action.payload})
            .catch((err) => {
                console.error(err);
            })
            break;
        }
        case 'EDIT_TASK': {
            HttpService({type: 'PUT', path: `/api/plans/${action.payload.id}`, body: action.payload})
            .catch((err) => {
                console.log(err);
            })
            break;
        }
        case 'REMOVE_TASK': {
            HttpService({type: 'DELETE', path: `/api/plans/${action.payload}`})
            .catch((err) => {
                console.log(err);
            })
            break;
        }
        
    }
    return state;
}