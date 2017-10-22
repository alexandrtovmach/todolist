const pool = require('../backend/db/pgDbConnect').pool,
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../backend/index'),
    should = chai.should();

chai.use(chaiHttp);
describe('Tasks in PostgreSQL', () => {

    describe('change database', () => {
        it('it should change db to postgresql', (done) => {
            chai.request(server)
            .get('/api/changedefaultdb/pg')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });

    describe('/GET tasks', () => {
        before((done) => {
            pool.query('DELETE FROM plans *')
            .then(() => {
                done(); 
            })     
        });
        it('it should GET all the tasks', (done) => {
            chai.request(server)
            .get('/api/plans')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
        });
    });

    describe('/POST task', () => {
        describe('not fully obj', () => {
            it('it should not POST a task with empty body', (done) => {
                const task = {}
                chai.request(server)
                .post('/api/plans')
                .send(task)
                .end((err, res) => {
                    res.should.have.status(406);
                done();
                });
            });
            it('it should not POST a task without "name" field', (done) => {
                const task = {
                    deadline: 22,
                    description: "test description"
                }
                chai.request(server)
                .post('/api/plans')
                .send(task)
                .end((err, res) => {
                    res.should.have.status(406);
                done();
                });
            });
            it('it should not POST a task without "description" field', (done) => {
                const task = {
                    name: "test",
                    deadline: 22
                }
                chai.request(server)
                .post('/api/plans')
                .send(task)
                .end((err, res) => {
                    res.should.have.status(406);
                done();
                });
            });
            it('it should not POST a task without "deadline" field', (done) => {
                const task = {
                    name: "test",
                    description: "test description"
                }
                chai.request(server)
                .post('/api/plans')
                .send(task)
                .end((err, res) => {
                    res.should.have.status(406);
                done();
                });
            });
        });

        describe('incorrect type', () => {
            it('it should not POST a task with incorrect type of "name" field', (done) => {
                const task = {
                    name: 22,
                    deadline: 22,
                    description: "test description"
                }
                chai.request(server)
                .post('/api/plans')
                .send(task)
                .end((err, res) => {
                    res.should.have.status(406);
                done();
                });
            });
            it('it should not POST a task with incorrect type of "description" field', (done) => {
                const task = {
                    name: 'test',
                    deadline: 22,
                    description: 22
                }
                chai.request(server)
                .post('/api/plans')
                .send(task)
                .end((err, res) => {
                    res.should.have.status(406);
                done();
                });
            });
            it('it should not POST a task with incorrect type of "deadline" field', (done) => {
                const task = {
                    name: 'test',
                    deadline: 'twenty two',
                    description: "test description"
                }
                chai.request(server)
                .post('/api/plans')
                .send(task)
                .end((err, res) => {
                    res.should.have.status(406);
                done();
                });
            });
        });

        describe('max deadline', () => {
            it('it should not POST a task when "deadline" field value greaten than 23', (done) => {
                const task = {
                    name: 'test',
                    deadline: 25,
                    description: "test description"
                }
                chai.request(server)
                .post('/api/plans')
                .send(task)
                .end((err, res) => {
                    res.should.have.status(406);
                done();
                });
            });
        });

        describe('save task', () => {
            it('it should POST a task', (done) => {
                const task = {
                    name: 'test',
                    deadline: 23,
                    description: "test description"
                }
                chai.request(server)
                .post('/api/plans')
                .send(task)
                .end((err, res) => {
                    res.should.have.status(200);
                done();
                });
            });
        });
    });

    describe('/PUT task', () => {
        lastTask = {};
        before((done) => {
            pool.query('SELECT * FROM plans LIMIT 1')
            .then((data) => {
                lastTask = data.rows.pop();
                done();
            }) 
        });
        describe('without id', () => {
            it('it should not PUT a task without id in request query', (done) => {
                const task = {
                    name: 'updated test',
                    deadline: 13,
                    description: "updated test description"
                }
                chai.request(server)
                .put('/api/plans/')
                .send(task)
                .end((err, res) => {
                    res.should.have.status(404);
                done();
                });
            });
        });
        describe('with incorrect id', () => {
            it('it should not PUT a task with incorrect id in request query', (done) => {
                const task = {
                    name: 'incorrect test',
                    deadline: 13,
                    description: "incorrect test description"
                }
                chai.request(server)
                .put('/api/plans/' + 'incorrectidasjnfojabnwo3uho98w')
                .send(task)
                .end((err, res) => {
                    res.should.have.status(500);
                done();
                });
            });
        });
        describe('not fully obj', () => {
            it('it should not PUT a task with empty body', (done) => {
                const task = {}
                chai.request(server)
                .put('/api/plans/' + lastTask.id)
                .send(task)
                .end((err, res) => {
                    res.should.have.status(406);
                done();
                });
            });
            it('it should not PUT a task without "name" field', (done) => {
                const task = {
                    deadline: 22,
                    description: "test description"
                }
                chai.request(server)
                .put('/api/plans/' + lastTask.id)
                .send(task)
                .end((err, res) => {
                    res.should.have.status(406);
                done();
                });
            });
            it('it should not PUT a task without "description" field', (done) => {
                const task = {
                    name: "test",
                    deadline: 22
                }
                chai.request(server)
                .put('/api/plans/' + lastTask.id)
                .send(task)
                .end((err, res) => {
                    res.should.have.status(406);
                done();
                });
            });
            it('it should not PUT a task without "deadline" field', (done) => {
                const task = {
                    name: "test",
                    description: "test description"
                }
                chai.request(server)
                .put('/api/plans/' + lastTask.id)
                .send(task)
                .end((err, res) => {
                    res.should.have.status(406);
                done();
                });
            });
        });

        describe('incorrect type', () => {
            it('it should not PUT a task with incorrect type of "name" field', (done) => {
                const task = {
                    name: 22,
                    deadline: 22,
                    description: "test description"
                }
                chai.request(server)
                .put('/api/plans/' + lastTask.id)
                .send(task)
                .end((err, res) => {
                    res.should.have.status(406);
                done();
                });
            });
            it('it should not PUT a task with incorrect type of "description" field', (done) => {
                const task = {
                    name: 'test',
                    deadline: 22,
                    description: 22
                }
                chai.request(server)
                .put('/api/plans/' + lastTask.id)
                .send(task)
                .end((err, res) => {
                    res.should.have.status(406);
                done();
                });
            });
            it('it should not PUT a task with incorrect type of "deadline" field', (done) => {
                const task = {
                    name: 'test',
                    deadline: 'twenty two',
                    description: "test description"
                }
                chai.request(server)
                .put('/api/plans/' + lastTask.id)
                .send(task)
                .end((err, res) => {
                    res.should.have.status(406);
                done();
                });
            });
        });

        describe('max deadline', () => {
            it('it should not PUT a task when "deadline" field value greaten than 23', (done) => {
                const task = {
                    name: 'test',
                    deadline: 25,
                    description: "test description"
                }
                chai.request(server)
                .put('/api/plans/' + lastTask.id)
                .send(task)
                .end((err, res) => {
                    res.should.have.status(406);
                done();
                });
            });
        });

        describe('update task', () => {
            it('it should PUT a task', (done) => {
                const task = {
                    name: 'updated test',
                    deadline: 13,
                    description: "updated test description"
                }
                chai.request(server)
                .put('/api/plans/' + lastTask.id)
                .send(task)
                .end((err, res) => {
                    res.should.have.status(200);
                done();
                });
            });
        });
    });
    describe('/DELETE task', () => {
        lastTask = {};
        before((done) => {
            pool.query('SELECT * FROM plans LIMIT 1')
            .then((data) => {
                lastTask = data.rows.pop();
                done();
            }) 
        });
        describe('without id', () => {
            it('it should not DELETE a task without id in request query', (done) => {
                chai.request(server)
                .delete('/api/plans/')
                .end((err, res) => {
                    res.should.have.status(404);
                done();
                });
            });
        });
        describe('delete task', () => {
            it('it should DELETE a task', (done) => {
                chai.request(server)
                .delete('/api/plans/' + lastTask.id)
                .end((err, res) => {
                    res.should.have.status(200);
                done();
                });
            });
        });
    });
});
// describe('Tasks in PostgreSQL', () => {
//         beforeEach((done) => {
//             dbRef.remove()
//             .then(() => { 
//                done();         
//             });     
//         });
    
//         describe('/GET tasks', () => {
//             it('it should GET all the tasks', (done) => {
//                 chai.request(server)
//                 .get('/api/plans')
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.be.a('array');
//                     res.body.length.should.be.eql(0);
//                     done();
//                 });
//             });
//         });
// });
