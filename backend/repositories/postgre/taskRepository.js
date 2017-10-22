const db = require('../../db/pgDbConnect').pool;

function TaskRepository() {};

TaskRepository.prototype.getTasks = getTasks;
TaskRepository.prototype.addTask = addTask;
TaskRepository.prototype.updateTask = updateTask;
TaskRepository.prototype.deleteTask = deleteTask;

function getTasks(callback) {
    db.query('SELECT * FROM plans')
    .then((data) => {
        callback(null, data.rows);
    })
    .catch((err) => {
        callback(err);
    })
}

function addTask(task, callback) {
    db.query('INSERT INTO plans(name, description, deadline) values($1, $2, $3)', [task.name, task.description, task.deadline])
    .then(() => {
        callback(null, true);
    })
    .catch((err) => {
        callback(err);
    })
}

function updateTask(id, task, callback) {
    db.query('UPDATE plans SET name=$1, description=$2, deadline=$3 WHERE id=$4', [task.name, task.description, task.deadline, id])
    .then(() => {
        callback(null, true);
    })
    .catch((err) => {
        callback(err);
    })
}

function deleteTask(id, callback) {
    db.query('DELETE FROM plans WHERE id=$1', [id])
    .then(() => {
        callback(null, true);
    })
    .catch((err) => {
        callback(err);
    })
}


module.exports = new TaskRepository();
