const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const wb = XLSX.readFile(path.join(__dirname, 'astronauts_qa_assessment.xlsx'));

const sheets = [
  { name: 'Test Plan (Web)', file: 'Test_Plan_Web.csv' },
  { name: 'Test Cases (Web)', file: 'Test_Cases_Web.csv' },
  { name: 'API Test Cases', file: 'API_Test_Cases.csv' },
  { name: 'Automation Summary', file: 'Automation_Summary.csv' }
];

const csvDir = path.join(__dirname, 'sheets_csv');
if (!fs.existsSync(csvDir)) {
  fs.mkdirSync(csvDir, { recursive: true });
}

sheets.forEach(s => {
  const ws = wb.Sheets[s.name];
  if (ws) {
    const csv = XLSX.utils.sheet_to_csv(ws);
    fs.writeFileSync(path.join(csvDir, s.file), csv, 'utf8');
    console.log(`Exported: ${s.file}`);
  }
});
