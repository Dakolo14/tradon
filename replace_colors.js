const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/app/(dashboard)/promos/deals/create/page.tsx',
  'src/app/(dashboard)/promos/smart-pricing/page.tsx',
  'src/app/(dashboard)/promos/smart-pricing/setup/page.tsx',
  'src/app/(dashboard)/marketing/campaigns/page.tsx'
];

filesToUpdate.forEach(file => {
  const fullPath = path.join('/Users/ajosedakolo/Desktop/tradon', file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Replace hex colors
    content = content.replace(/#635BFF/g, '#A3FF00');
    
    // Replace rgba backgrounds (the purple light glow)
    content = content.replace(/rgba\(99,91,255,/g, 'rgba(163,255,0,');
    
    // Adjust text color where the background is now lime green (for readability)
    // The modal/banner icons: <div style={{ color: "#A3FF00" }}>💡</div> -> keep it Lime Green.
    // If there's an edit button: color: "#A3FF00" -> keep it Lime Green.

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
