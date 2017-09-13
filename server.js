const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const Cloudinary = require("./src/server/Cloudinary");
const colorUtils = require("./src/server/colorUtils");
const colorData = require("./src/server/colorData");

// function mapColorsToPpms(colors) {
//   const key_n60 = colorUtils.findClosestColor(
//     colorUtils.nitrate60Colors,
//     colors[0]
//   );
//   const key_n30 = colorUtils.findClosestColor(
//     colorUtils.nitrate30Colors,
//     colors[1]
//   );
//   const key_p = colorUtils.findClosestColor(
//     colorUtils.phosphateColors,
//     colors[2]
//   );
//   return [
//     colorData.nitrate_60s[key_n60],
//     colorData.nitrate_30s[key_n30],
//     colorData.phosphate[key_p],
//     null
//   ];
// }

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
      Cloudinary.uploadFiles(req.body.imgData) // uploaded in the order nitrate60s, nitrate30s, phosphate, bloom
        .then(
          imgData =>
            new Promise(resolve => resolve(Cloudinary.getColors(imgData)))
        )
        .then(colors => {
          console.log(
            `<-------------- CONVERTING ${colors.length} RESULTS  -------------->`
          );
          for (var i = 0; i < colors.length; i += 1) {
            var hex_match = null;
            if (colors[i]) {
              console.log("Starting color conversion process for ", colors[i]);
              hex_match = colorUtils.findClosestColor(
                colorUtils.colorsArray[i],
                colors[i].hex
              );
              colors[i].hex_match = hex_match;
              colors[i].ppm = colorData.ppms[i][hex_match];
              colors[i].index = Object.keys(colorData.ppms[i]).indexOf(hex_match);
            }
          }

          res.send(colors);
        });
    });

    app.get("/*", function(_, res) {
      res.sendFile(indexPath);
    });

    return app;
  }
};
