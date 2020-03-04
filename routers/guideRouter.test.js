const request = require("supertest");

const server = require('../api/server');

describe("router", function() {
  it("should run the tests", function() {
    expect(true).toBe(true);
  });

  describe("GET /api/guides", function() {
    it("should return 200", function() {
      return request(server)
        .get("/api/guides")
        .then(res => {
          expect(res.status).toBe(200);
        }); 
    });
  })

  describe("GET /api/guides/:id", function() {
    it("should return 200", function() {
      return request(server)
        .get("/api/guides/1")
        .then(res => {
          expect(res.status).toBe(200);
        }); 
    });
    it("should return 500", function() {
      return request(server)
        .get("/api/guides/100")
        .then(res => {
          expect(res.status).toBe(500);
        }); 
    });
  })

  describe("GET /api/guides/users/:id", function() {
    it("should return 200", function() {
      return request(server)
        .get("/api/guides/users/1")
        .then(res => {
          expect(res.status).toBe(200);
        }); 
    });
  })

  describe("POST /api/guides", function() {
    it("should return 200", function() {
      return request(server)
        .post("/api/guides")
        .send({
          guide_name:`${Date.now()}`,
          user_id: '7',
          category:'Testing',
          img_url:'https://picsum.photos/200',
          score:100,
          description:'Test'
        })
        .set('Accept', 'application/json')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxMDAiLCJ1c2VyX2lkIjo3LCJpYXQiOjE1ODMzNDY4MDMsImV4cCI6MTU4MzQzMzIwM30.ppYTbiJf1Exuh4aHPxf6pj7ytHaVk0zVMur1gGkplFg')
        .then(res => {
          expect(res.status).toBe(201);
        }); 
    });

    it("should return 400 for invalid guide body", function() {
      return request(server)
        .post("/api/guides")
        .send({
          user_id: '7',
          category:'Testing',
          img_url:'https://picsum.photos/200',
          score:100,
          description:'Test'
        })
        .set('Accept', 'application/json')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxMDAiLCJ1c2VyX2lkIjo3LCJpYXQiOjE1ODMzNDY4MDMsImV4cCI6MTU4MzQzMzIwM30.ppYTbiJf1Exuh4aHPxf6pj7ytHaVk0zVMur1gGkplFg')
        .then(res => {
          console.log(res.text)
          expect(res.status).toBe(400);
        }); 
    });

    it("should return 400 for no user credentials", function() {
      return request(server)
        .post("/api/guides")
        .send({
          guide_name:`${Date.now()}`,
          user_id: '7',
          category:'Testing',
          img_url:'https://picsum.photos/200',
          score:100,
          description:'Test'
        })
        .set('Accept', 'application/json')
        .then(res => {
          console.log(res.text)
          expect(res.status).toBe(400);
        }); 
    });

  })

describe("PUT /api/guides/:id", function() {
    it("should return 200", function() {
      return request(server)
        .put("/api/guides/6")
        .send({
          id:6,
          guide_name:`Test Edit`,
          user_id: '7',
          category:'Testing',
          img_url:'https://picsum.photos/200',
          score:100,
          description:'Test'
        })
        .set('Accept', 'application/json')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxMDAiLCJ1c2VyX2lkIjo3LCJpYXQiOjE1ODMzNDY4MDMsImV4cCI6MTU4MzQzMzIwM30.ppYTbiJf1Exuh4aHPxf6pj7ytHaVk0zVMur1gGkplFg')
        .then(res => {
          console.log(res.text)
          expect(res.status).toBe(202);
        }); 
    });

    it("should return 400 for invalid guide ID", function() {
      return request(server)
        .put("/api/guides/6")
        .send({
          id:7,
          user_id: '7',
          category:'Testing'
        })
        .set('Accept', 'application/json')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxMDAiLCJ1c2VyX2lkIjo3LCJpYXQiOjE1ODMzNDY4MDMsImV4cCI6MTU4MzQzMzIwM30.ppYTbiJf1Exuh4aHPxf6pj7ytHaVk0zVMur1gGkplFg')
        .then(res => {
          console.log(res.text)
          expect(res.status).toBe(400);
        }); 
    });

    it("should return 400 for invalid guide body", function() {
      return request(server)
        .put("/api/guides/6")
        .send({
          id:6
        })
        .set('Accept', 'application/json')
        .then(res => {
          console.log(res.text)
          expect(res.status).toBe(400);
        }); 
    });

    it("should return 400 for invalid user credentials", function() {
      return request(server)
        .put("/api/guides/6")
        .send({
          id:6,
          guide_name:`Test Edit`,
          user_id: '7',
          category:'Testing',
          img_url:'https://picsum.photos/200',
          score:100,
          description:'Test'
        })
        .set('Accept', 'application/json')
        .then(res => {
          console.log(res.text)
          expect(res.status).toBe(400);
        }); 
    });

  })

})