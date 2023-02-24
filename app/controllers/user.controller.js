const UniqueStringGenerator = require('unique-string-generator');
var jwt = require('jsonwebtoken');
const authenticationRequests = require('./storage').authenticationRequests; 
const endUsers = require('./storage').endUsers;
require("dotenv").config();

// Authenticate User
exports.authenticateUser = (req, res) => {

  // Generate requestID
  let requestID = UniqueStringGenerator.UniqueStringId();

  // Generate authenticationMessage
  let authenticationMessage = Math.floor(Math.random() * 1000000);;
  console.log("authenticationMessage: " +  authenticationMessage);

  // Store requestID and authenticationMessage in server storage file
  let authenticationRequest = {
    requestID: requestID,
    authenticationMessage: authenticationMessage,
  };
  authenticationRequests.push(authenticationRequest);

  // Return requestID and encrypted authenticationMessage
  res.status(200).send({
    requestID: requestID,
    authenticationMessage: authenticationMessage,
  });
  
  // Math equation = x^3 + y^3 + z^3 + a
  // x is the random number given
  // y is the random number * 2
  // z is the sum of x + y
  // a is the constant, 1357
};

const genAPIKey = () => {
  //create a base-36 string that contains 30 chars in a-z,0-9
  return [...Array(30)]
    .map((e) => ((Math.random() * 36) | 0).toString(36))
    .join('');
};

// Register User
exports.registerUser = (req, res) => {
  // req.body must have requestID, answer = answerToStandardMathEquation, username
  let requestID = req.body.requestID; // Retrieve requestID from req.body
  let requestObject = authenticationRequests.find((authenticationRequest) => authenticationRequest.requestID == requestID);
  if(requestObject) { // start first if statement
    let x = parseInt(requestObject.authenticationMessage);
    let y = x * 2;
    let z = x + y;
    let a = 1357;
    let answerObtained = Math.pow(x, 3) + Math.pow(y, 3) + Math.pow(z, 3) + a;
    console.log("answerObtained: " + answerObtained);
    if(answerObtained == req.body.answer) { // start second if statement

      let endUser = {
        userID: Date.now(),
        username: req.body.username,
        apiKey: genAPIKey(),
      };

      endUsers.push(endUser);

      // Return endUser object
      res.status(200).send(endUser);

    } // end second if statement
    else {
      res.status(400).send({
        message: "Answer is wrong!"
      });
    }
  } // end first if statement
};

// Generate Access Token
exports.generateAccessToken = (req, res) => {
  // req.body must have apiKey
  // Verify that API key is valid
  let apiKey = req.body.apiKey; // Retrieve apiKey from req.body
  let userObject = endUsers.find((endUser) => endUser.apiKey == apiKey);
  if(userObject) { // start first if statement

    // Generate JWT Access Token that expires in 22 minutes
    var privateKey = Buffer.from(process.env.PRIVATE_KEY, 'base64').toString('ascii');
    var token = jwt.sign({ userID: userObject.userID }, privateKey, { algorithm: 'RS256', expiresIn: 1320 });

    // Return JWT Access Token
    res.status(200).send({
      accessToken: token,
    });

  } // end first if statement
  else {
    res.status(400).send({
      message: "Invalid API Key!"
    });
  }

};

// Create and Save a new Tutorial
exports.create = (req, res) => {
    res.status(200).send({
        message: "Create!"
      });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
    res.status(200).send({
        message: "Find All!"
      });
};

// Find a single Tutorial with a id
exports.findOne = (req, res) => {
    res.status(200).send({
        message: "Find One!"
      });
};

// find all published Tutorials
exports.findAllPublished = (req, res) => {
    res.status(200).send({
        message: "Find All Published!"
      });
};

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
    res.status(200).send({
        message: "Update!"
      });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    res.status(200).send({
        message: "Delete!"
      });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    res.status(200).send({
        message: "Delete All!"
      });
};