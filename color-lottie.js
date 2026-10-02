const fs = require('fs');

const path = './public/success.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Target color: #B2FF00 (178, 255, 0) -> [0.698, 1, 0, 1]
// or #84CC16 (132, 204, 22) -> [0.517, 0.8, 0.086, 1]
// Let's use #84CC16 for better visibility on white background, it's the brand lime.
const targetColor = [0.517, 0.8, 0.086, 1];

function traverse(obj) {
  if (Array.isArray(obj)) {
    // If it's a color array [r, g, b, 1] and r, g, b are numbers <= 1
    if (obj.length === 4 && typeof obj[0] === 'number' && typeof obj[1] === 'number' && typeof obj[2] === 'number' && obj[3] === 1) {
       return targetColor;
    }
    return obj.map(traverse);
  } else if (obj !== null && typeof obj === 'object') {
    for (let key in obj) {
      if (key === 'k' || key === 'c') {
         // only mutate 'c' (color) arrays or 'k' (keyframe) values that are arrays
         obj[key] = traverse(obj[key]);
      } else if (typeof obj[key] === 'object') {
         traverse(obj[key]);
      }
    }
  }
  return obj;
}

traverse(data);

fs.writeFileSync(path, JSON.stringify(data));
console.log('Done!');
