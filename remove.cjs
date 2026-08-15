const fs = require('fs');
const file = 'src/App.jsx';
let content = fs.readFileSync(file, 'utf8');

// To actually remove the code, first replace role with 'client' string constant.
content = content.replace(/const role = [^;]+;?/g, "const role = 'client';");

fs.writeFileSync(file, content);
console.log('Role constant replaced with "client"');
