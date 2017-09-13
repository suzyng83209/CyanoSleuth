var colorData = require("./colorData");

exports.hexToRgb = hex => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
};

exports.calculateColorDistance = (hex1, hex2) => {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  const meanR = (rgb1.r + rgb2.r) / 2;
  const deltaR = Math.abs(rgb1.r - rgb2.r);
  const deltaG = Math.abs(rgb1.g - rgb2.g);
  const deltaB = Math.abs(rgb1.b - rgb2.b);

  return Math.sqrt(
    (((512 + meanR) * deltaR * deltaR) >> 8) +
      4 * deltaG * deltaG +
      (((767 - meanR) * deltaB * deltaB) >> 8)
  );
};

exports.findClosestColor = (colors, target) => {
  closestColor = colors[0];
  shortestDistance = calculateColorDistance(colors[0], target);
  for (color in colors) {
    const distance = calculateColorDistance(color, target);
    if (distance < shortestDistance) {
      closestColor = color;
      shortestDistance = distance;
    }
  }
  return closestColor;
};

exports.nitrate60s = "nitrate_60s";
exports.nitrate30s = "nitrage_30s";
exports.phosphate = "phosphate";

exports.nitrate60Colors = Object.keys(colorData[nitrate60s]);
exports.nitrate30Colors = Object.keys(colorData[nitrate30s]);
exports.phosphateColors = Object.keys(colorData[phosphate]);
