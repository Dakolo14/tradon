const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/app/(dashboard)/marketing/automations/page.tsx',
  'src/app/(dashboard)/marketing/automations/setup/page.tsx',
  'src/app/(dashboard)/marketing/campaigns/page.tsx',
  'src/app/(dashboard)/promos/deals/page.tsx',
  'src/app/(dashboard)/promos/deals/create/page.tsx',
  'src/app/(dashboard)/promos/smart-pricing/page.tsx',
  'src/app/(dashboard)/promos/smart-pricing/setup/page.tsx',
  'src/app/(dashboard)/distributors/page.tsx'
];

filesToUpdate.forEach(file => {
  const fullPath = path.join('/Users/ajosedakolo/Desktop/tradon', file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Replace dark gray buttons with Brand Dark Green
    content = content.replace(/backgroundColor: "#2B2B2B"/g, 'backgroundColor: "#0E3E2B"');

    // In automations/page.tsx, the setup button was white, replace it with dark green
    if (file === 'src/app/(dashboard)/marketing/automations/page.tsx') {
      content = content.replace(/backgroundColor: "#FFFFFF", color: "#0E3E2B"/g, 'backgroundColor: "#0E3E2B", color: "#FFFFFF"');
      // Fix hover class
      content = content.replace(/className="hover:bg-black transition-colors"/g, 'className="hover:bg-[#0A2E20] transition-colors"');
    }

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated branding in ${file}`);
  }
});
