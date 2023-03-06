const express = require("express");
const cors = require("cors");
const ipaddr = require('ipaddr.js');

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  let remoteAddress = req.ip;
  if (ipaddr.isValid(req.ip)) {
    remoteAddress = ipaddr.process(req.ip).toString();
    console.log("remoteAddress using ipaddr library: " + remoteAddress);
  }
  res.json({
    remoteAddress,
    message: "Authenticate, Register User and Generate Access Token Server.",
  });
});

require("./app/routes/user.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});