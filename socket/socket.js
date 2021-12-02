const { onConnect } = require("../controllers/socketController");
const { authentication } = require("../middleware/socket");

//socket setup
exports = module.exports = function (io) {
  io.use(authentication);

  io.sockets.on("connection", onConnect);
};
