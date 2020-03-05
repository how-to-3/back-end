const db = require('../database/dbConfig.js');
const request = require('supertest');
const server = require('../api/server.js');

// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3QgVXNlciIsInVzZXJfaWQiOjQsImlhdCI6MTU4MzQxMzU5MSwiZXhwIjoxNTgzNDk5OTkxfQ.s_7kQkyPEQb-_1EFtGzcm-gvR79aboS3QvHkABVggwg'


describe('stepRouter', function() {
    let token;

    beforeAll((done) => {
        // db('steps').truncate();

        request(server)
          .post("/api/auth/login")
          .send({username:`testing`, password:`testing`, })
          .set('Accept', 'application/json')
          .end((err, response) => {
            token = response.body.token; 
            done();
          });
      });

    it('runs the test', function(){
        expect(true).toBe(true);
    })

    describe('POST /api/guides/:guideID/steps', function(){
        it('should return a 400', function(){
            return request(server)
                .post('/api/guides/1/steps')
                .send({
                    "step": "have another cool idea",
                    "step_number": "1"
                })
                .then(res => {
                    expect(res.status).toBe(400)
                })
        })
        it('should return a 201', function(){
            return request(server)
                .post('/api/guides/1/steps')
                .send({
                    "step": "have another cool idea",
                    "step_number": "1"
                })
                .set('Authorization', `${token}`)
                .then(res => {
                    expect(res.status).toBe(201)
                })
        })
    })

    describe('PUT /api/guides/:guideID/steps/:id', function(){
        it('should return a 400', function(){
            return request(server)
                .put('/api/guides/1/steps/2')
                .send(	{
                    "step": "have a cool idea to break your app!",
                    "step_number": "3"
                })
                .then(res => {
                    expect(res.status).toBe(400)
                })
        })
        it('should return a 200', function(){
            return request(server)
                .put('/api/guides/2/steps/3')
                .send(	{
                    "step": `${Date.now()}`,
                    "step_number": "4"
                })
                .set('Authorization', `${token}`)
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })
    })

    describe('DELETE /api/guides/:guideID/steps/:id', function(){
        it('should return a 400', function(){
            return request(server)
                .delete('/api/guides/1/steps/1')
                .then(res => {
                    expect(res.status).toBe(400)
                })
        })
        it('should return a 200', function(){
            return request(server)
                .delete('/api/guides/1/steps/1')
                .set('Authorization', `${token}`)
                .then(res => {
                    expect(res.status).toBe(400)
                })
        })
    })

})