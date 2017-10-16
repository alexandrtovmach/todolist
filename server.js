const webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    config = require('./webpack.config'),
    { Pool } = require('pg'),
    connectionString = 'postgres://yajlgkyx:8KVuIvVyweA9AG6hGkXVglj2ojBkftqC@elmer.db.elephantsql.com:5432/yajlgkyx',
    pool = new Pool({connectionString}),
    port = 2017;


pool.connect();

const loremData =  [
    {
        id: 1,
        name: 'Eat',
        description: 'eat some',
        deadline: 19
    }, {
        id: 2,
        name: 'Work',
        description: 'workcode',
        deadline: 23
    }, {
        id: 3,
        name: 'Sleep',
        description: 'sleep in time',
        deadline: 23
    }]

const app = express();
// webpack building
const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html');
})

app.get('/api/plans', (req, res) => {
    pool.query('SELECT * FROM plans')
    .then((data) => {
        res.send(data.rows);
    })
    .catch((err) => {
        console.log(err);
    })
})

app.post('/api/plans', (req, res) => {
    pool.query('INSERT INTO plans(name, description, deadline) values($1, $2, $3)', [req.body.name, req.body.description, req.body.deadline])
    .then(() => {
        pool.query('SELECT * FROM plans')
        .then((data) => {
            res.send(data.rows);
        })
        .catch((err) => {
            console.log(err);
        });
    })
    .catch((err) => {
        console.log(err);
    })
})

app.put('/api/plans', (req, res) => {
    pool.query('UPDATE plans SET name=$1, description=$2, deadline=$3 WHERE id=$4', [req.body.name, req.body.description, req.body.deadline, req.body.id])
    .then(() => {
        pool.query('SELECT * FROM plans')
        .then((data) => {
            res.send(data.rows);
        })
        .catch((err) => {
            console.log(err);
        });
    })
    .catch((err) => {
        console.log(err);
    })
})

app.listen(port, (err)  => {
    if (err) {
        console.log(err);
    }
	console.log(`http://localhost:${port}`);
})

