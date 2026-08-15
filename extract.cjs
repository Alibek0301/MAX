const fs = require('fs');

const extractComponent = (content, compName) => {
  const compDef = `const ${compName} = ({`;
  const idx = content.indexOf(compDef);
  if (idx === -1) {
    const compDef2 = `const ${compName} = (`;
    const idx2 = content.indexOf(compDef2);
    if(idx2 === -1) return null;
  }
  
  // Find substring start
  let startIdx = content.indexOf(`const ${compName} =`);
  if (startIdx === -1) return null;
  
  // Look for the end of the component
  let endIdx = content.indexOf('}\n\n', startIdx);
  if (endIdx === -1) endIdx = content.indexOf('}\n', startIdx);
  if (endIdx === -1) return null;
  
  // Extract
  const componentStr = content.substring(startIdx, endIdx + 1);
  return { str: componentStr, startIdx, endIdx };
};

const appPath = 'src/App.jsx';
let content = fs.readFileSync(appPath, 'utf8');

const componentsToExtract = ['LoyaltyCard', 'CallButton', 'WhatsAppQRModal', 'ExitIntentPopup'];
let extracted = {};

componentsToExtract.forEach(comp => {
  const match = extractComponent(content, comp);
  if (match) {
    extracted[comp] = match.str;
    // Replace with empty string in App.jsx
    content = content.replace(match.str, '');
  }
});

// Now save them
if (!fs.existsSync('src/components/UI')){
    fs.mkdirSync('src/components/UI', { recursive: true });
}

fs.writeFileSync('src/components/UI/Modals.jsx', 
  "import { useState, useEffect, useRef } from 'react';\n" +
  "import { motion } from 'framer-motion';\n" +
  "import { X, MessageCircle, Copy, Phone } from 'lucide-react';\n" +
  "import * as QRCode from 'qrcode';\n\n" +
  (extracted['WhatsAppQRModal'] || '') + '\n\n' +
  (extracted['ExitIntentPopup'] || '') + '\n\n' +
  "export { WhatsAppQRModal, ExitIntentPopup };\n"
);

fs.writeFileSync('src/components/UI/Buttons.jsx', 
  "import { Phone } from 'lucide-react';\n\n" +
  "import { alibekPhoneNumber } from '../../constants/data';\n\n" +
  (extracted['CallButton'] || '') + '\n\n' +
  "export { CallButton };\n"
);

fs.writeFileSync('src/components/UI/Cards.jsx', 
  "import React from 'react';\n\n" +
  (extracted['LoyaltyCard'] || '') + '\n\n' +
  "export { LoyaltyCard };\n"
);

// Add imports to App.jsx
content = content.replace(
  "import * as QRCode from 'qrcode'", 
  "import * as QRCode from 'qrcode'\nimport { WhatsAppQRModal, ExitIntentPopup } from './components/UI/Modals'\nimport { CallButton } from './components/UI/Buttons'\nimport { LoyaltyCard } from './components/UI/Cards'"
);

fs.writeFileSync(appPath, content);
console.log('Extracted UI components');
