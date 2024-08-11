const request = require("supertest");
const app = require("../../app");
const Featured = require("../../database/models/Featured");
const { FeaturedDemo } = require("../../constants");

jest.mock("../../database/models/Featured");


describe("Featured Test",()=>{
    it("GET /featured/getByID/:id Success",async()=>{
        Featured.findById.mockImplementation(()=>(FeaturedDemo))

        let response = await request(app).get("/featured/getByID/1")

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty("success", true)
        expect(response.body.featured).toMatchObject(FeaturedDemo)
    })

    it("GET /featured/getByID/:id Failure - Featured Not FOund",async()=>{
        Featured.findById.mockImplementation(()=>(null))

        let response = await request(app).get("/featured/getByID/2")

        expect(response.statusCode).toBe(404)
        expect(response.body).toHaveProperty("success", false)
        expect(response.body).toHaveProperty("msg", "Featured Not Found")
    })
})