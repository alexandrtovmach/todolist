const taskRepository = {
    pg: require('../repositories/postgre/taskRepository'),
    fb: require('../repositories/firebase/taskRepository')
};

function TaskService() {}

TaskService.prototype.getTasks = getTasks;
TaskService.prototype.addTask = addTask;
TaskService.prototype.updateTask = updateTask;
TaskService.prototype.deleteTask = deleteTask;

function getTasks(callback, ...args) {
    taskRepository[args.pop()].getTasks((err, data) => {
        if (err) {
            return callback(err);
        } else if (!data) {
            return callback(null, []);
        }
        callback(null, data);
    })
}

function addTask(body, callback, ...args) {
    if (checkCorrect(body)) {
        taskRepository[args.pop()].addTask(body, (err, data) => {
            if (err) {
                return callback(500);
            }
            callback(200);
        })
    } else {
        callback(406);
    }
}

function updateTask(id, body, callback, ...args) {
    if (checkCorrect(body)) {
        if (id) {
            taskRepository[args.pop()].updateTask(id, body, (err, data) => {
                if (err) {
                    return callback(500);
                }
                callback(200);
            })
        } else {
            callback(404);
        }
    } else {
        callback(406);
    }
}

function deleteTask(id, callback, ...args) {
    if (id) {
        taskRepository[args.pop()].deleteTask(id, (err, data) => {
            if (err) {
                return callback(500);
            }
            callback(200);
        })
    } else {
        callback(404);
    }
}

function checkCorrect(obj) {
    return (
        obj.hasOwnProperty('name') && typeof obj.name === 'string' &&
        obj.hasOwnProperty('deadline') && +obj.deadline <= 23 && +obj.deadline >= 0 &&
        obj.hasOwnProperty('description') && typeof obj.description === 'string'
    )
}

module.exports = new TaskService();