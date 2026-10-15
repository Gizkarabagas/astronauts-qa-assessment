$dest = "d:\Test Astro\reqres-postman-automation.zip"
if (Test-Path $dest) {
    Remove-Item $dest -Force
}
$items = @(
    "postman",
    "reports",
    "sheets_csv",
    "astronauts_qa_assessment.xlsx",
    "runner.js",
    "build_postman.js",
    "generate_excel.js",
    "export_csv.js",
    "package.json",
    "README.md"
)
Compress-Archive -Path $items -DestinationPath $dest -Force
Write-Host "Zip package created successfully at: $dest"
Get-Item $dest | Select-Object Name, Length, LastWriteTime
