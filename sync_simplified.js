const fs = require('fs');
const path = require('path');

const collection = JSON.parse(fs.readFileSync(path.join(__dirname, 'postman', 'astronauts-reqres-collection.json'), 'utf8'));

const baseDirs = [
  path.join(__dirname, 'postman', 'Astronauts QA Assessment - ReqRes API Automation'),
  path.join(__dirname, 'postman', 'postman', 'collections', 'Astronauts QA Assessment - ReqRes API Automation')
];

baseDirs.forEach(baseDir => {
  if (!fs.existsSync(baseDir)) return;

  collection.item.forEach((folder, folderIdx) => {
    const folderDir = path.join(baseDir, folder.name);
    if (!fs.existsSync(folderDir)) fs.mkdirSync(folderDir, { recursive: true });

    folder.item.forEach((req, reqIdx) => {
      // Find matching yaml file in folderDir
      const files = fs.readdirSync(folderDir);
      const prefix = req.name.substring(0, 10).replace(':', '');
      const matched = files.find(f => f.startsWith(prefix) && f.endsWith('.yaml'));
      
      const fileName = matched || `${req.name.replace(/[/\\?%*:|"<>]/g, '_')}.request.yaml`;
      const filePath = path.join(folderDir, fileName);

      let yamlContent = `$kind: http-request\n`;
      yamlContent += `name: "${req.name}"\n`;
      yamlContent += `url: "${req.request.url.raw}"\n`;
      yamlContent += `method: ${req.request.method}\n`;

      if (req.request.header && req.request.header.length > 0) {
        yamlContent += `headers:\n`;
        req.request.header.forEach(h => {
          yamlContent += `  ${h.key}: ${h.value}\n`;
        });
      }

      if (req.request.body && req.request.body.raw) {
        yamlContent += `body:\n`;
        yamlContent += `  type: text\n`;
        yamlContent += `  content: |-\n`;
        req.request.body.raw.split('\n').forEach(line => {
          yamlContent += `    ${line}\n`;
        });
      }

      if (req.event && req.event.length > 0) {
        yamlContent += `scripts:\n`;
        req.event.forEach(ev => {
          const type = ev.listen === 'test' ? 'afterResponse' : 'beforeRequest';
          yamlContent += `  - type: ${type}\n`;
          yamlContent += `    code: |-\n`;
          ev.script.exec.forEach(line => {
            yamlContent += `      ${line}\n`;
          });
          yamlContent += `    language: text/javascript\n`;
        });
      }

      yamlContent += `order: ${(reqIdx + 1) * 1000}\n`;

      fs.writeFileSync(filePath, yamlContent, 'utf8');
      console.log(`Updated YAML: ${filePath}`);
    });
  });
});

console.log('YAML files synced successfully!');
