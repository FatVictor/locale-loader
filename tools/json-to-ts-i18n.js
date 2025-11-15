const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '../src/assets/i18n');

function convertJsonToTs(dir) {
  const entries = fs.readdirSync(dir, {withFileTypes: true});

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Recurse into subfolder
      convertJsonToTs(fullPath);
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.json')) {
      const jsonPath = fullPath;
      const tsPath = jsonPath.replace(/\.json$/, '.ts');

      const jsonContent = fs.readFileSync(jsonPath, 'utf-8');
      const parsed = JSON.parse(jsonContent);

      const tsContent = 'export default ' + JSON.stringify(parsed, null, 2) + ';\n';

      fs.writeFileSync(tsPath, tsContent, 'utf-8');

      console.log(`Converted: ${jsonPath} → ${tsPath}`);
    }
  }
}

// Start processing
convertJsonToTs(rootDir);

console.log('✔ Finished converting all i18n JSON files recursively');
