const app = require("../app");
const request = require("supertest");

describe("Server",()=>{
    it("Starting Server",done=>{
        request(app)
        .get("/")
        .then(res=>{
            expect(res.statusCode).toBe(200);
            done();
        })
    })
})