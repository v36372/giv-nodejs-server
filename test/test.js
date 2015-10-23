var assert = require('assert')
var express = require('..')
var request = require('supertest')

describe('app', function(){
  it('should return ok without route', function(done){
    request(express())
    .get('/')
    .expect(200, done);
  })
})
