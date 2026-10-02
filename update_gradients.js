const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/app/(dashboard)/marketing/campaigns/page.tsx',
  'src/app/(dashboard)/promos/deals/page.tsx',
  'src/app/(dashboard)/promos/smart-pricing/page.tsx'
];

// Darker blue and purple mesh gradient
const newGradient = `<div style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: "40%", background: "radial-gradient(circle at 80% 20%, rgba(76,29,149,0.5) 0%, transparent 40%), radial-gradient(circle at 60% 80%, rgba(30,58,138,0.5) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(236,72,153,0.3) 0%, transparent 60%)", zIndex: 0, pointerEvents: "none", filter: "blur(40px)" }} />`;

filesToUpdate.forEach(file => {
  const fullPath = path.join('/Users/ajosedakolo/Desktop/tradon', file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Replace the old background gradient div
    // We match from <div style={{ position: "absolute", top: 0, right: 0 up to }} />
    content = content.replace(/<div style={{ position: "absolute", top: 0, right: 0.*?pointerEvents: "none"[,a-zA-Z0-9\s:\"()]*}} \/>/, newGradient);

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated gradient in ${file}`);
  }
});
