const fs = require('fs');

const data = fs.readFileSync('src/constants/data.js', 'utf8');
const lines = data.split('\n');

function findProp(prop) {
  return data.includes(prop);
}

const props = [
  'heroBadge', 'heroTitle', 'heroP1', 'heroP2', 'heroP3', 'orderNowCta',
  'services', 'booking', 'standardsTitleDesktop', 'reviews',
  'waMessageTitle', 'waName', 'waPhone', 'waService', 'waDate', 'waAddress', 'waComment',
  'bookingTitle', 'bookingSubtitle', 'nameLabel', 'namePlaceholder', 'phoneLabel',
  'serviceLabel', 'dateLabel', 'addressLabel', 'addressPlaceholder', 'commentDesktopLabel',
  'commentPlaceholder', 'submitWhatsapp',
  'footerTagline', 'menu', 'contacts', 'privacyPolicyLabel', 'termsLabel'
];

let missing = [];
for (let p of props) {
  if (!findProp(p + ':')) { // looking for keys like `heroBadge:`
    missing.push(p);
  }
}

console.log('Missing props:', missing);
