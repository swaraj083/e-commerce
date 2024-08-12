const request = require("supertest");
const app = require("../../app");
const Featured = require("../../database/models/Featured");
const User = require("../../database/models/User");
const { FeaturedDemo, DemoAdminUser, DemoFeaturedAdd } = require("../../constants");
const jwt = require('jsonwebtoken');
jest.mock("../../database/models/Featured");
jest.mock("../../database/models/User");


describe("Featured Test",()=>{
    describe("GET /featured/getByID/:id",()=>{
        it("Success",async()=>{
            Featured.findById.mockImplementation(()=>(FeaturedDemo))
    
            let response = await request(app).get("/featured/getByID/1")
    
            expect(response.statusCode).toBe(200)
            expect(response.body).toHaveProperty("success", true)
            expect(response.body.featured).toMatchObject(FeaturedDemo)
        })
    
        it("Failure - Featured Not FOund",async()=>{
            Featured.findById.mockImplementation(()=>(null))
    
            let response = await request(app).get("/featured/getByID/2")
    
            expect(response.statusCode).toBe(404)
            expect(response.body).toHaveProperty("success", false)
            expect(response.body).toHaveProperty("msg", "Featured Not Found")
        })
    })

    describe("POST /featured/add",()=>{
        it("Success",async()=>{
            jest.spyOn(jwt,"verify").mockResolvedValue({user:{id:1}})
            User.findById.mockImplementation(()=>(DemoAdminUser))
            Featured.create.mockImplementation(()=>(DemoFeaturedAdd))

            let response = await request(app).post("/featured/add").set("authtoken","authtoken").send(DemoFeaturedAdd)

            expect(response.statusCode).toBe(200);
            expect(response.body).toMatchObject({
                success:true,
                featured:FeaturedDemo
            })
        })

        it("Failure - Not an Admin user",async()=>{
            jest.spyOn(jwt,"verify").mockResolvedValue(false)

            let response = await request(app).post("/featured/add").set("authtoken","authtoken").send(DemoFeaturedAdd)

            expect(response.statusCode).toBe(401);
            expect(response.body).toMatchObject({
                success:false, 
                error: "Please authenticate using a valid token" 
            })
        })
    })

    describe("DELETE /featured/delete/:id",()=>{
        it("Success",async()=>{
            jest.spyOn(jwt,"verify").mockResolvedValue({user:{id:1}})
            User.findById.mockImplementation(()=>(DemoAdminUser))
            Featured.findById.mockImplementation(()=>(FeaturedDemo))
            Featured.findByIdAndDelete(()=>(true))

            let response = await request(app).delete("/featured/delete/1").set("authtoken","authtoken")

            expect(response.statusCode).toBe(200)
            expect(response.body).toMatchObject({
                success:true,
                id:"1"
            })
        })

        it("Failure - Not an Admin user",async()=>{
            jest.spyOn(jwt,"verify").mockResolvedValue(false)

            let response = await request(app).delete("/featured/delete/1").set("authtoken","authtoken")

            expect(response.statusCode).toBe(401);
            expect(response.body).toMatchObject({
                success:false, 
                error: "Please authenticate using a valid token" 
            })
        })
    })
})