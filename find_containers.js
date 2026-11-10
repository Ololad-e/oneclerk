const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Find all top-level divs/mains/headers under body
const bodyStart = html.indexOf('<body');
const bodyContent = html.substring(bodyStart);

const lines = html.split('\n');
lines.forEach((line, idx) => {
  if (line.match(/^  <(div|main|header|section)[^>]*id=/)) {
    console.log((idx+1) + ': ' + line.trim());
  }
});

