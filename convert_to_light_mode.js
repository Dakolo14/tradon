const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/app/(dashboard)/marketing/page.tsx',
  'src/app/(dashboard)/marketing/automations/page.tsx',
  'src/app/(dashboard)/marketing/automations/setup/page.tsx',
  'src/app/(dashboard)/marketing/history/page.tsx',
  'src/app/(dashboard)/marketing/campaigns/page.tsx',
  'src/app/(dashboard)/promos/deals/page.tsx',
  'src/app/(dashboard)/promos/deals/create/page.tsx',
  'src/app/(dashboard)/promos/smart-pricing/page.tsx',
  'src/app/(dashboard)/promos/smart-pricing/setup/page.tsx'
];

filesToUpdate.forEach(file => {
  const fullPath = path.join('/Users/ajosedakolo/Desktop/tradon', file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Backgrounds
    content = content.replace(/backgroundColor: "#0E1217"/g, 'backgroundColor: "#F5FFFB"');
    content = content.replace(/backgroundColor: "#181D23"/g, 'backgroundColor: "#FFFFFF"');
    
    // Borders
    content = content.replace(/border: "1px solid rgba\(255,255,255,0.08\)"/g, 'border: "1px solid rgba(14,62,43,0.08)"');
    content = content.replace(/border: "1px solid rgba\(255,255,255,0.1\)"/g, 'border: "1px solid rgba(14,62,43,0.1)"');
    content = content.replace(/border: "1px solid rgba\(255,255,255,0.2\)"/g, 'border: "1px solid rgba(14,62,43,0.2)"');
    content = content.replace(/borderBottom: "1px solid rgba\(255,255,255,0.08\)"/g, 'borderBottom: "1px solid rgba(14,62,43,0.08)"');
    content = content.replace(/borderBottom: "1px solid rgba\(255,255,255,0.04\)"/g, 'borderBottom: "1px solid rgba(14,62,43,0.04)"');
    content = content.replace(/borderTop: "1px solid rgba\(255,255,255,0.08\)"/g, 'borderTop: "1px solid rgba(14,62,43,0.08)"');
    content = content.replace(/borderRight: "1px solid rgba\(255,255,255,0.08\)"/g, 'borderRight: "1px solid rgba(14,62,43,0.08)"');
    content = content.replace(/borderRight: "1px solid rgba\(255,255,255,0.1\)"/g, 'borderRight: "1px solid rgba(14,62,43,0.1)"');

    // Text colors
    content = content.replace(/color: "#FFFFFF"/g, 'color: "#0E3E2B"');
    content = content.replace(/color="#FFFFFF"/g, 'color="#0E3E2B"'); // for icons
    content = content.replace(/color: "rgba\(255,255,255,0.9\)"/g, 'color: "rgba(14,62,43,0.9)"');
    content = content.replace(/color: "rgba\(255,255,255,0.8\)"/g, 'color: "rgba(14,62,43,0.8)"');
    content = content.replace(/color: "rgba\(255,255,255,0.7\)"/g, 'color: "rgba(14,62,43,0.7)"');
    content = content.replace(/color: "rgba\(255,255,255,0.6\)"/g, 'color: "rgba(14,62,43,0.6)"');
    content = content.replace(/color: "rgba\(255,255,255,0.5\)"/g, 'color: "rgba(14,62,43,0.5)"');
    content = content.replace(/color: "rgba\(255,255,255,0.4\)"/g, 'color: "rgba(14,62,43,0.4)"');
    content = content.replace(/color: "rgba\(255,255,255,0.2\)"/g, 'color: "rgba(14,62,43,0.2)"');

    // Transparent Backgrounds
    content = content.replace(/backgroundColor: "rgba\(255,255,255,0.1\)"/g, 'backgroundColor: "rgba(14,62,43,0.05)"');
    content = content.replace(/backgroundColor: "rgba\(255,255,255,0.2\)"/g, 'backgroundColor: "rgba(14,62,43,0.1)"');
    content = content.replace(/background: "rgba\(255,255,255,0.1\)"/g, 'background: "rgba(14,62,43,0.05)"');

    // Buttons that were white in dark mode
    content = content.replace(/backgroundColor: "#FFFFFF", color: "#000000"/g, 'backgroundColor: "#2B2B2B", color: "#FFFFFF"');
    
    // Some buttons that had #FFFFFF text might have changed to #0E3E2B, but their backgrounds might be dark (like lime green buttons).
    // The previous lime green replacement: backgroundColor: "#A3FF00", color: "#0E3E2B"
    // We already replaced color: "#FFFFFF" -> "#0E3E2B" globally above, so if there was a button with lime green and white text it's now lime green and dark green, which is fine.

    // Fix specific overlays
    content = content.replace(/backgroundColor: "rgba\(0,0,0,0.5\)"/g, 'backgroundColor: "rgba(14,62,43,0.3)"'); // Modal overlay

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Converted ${file} to light mode`);
  } else {
    console.log(`File not found: ${file}`);
  }
});
