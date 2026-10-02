const fs = require('fs');

const path = './public/success.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Target color: #0E3E2B (14, 62, 43) -> [0.055, 0.243, 0.169, 1]
const targetColor = [0.055, 0.243, 0.169, 1];

function traverse(obj) {
  if (Array.isArray(obj)) {
    if (obj.length === 4 && typeof obj[0] === 'number' && typeof obj[1] === 'number' && typeof obj[2] === 'number' && obj[3] === 1) {
       const [r, g, b] = obj;
       // Skip pure white (or very close to white)
       if (r > 0.95 && g > 0.95 && b > 0.95) {
         return obj;
       }
       // It's a non-white color, change it to brand dark green
       return targetColor;
    }
    return obj.map(traverse);
  } else if (obj !== null && typeof obj === 'object') {
    for (let key in obj) {
      if (key === 'k' || key === 'c') {
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
console.log('Colors replaced with #0E3E2B except white!');
