var should = require('should'), 
    request = require('supertest'), 
    express = require('../config/express'),
    Account = require('../models/account.model');

var app, agent, acc, id;

describe('Account authentication tests', function () {

    this.timeout(10000);

    before (function(done) {
        app = express.init();
        agent = request.agent(app);

        done();
    });

    it('should be able to create an account', function(done) {
        var acc = {
          email: "bill@gmail.com",
          password: "epic password",
          phoneNum: "555-5555",
          passwordConf: "epic password"
        }
        agent.post('/api/authenticate')
          .send(acc)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            should.exist(res.body._id);
            id = res.body._id;
            done();
          });
      });
    
    it('should not create an account if passwords don\'t match', function(done) {
        var acc = {
            email: "bill@gmail.com",
            password: "epic psword",
            passwordConf: "epic password",
            phoneNum: "555-5555"
        }
        agent.post('/api/authenticate')
        .send(acc)
        .expect(400)
        .end(function(err, res) {
            should.exist(res);
            done();
        });
    });

    it('should allow users to login', function(done) {
        var acc = {
            email: "sam@gmail.com",
            password: "epic password",
            passwordConf: "epic password",
            phoneNum:"555-5555"
        }
        agent.post('/api/authenticate')
        .send(acc)
        .expect(200)
        .end(function(err, res) {
            should.exist(res);
            id = res.body._id;
            var login = {
                logemail: "sam@gmail.com",
                logpassword: "epic password"
            };
            agent.post("/api/authenticate")
            .send(login)
            .expect(302)
            .end(function(err, res) {
                should.not.exist(err);
                done();
            })
        });
    });

    it('should not be able to create an account', function(done) {
        var acc = {
          email: "bill@gmail.com",
          password: "epic password",
          passwordConf: "epic password"
        }
        agent.post('/api/authenticate')
        .send(acc)
        .expect(400)
        .end(function(err, res) {
            should.exist(res);
            done();
        });
    });
    
    after(function(done) {
    if(id) {
        User.remove({_id: id}, function(err){
        if(err) throw err;
        done();
        })
    }
    else {
        done();
    }
    });
});