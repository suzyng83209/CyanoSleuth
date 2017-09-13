const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const Cloudinary = require("./src/server/Cloudinary");

module.exports = {
  app: function() {
    const app = express();
    const indexPath = path.join(__dirname, "index.html");
    const publicPath = express.static(path.join(__dirname, "public"));

    app.use(bodyParser.json({ limit: "50mb" }));

    app.use("/public", publicPath);
    app.post("/api/upload", (req, res) => {
      console.log(
        `<-------------- UPLOADING ${req.body.imgData
          .length} TO CLOUDINARY -------------->`
      );
      Cloudinary.uploadFiles(req.body.imgData)
        .then(Cloudinary.getColors)
        .then(data => res.send(data));
    });

    app.get("/*", function(_, res) {
      res.sendFile(indexPath);
    });

    return app;
  }
};
