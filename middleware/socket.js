const jwt = require("jsonwebtoken");

//Middleware for verifying json webtoken
function authentication(socket, next) {
  console.log(socket.handshake.headers.authorization);
  if (socket.handshake.headers.authorization) {
    console.log("key : " + socket.handshake.headers.authorization);
    jwt.verify(
      socket.handshake.headers.authorization,
      process.env.SECRET_KEY,
      function (err, decoded) {
        if (err) {
          console.log("invalid key");
          return next(new Error("Authentication error"));
        }
        socket.decoded = decoded;
        console.log("verified");
        next();
      }
    );
  } else {
    console.log("Key not found");
    next(new Error("Authentication error"));
  }
}

module.exports = { authentication };
