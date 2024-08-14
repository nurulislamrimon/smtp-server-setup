const SMTPServer = require("smtp-server").SMTPServer;

const port = 25;
const server = new SMTPServer({
  allowInsecureAuth: true,
  authOptional: true,
  onConnect(session, callback) {
    console.log("Connected to the session ", +session.id);
    callback();
  },
  onMailFrom(address, session, callback) {
    console.log("Mail from: " + address.address, "session id " + session.id);
    callback();
  },
  onRcptTo(address, session, callback) {
    console.log("Rcpt to: " + address.address, "session id " + session.id);
    callback();
  },

  onData(stream, session, callback) {
    stream.on("data", (data) => {
      console.log("Data " + data.toString());
    });
    stream.on("end", () => {
      console.log("Data end");
    });
  },
});

server.listen(port, () => {
  console.log("Server is running on port " + port);
});
