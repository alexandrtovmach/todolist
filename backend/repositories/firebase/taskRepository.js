const dbRef = require('../../db/firebaseDbConnect').ref;

function TaskRepository() {};

TaskRepository.prototype.getTasks = getTasks;
TaskRepository.prototype.addTask = addTask;
TaskRepository.prototype.updateTask = updateTask;
TaskRepository.prototype.deleteTask = deleteTask;

function getTasks(callback) {
    dbRef.once('value')
    .then((data) => {
        callback(null, Object.values(data.val()));
    })
    .catch((err) => {
        callback(err.code);
    })
}

function addTask(task, callback) {
    let taskPush = dbRef.push(task, (error) => {
        if (error) {
            callback(error.code);
        }
        dbRef.child(taskPush).update({id: taskPush})
        .then(() => {
            callback(null, true);
        })
        .catch((err) => {
            callback(err.code);
        })
    }).key;
}

function updateTask(id, task, callback) {
    dbRef.child(id).update(task)
    .then(() => {
        callback(null, true);
    })
    .catch((err) => {
        callback(err.code);
    })
}

function deleteTask(id, callback) {
    dbRef.child(id).remove()
    .then(() => {
        callback(null, true);
    })
    .catch((err) => {
        callback(err.code);
    })
}


module.exports = new TaskRepository();
