const fs = require('fs');
const path = require('path');
const { makeBadge } = require('badge-maker');

console.log(' Looking for coverage summary...\n');


const coveragePath = path.join(__dirname, '../coverage/coverage-summary.json');

if (!fs.existsSync(coveragePath)) {
  console.error(' Error: coverage-summary.json not found!');
  console.error('   Please run: npm run test:coverage first');
  process.exit(1);
}

const coverageSummary = JSON.parse(fs.readFileSync(coveragePath, 'utf8'));


const badgesDir = path.join(__dirname, '../coverage/badges');
if (!fs.existsSync(badgesDir)) {
  fs.mkdirSync(badgesDir, { recursive: true });
  console.log(' Created badges directory\n');
}


const total = coverageSummary.total;

console.log('Current Coverage:');
console.log(`   Statements: ${total.statements.pct}%`);
console.log(`   Branches:   ${total.branches.pct}%`);
console.log(`   Functions:  ${total.functions.pct}%`);
console.log(`   Lines:      ${total.lines.pct}%\n`);

// Function to get color based on percentage
function getColor(percentage) {
  if (percentage >= 80) return 'brightgreen';
  if (percentage >= 60) return 'green';
  if (percentage >= 40) return 'yellow';
  if (percentage >= 20) return 'orange';
  return 'red';
}


function createBadge(label, value, filename) {
  const percentage = value.pct;
  const color = getColor(percentage);
  
  const badge = makeBadge({
    label,
    message: `${percentage.toFixed(2)}%`,
    color,
  });
  
  fs.writeFileSync(path.join(badgesDir, filename), badge);
  console.log(`✓ Created ${filename}`);
}


console.log(' Generating badges...\n');
createBadge('Coverage: Statements', total.statements, 'badge-statements.svg');
createBadge('Coverage: Branches', total.branches, 'badge-branches.svg');
createBadge('Coverage: Functions', total.functions, 'badge-functions.svg');
createBadge('Coverage: Lines', total.lines, 'badge-lines.svg');

console.log('\n All coverage badges generated successfully!');
console.log(` Location: ${badgesDir}\n`);