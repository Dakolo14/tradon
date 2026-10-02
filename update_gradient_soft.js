const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/app/(dashboard)/marketing/campaigns/page.tsx',
  'src/app/(dashboard)/promos/deals/page.tsx',
  'src/app/(dashboard)/promos/smart-pricing/page.tsx'
];

// Soft light blue and subtle lime green gradient matching the new screenshot
const newGradient = `<div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "70%", background: "radial-gradient(ellipse 80% 100% at 100% 50%, rgba(224,242,254,0.6) 0%, rgba(163,255,0,0.15) 50%, transparent 100%)", zIndex: 0, pointerEvents: "none" }} />`;

filesToUpdate.forEach(file => {
  const fullPath = path.join('/Users/ajosedakolo/Desktop/tradon', file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Replace the old background gradient div
    content = content.replace(/<div style={{ position: "absolute", top: 0, right: 0.*?pointerEvents: "none"[,a-zA-Z0-9\s:\"()]*}} \/>/, newGradient);

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated gradient in ${file}`);
  }
});
