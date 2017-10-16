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
            return HttpService({type: 'POST', path: '/api/plans', body: action.payload})
            .then((response) => {
                return {
                    ...state,
                    taskList: response
                };
            })
            .catch((err) => {
                console.log(err);
            })

            break;
        }
        case 'EDIT_TASK': {
            HttpService({type: 'PUT', path: '/api/plans', body: action.payload})
            .then((response) => {
                console.log(response);
                return {
                    ...state,
                    taskList: response
                };
            })
            .catch((err) => {
                console.log(err);
            })

            break;
        }
        
    }
    return state;
}