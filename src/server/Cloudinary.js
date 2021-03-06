var cloudinary = require("cloudinary");
var Promise = require("bluebird");

cloudinary.config({
  cloud_name: "suzyng83209",
  api_key: "226333178986368",
  api_secret: "vHQ9n49ViWfr6JVtUI5f5W5QGCA"
});

exports.uploadFiles = function(files) {
  const urlArray = [];
  var promises = files.map(file => {
    if (!file) return null;
    return cloudinary.v2.uploader.upload(file).then(result => result.public_id);
  });
  return new Promise.all(promises).then(publicIds => {
    console.log("Array of returned URLS", publicIds);
    return publicIds;
  });
};

exports.getColors = function(publicIds) {
  var promises = publicIds.map(id => {
    if (!id) return null;
    return cloudinary.api.resource(
      id,
      function(result) {
        return result;
      },
      { colors: true }
    );
  });

  return new Promise.all(promises).then(imgArray => {
    var filteredImages = [];
    for (var i = 0; i < imgArray.length; i += 1) {
      var filteredImage = null;
      if (imgArray[i]) {
        filteredImage = {
          id: imgArray[i].public_id,
          hex: imgArray[i].colors[0][0]
        };
      }
      filteredImages.push(filteredImage);
    }
    return filteredImages;
  });
};
