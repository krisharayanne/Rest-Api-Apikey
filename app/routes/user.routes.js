module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const ipFilter = require("../controllers/ipFilter.js"); 
  
    var router = require("express").Router();

    // Authenticate User 
    router.get("/authenticateUser", ipFilter.verifyClientIP, users.authenticateUser);

    // Verify Answer to Math Equation, then ? Register User
    router.post("/registerUser", ipFilter.verifyClientIP, users.registerUser);

    // Verify API Key valid, then ? Generate Access Token
    router.post("/generateAccessToken", ipFilter.verifyClientIP, users.generateAccessToken);

    // // Create a new Tutorial
    // router.post("/", tutorials.create);
  
    // // Retrieve all Tutorials
    // router.get("/", tutorials.findAll);
  
    // // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllPublished);
  
    // // Retrieve a single Tutorial with id
    // router.get("/:id", tutorials.findOne);
  
    // // Update a Tutorial with id
    // router.put("/:id", tutorials.update);
  
    // // Delete a Tutorial with id
    // router.delete("/:id", tutorials.delete);
  
    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);
  
    app.use('/api/users', router);
  };