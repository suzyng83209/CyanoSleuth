const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const Cloudinary = require("./src/server/Cloudinary");
const colorUtils = require("./src/server/colorUtils");
const colorData = require("./src/server/colorData");
import { db, auth } from "./src/firebase"; // oops es6 in my node

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
        .then(Cloudinary.getColors) // returned as an array of hex color strings
        .then(colorObjs => {
          console.log(
            `<-------------- UPLOADING ${colorObjs.length} RESULTS TO FIREBASE -------------->`
          );
          colorObjs.map((c, i) => {
            switch(i) {
              case 0:
                const hex_match = colorUtils.findClosestColor(colorUtils.nitrate60Colors, c.hex);
                c.hex_match = hex_match;
                c.ppm = colorData.nitrate_60s[hex_match];
                break;
              
              case 1:
                const hex_match = colorUtils.findClosestColor(colorUtils.nitrate30Colors, c.hex);
                c.hex_match = hex_match;
                c.ppm = colorUtils.nitrate_30s[hex_match];
                break;

              case 2:
                const hex_match = colorUtils.findClosestColor(colorUtils.phosphateColors, c.hex);
                c.hex_match = hex_match;
                c.ppm = colorUtils.phosphate[hex_match];
                break;

              default:
                c.hex_match = null;
                c.ppm = null;
            }

            return c;
          })
          const userInfo = {};
          auth.onAuthStateChanged(user => {
            if (user) {
              userInfo = user;
            }
          });

          db.ref("water-data/").set({
            date: new Date(),
            uid: userInfo.uid,
            email: userInfo.email,
            nitrate60s: colorObjs[0],
            nitrate30s: colorObjs[1],
            phosphate: colorObjs[2],
            bloom: null,
            coordinates: req.body.coordinates
          });
          res.send(data);
        });
    });

    app.get("/*", function(_, res) {
      res.sendFile(indexPath);
    });

    return app;
  }
};
