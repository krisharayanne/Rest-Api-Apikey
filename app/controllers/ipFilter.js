const ipaddr = require('ipaddr.js');

// verify public external ipv4 address of client calling this API server
function verifyClientIP(req, res, next) {

    // should be likwid marketplace staging/production ip addresses
    // currently is my device ip address
   const trustedIps = ['202.186.81.105','13.250.0.107','175.142.216.98', '203.106.115.210', '219.92.0.25'];

  // start automatic IP extraction with ipaddr.js library
  let remoteAddress = req.ip;
  if (ipaddr.isValid(req.ip)) {
    remoteAddress = ipaddr.process(req.ip).toString();
    console.log("remoteAddress using ipaddr library: " + remoteAddress);
  }
   // end automatic IP extraction with ipaddr.js library

   console.log("IP Filter Middleware!");
  //  console.log("requestIP from IP Filter Middleware: " + requestIP);
  //  console.log("clientIP from IP Filter Middleware: " + clientIP);
   if(trustedIps.indexOf(remoteAddress) >= 0) {
 
     // do stuff
     console.log("Message sent from trusted ip!");
     next();
 
   } else {
     // handle unallowed ip
     console.log("Message sent from unauthorized ip!");
     res.status(503).send({ message: "Forbidden" });
   }
 
 
 }

 module.exports = {
    verifyClientIP,
 }