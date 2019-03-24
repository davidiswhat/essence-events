var should = require('should'), 
    mongoose = require('mongoose'), 
    Account = require('../models/account.model'), 
    config = require('../config/config');

account = {
    email: "bill@gmail.com",
    password: "epic_meme",
};

describe('Account schema tests', function () {
    before(function(done) {
        mongoose.connect(config.db.uri);
        done();
    });

    describe("Saving to DB",  function() {
            
        /*
        Mocha's default timeout for tests is 2000ms. To ensure that the tests do not fail 
        prematurely, we can increase the timeout setting with the method this.timeout()
        */
        this.timeout(5000);

        it('saves properly when email and password are provided', function(done){
            new Account(account).save(function(err, acc){
                should.not.exist(err);
                id = acc._id;
                console.log("saved with id " + id);
                done();
            });
        });

        it('does not save if email is redundant', function(done){
            new Account(account).save(function(err, acc){
                should.not.exist(err);
                id = acc._id;
                console.log("saved with id " + id);
                new Account(account).save(function(err, fail){
                    should.exist(err);
                    done();
                });
            });
        });

        it('throws an error when email not provided', function(done){
            new Account({pass: "memeams"}).save(function(err){
                should.exist(err);
                done();
            })
        });
    });

    afterEach(function(done) {
        if(id) {
          Account.remove({ _id: id }).exec(function() {
            console.log("deleting id " + id);
            id = null;
            done();
          });
        } else {
          done();
        }
      });
});