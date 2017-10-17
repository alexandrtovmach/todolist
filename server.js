const webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    config = require('./webpack.config'),
    { Pool } = require('pg'),
    connectionString = 'postgres://yajlgkyx:8KVuIvVyweA9AG6hGkXVglj2ojBkftqC@elmer.db.elephantsql.com:5432/yajlgkyx',
    pool = new Pool({ connectionString }),
    port = 2017;

pool.connect();
const app = express();
// webpack building
const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html');
})

app.get('/api/plans', (req, res) => {
    console.log('get')
    pool.query('SELECT * FROM plans')
        .then((data) => {
            res.send(data.rows);
        })
        .catch((err) => {
            console.log(err);
        })
})

app.post('/api/plans', (req, res) => {
    console.log('post', req.body)
    pool.query('INSERT INTO plans(name, description, deadline) values($1, $2, $3)', [req.body.name, req.body.description, req.body.deadline])
        .then(() => {
            // some action
        })
        .catch((err) => {
            console.log(err);
        })
})

app.put('/api/plans/:id', (req, res) => {
    console.log('put', req.params.id, req.body)
    pool.query('UPDATE plans SET name=$1, description=$2, deadline=$3 WHERE id=$4', [req.body.name, req.body.description, req.body.deadline, req.params.id])
        .then(() => {
            // some action
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log(err);
        })
})

app.delete('/api/plans/:id', (req, res) => {
    console.log('delete', req.params.id)
    pool.query('DELETE FROM plans WHERE id=$1', [req.params.id])
        .then(() => {
            // some action
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log(err);
        })
})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`http://localhost:${port}`);
})
