var colorData = require("./colorData");

const hexToRgb = hex => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(removeHash(hex));
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
};

const removeHash = hexString => {
	return hexString.substring(1);
};

const calculateColorDistance = (hex1, hex2) => {
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

const findClosestColor = (colors, target) => {
  closestColor = colors[0];
  console.log("COLORS: ", colors.length);
  shortestDistance = calculateColorDistance(colors[0], target);
  for (index in colors) {
    var distance = calculateColorDistance(colors[index], target);
    if (distance < shortestDistance) {
      closestColor = colors[index];
      shortestDistance = distance;
    }
  }
  return closestColor;
};

const nitrate60s = "nitrate_60s";
const nitrate30s = "nitrage_30s";
const phosphate = "phosphate";

const nitrate60Colors = Object.keys(colorData.nitrate_60s);
const nitrate30Colors = Object.keys(colorData.nitrate_30s);
const phosphateColors = Object.keys(colorData.phosphate);

exports.colorsArray = [nitrate60Colors, nitrate30Colors, phosphateColors, null];
exports.nitrate60Colors = nitrate60Colors;
exports.nitrate30Colors = nitrate30Colors;
exports.phosphateColors = phosphateColors;
exports.calculateColorDistance = calculateColorDistance;
exports.findClosestColor = findClosestColor;
exports.hexToRgb = hexToRgb;
