var should = require('should'); 
var assert = require('assert');
var request = require('supertest');  
var mongoose = require('mongoose');
var winston = require('winston');
var app = require('../../../handlers/api/customer');
var bodyParser = require('body-parser');
var dbConfig = require('../../../config/db');

describe('customer handler', function() {
    before(function(done) {
        mongoose.connect(dbConfig.TEST_CONNECTION_STRING, function () {
            mongoose.connection.db.dropDatabase(function () {
                done();
            });
        });
    });

    describe('POST /', function() {
        it('should register a new customer', function(done) {
            var customer = {
                username: 'test_username',
                password: '123'
            };
            request(app)
                .post('/')
                .type('json')
                .send(customer)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.status.should.be.equal(201);
                    done();
                });
        });
    });

    describe('POST /token', function() {
        it('should return an authentication token', function(done) {
            var customer = {
                username: 'test_username',
                password: '123'
            };
            request(app)
                .post('/token')
                .type('json')
                .send(customer)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.status.should.be.equal(200);
                    res.body.should.have.property("token");
                    done();
                });
        });
    });

    after(function (done) {
        mongoose.connection.close(done);
    });
});