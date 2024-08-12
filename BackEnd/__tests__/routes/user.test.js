const request = require("supertest");
const app = require("../../app");
const User = require("../../database/models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { DemoUser, AllDemoUsers, DemoAdminUser } = require("../../constants");

jest.mock("../../database/models/User");

describe("User Tests", () => {
  beforeAll(() => {
  });

  describe("POST /createuser",()=>{
    it("Success", async () => {
      jest.spyOn(bcrypt, "genSalt").mockResolvedValue("salt");
      jest.spyOn(bcrypt, "hash").mockResolvedValue("hashedPassword");
      jest.spyOn(jwt, "sign").mockResolvedValue("authtoken");
      User.findOne.mockImplementation(() => (false));
      User.create.mockImplementation(() => (DemoUser));
  
      const response = await request(app)
        .post("/users/createuser")
        .send({
          firstName: DemoUser.firstName,
          lastName: DemoUser.lastName,
          email: DemoUser.email,
          mobile: DemoUser.mobile,
          password: "password",
          address: DemoUser.address,
          landmark: DemoUser.landmark,
          city: DemoUser.city,
          state: DemoUser.state,
          country: DemoUser.country,
          pincode: DemoUser.pincode
        });
  
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("success", true);
      expect(response.body).toHaveProperty("authtoken", "authtoken");
      expect(response.body.userInfo).toMatchObject({
        id: 1,
        firstName: DemoUser.firstName,
        lastName: DemoUser.lastName,
        email: DemoUser.email,
        mobile: DemoUser.mobile,
        address: DemoUser.address,
        landmark: DemoUser.landmark,
        city: DemoUser.city,
        state: DemoUser.state,
        country: DemoUser.country,
        pincode: DemoUser.pincode,
        isAdmin: false,
        previousTransaction: []
      });
    });
  
    it("Failure - Email Already Exists", async () => {
      User.findOne.mockImplementation(() => (DemoUser));
  
      const response = await request(app)
        .post("/users/createuser")
        .send({
          firstName: DemoUser.firstName,
          lastName: DemoUser.lastName,
          email: DemoUser.email,
          mobile: DemoUser.mobile,
          password: DemoUser.password,
          address: DemoUser.address,
          landmark: DemoUser.landmark,
          city: DemoUser.city,
          state: DemoUser.state,
          country: DemoUser.country,
          pincode: DemoUser.pincode
        });
  
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("success", false);
      expect(response.body).toHaveProperty("msg","User already exists");
    });
  })


  describe("GET /get-users",()=>{
    it("Success",async()=>{
      jest.spyOn(jwt, "verify").mockResolvedValue({user:{id:1}});
  
      User.find.mockImplementation(()=>(AllDemoUsers))
      
      User.findById.mockImplementation(()=>(DemoAdminUser))
  
      let response = await request(app).get("/users/get-users").set("authtoken","authtoken")
  
      expect(response.statusCode).toBe(200);
  
      // console.log(await response.body)
    })
  })


  describe("POST /login",()=>{
    it("Success",async()=>{
        jest.spyOn(bcrypt, "compare").mockResolvedValue(true);
        jest.spyOn(jwt, "sign").mockResolvedValue("authtoken");
    
        User.findOne.mockImplementation(() => (DemoUser));
    
        let response = await request(app).post("/users/login").send({email:DemoUser.email,password:DemoUser.password})
    
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("success",true);
        expect(response.body).toHaveProperty("authtoken", "authtoken");
        expect(response.body.userInfo).toMatchObject({
          id: 1,
          firstName: DemoUser.firstName,
          lastName: DemoUser.lastName,
          email: DemoUser.email,
          mobile: DemoUser.mobile,
          address: DemoUser.address,
          landmark: DemoUser.landmark,
          city: DemoUser.city,
          state: DemoUser.state,
          country: DemoUser.country,
          pincode: DemoUser.pincode,
          isAdmin: false,
          previousTransaction: []
        });
    })
    
    it("Failure - User Does Not Exists",async()=>{
      jest.spyOn(bcrypt, "compare").mockResolvedValue(true);
      jest.spyOn(jwt, "sign").mockResolvedValue("authtoken");
  
      User.findOne.mockImplementation(() => (undefined));
  
      let response = await request(app).post("/users/login").send({email:DemoUser.email,password:DemoUser.password})
  
      expect(response.body).toHaveProperty("success",false);
      expect(response.body).toHaveProperty("msg", "Invalid Credentials");
    })
  
    it("Failure - Invalid Credentials - Wrong Password",async()=>{
      jest.spyOn(bcrypt, "compare").mockResolvedValue(false);
  
      User.findOne.mockImplementation(() => (DemoUser));
  
      let response = await request(app).post("/users/login").send({email:DemoUser.email,password:DemoUser.password})
  
      expect(response.body).toHaveProperty("success",false);
      expect(response.body).toHaveProperty("error", "Invalid Credentials");
    })
  })

  afterAll(()=>{
    User.mockReset();
    User.create.mockReset();
  })
});
