const request = require("supertest");

const server = require('../api/server');

describe("router", function() {
  it("should run the tests", function() {
    expect(true).toBe(true);
  });

  describe("POST /api/auth/login", function() {
    it("should return 500 for no credentials", function() {
      return request(server)
        .post("/api/auth/login")
        .then(res => {
          expect(res.status).toBe(500);
        }); 
    });

    it("should return 200", function() {
      return request(server)
        .post("/api/auth/login")
        .send({username:'test100', password:'test100', })
        .set('Accept', 'application/json')
        .then(res => {
          expect(res.status).toBe(200);
        }); 
    });
    
    it("should return 401", function() {
      return request(server)
        .post("/api/auth/login")
        .send({username:'fail', password:'fail', })
        .set('Accept', 'application/json')
        .then(res => {
          expect(res.status).toBe(401);
        }); 
    });

  })

  describe("POST /api/auth/register", function() {
    it("should return 500 for no credentials", function() {
      return request(server)
        .post("/api/auth/register")
        .then(res => {
          expect(res.status).toBe(500);
        }); 
    });

    it("should return 201", function() {
      return request(server)
        .post("/api/auth/register")
        .send({username:`${Date.now()}`, password:`${Date.now()}`, })
        .set('Accept', 'application/json')
        .then(res => {
          expect(res.status).toBe(201);
        }); 
    });
    
  })
})