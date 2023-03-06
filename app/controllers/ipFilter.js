
// verify public external ipv4 address of client calling this API server
function verifyClientIP(req, res, next) {

    // should be likwid marketplace staging/production ip addresses
    // currently is my device ip address
   const trustedIps = ['202.186.81.105','13.250.0.107'];

   // start manual IP extraction without ipaddr.js library
   // declare clientIP
   let clientIP;

   let requestIP = req.header('x-forwarded-for');
   if(requestIP) {
    clientIP = requestIP.split(',')[0];  
   }
   else {
    let extractedIP = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
     console.log("Extracted IP: " + extractedIP);
     clientIP = extractedIP;

     // check if extractedIP is defined or undefined
     if(extractedIP) {
      // if true, check if extracted ip is in ipv4 or ipv6 version 
     // if in ipv6, convert to ipv4,
     // assign ipv4 address to clientIP variable
     }
       
   }
   // end manual IP extraction without ipaddr.js library

   console.log("IP Filter Middleware!");
   console.log("requestIP from IP Filter Middleware: " + requestIP);
   console.log("clientIP from IP Filter Middleware: " + clientIP);
   if(trustedIps.indexOf(clientIP) >= 0) {
 
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