const newman = require('newman');
const path = require('path');
const fs = require('fs');

const reportsDir = path.join(__dirname, 'reports');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

console.log('====================================================');
console.log('🚀 Running Astronauts QA ReqRes API Test Automation');
console.log('====================================================\n');

newman.run({
  collection: path.join(__dirname, 'postman', 'astronauts-reqres-collection.json'),
  environment: path.join(__dirname, 'postman', 'astronauts-reqres-environment.json'),
  reporters: ['cli', 'htmlextra'],
  reporter: {
    htmlextra: {
      export: path.join(reportsDir, 'reqres-api-report.html'),
      title: 'Astronauts QA Assessment - ReqRes API Test Automation Report',
      browserTitle: 'Astronauts QA API Report',
      showEnvironmentData: true,
      showMarkdownDescription: true,
      showFolderDescription: true
    }
  }
}, function (err, summary) {
  if (err) {
    console.error('Newman execution failed:', err);
    process.exit(1);
  }

  console.log('\n====================================================');
  console.log('📊 TEST EXECUTION SUMMARY:');
  console.log('----------------------------------------------------');
  console.log(`Total Requests:    ${summary.run.stats.requests.total}`);
  console.log(`Failed Requests:   ${summary.run.stats.requests.failed}`);
  console.log(`Total Assertions:  ${summary.run.stats.assertions.total}`);
  console.log(`Failed Assertions: ${summary.run.stats.assertions.failed}`);
  console.log(`HTML Report Path:  ${path.join(reportsDir, 'reqres-api-report.html')}`);
  console.log('====================================================\n');

  if (summary.run.stats.assertions.failed > 0) {
    process.exit(1);
  } else {
    console.log('✅ ALL TESTS PASSED SUCCESSFULLY!');
  }
});
