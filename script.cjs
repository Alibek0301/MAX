const fs = require('fs');
const content = fs.readFileSync('src/App.jsx', 'utf8');
const lines = content.split('\n');

const dataLines = lines.slice(6, 1210);

const iconsUsed = new Set();
const lucideImportsMatch = lines[2].match(/import \{ (.+) \} from 'lucide-react'/);
if (lucideImportsMatch) {
  const allIcons = lucideImportsMatch[1].split(',').map(i => i.trim());
  allIcons.forEach(icon => {
    if (dataLines.join('\n').includes(icon)) {
      iconsUsed.add(icon);
    }
  });
}

let head = "import { " + Array.from(iconsUsed).join(', ') + " } from 'lucide-react';\n\n";
head += dataLines.join('\n').replace(/^const /gm, 'export const ');

fs.writeFileSync('src/constants/data.js', head);
console.log('Saved to src/constants/data.js');

const remainingLines = [
  ...lines.slice(0, 6),
  "import { whatsappNumber, maxPhoneNumber, alibekPhoneNumber, maxPhoneLabel, alibekPhoneLabel, translations, serviceCatalog, getServices, getStandards, getQuickScenarios, getReviews } from './constants/data';",
  ...lines.slice(1210)
];
fs.writeFileSync('src/App.jsx', remainingLines.join('\n'));
console.log('Updated src/App.jsx');

