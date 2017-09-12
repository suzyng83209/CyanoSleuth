const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const Cloudinary = require("./src/server/Cloudinary");

module.exports = {
  app: function() {
    const app = express();
    const indexPath = path.join(__dirname, "index.html");
    const publicPath = express.static(path.join(__dirname, "public"));

    app.use(bodyParser.json());

    app.use("/public", publicPath);
    app.post("/api/upload", (req, res) => {
      res.send(req.body);
    });

    app.get("/*", function(_, res) {
      res.sendFile(indexPath);
    });

    return app;
  }
};
