const DemoUser = {
    id: 1,
    firstName: "Demo",
    lastName: "User",
    email: "demouser@devil.com",
    mobile: "1432653271",
    password: "password",
    address: "ABC Soc.",
    landmark: "PQR Travels",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    pincode: "411056",
    isAdmin: false,
    previousTransactions: [],
    save: jest.fn().mockResolvedValue(true)
}

const DemoAdminUser = {
    id: 1,
    firstName: "DemoAdmin",
    lastName: "User",
    email: "demoadminuser@devil.com",
    mobile: "1432623271",
    password: "hashedPassword",
    address: "ABC Soc.",
    landmark: "PQR Travels",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    pincode: "411056",
    isAdmin: true,
    previousTransactions: [],
    save: jest.fn().mockResolvedValue(true)
}

const AllDemoUsers = [
    {
        id: 1,
        firstName: "Demo",
        lastName: "User",
        email: "demouser@devil.com",
        mobile: "1432653271",
        password: "hashedPassword",
        address: "ABC Soc.",
        landmark: "PQR Travels",
        city: "Pune",
        state: "Maharashtra",
        country: "India",
        pincode: "411056",
        isAdmin: false,
        previousTransactions: [],
    },
    {
        id: 2,
        firstName: "Demo",
        lastName: "User2",
        email: "demouser2@devil.com",
        mobile: "1432653171",
        password: "hashedPassword",
        address: "ABC Soc.",
        landmark: "PQR Travels",
        city: "Pune",
        state: "Maharashtra",
        country: "India",
        pincode: "411056",
        isAdmin: false,
        previousTransactions: [],
    },
    {
        id: 3,
        firstName: "Demo",
        lastName: "User3",
        email: "demouser3@devil.com",
        mobile: "1432653371",
        password: "hashedPassword",
        address: "ABC Soc.",
        landmark: "PQR Travels",
        city: "Pune",
        state: "Maharashtra",
        country: "India",
        pincode: "411056",
        isAdmin: false,
        previousTransactions: [],
    }
]

const FeaturedDemo = {
    id:1,
    title: "Featured1",
    thumbnail: "/featured1.jpg",
    destURL: "/featured"
}

const DemoFeaturedAdd = {
    id:1,
    title: "Featured1",
    thumbnail: "/featured1.jpg",
    destURL: "/featured",
    save: jest.fn().mockResolvedValue(true)
}

module.exports = {DemoUser,DemoAdminUser,AllDemoUsers,FeaturedDemo,DemoFeaturedAdd}
