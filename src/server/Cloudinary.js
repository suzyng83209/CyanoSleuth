var cloudinary = require("cloudinary");
var Promise = require("bluebird");

exports.uploadFiles = function(files) {
  const urlArray = [];
  return Promise.all(
    files.map(file => {
      cloudinary.v2.uploader.upload(file, (error, result) => {
        urlArray.concat(result.url);
      });
    })
  ).then(() => urlArray);
};
