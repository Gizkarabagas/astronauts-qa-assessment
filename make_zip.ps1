Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$zipPath = "D:\Test Astro\reqres-postman-automation.zip"
if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

$zip = [System.IO.Compression.ZipFile]::Open($zipPath, [System.IO.Compression.ZipArchiveMode]::Create)

function Add-FileToArchive($filePath, $entryName, $zipArchive) {
    $entry = $zipArchive.CreateEntry($entryName, [System.IO.Compression.CompressionLevel]::Optimal)
    $entryStream = $entry.Open()
    $fileStream = [System.IO.File]::Open($filePath, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read, [System.IO.FileShare]::ReadWrite)
    $fileStream.CopyTo($entryStream)
    $fileStream.Dispose()
    $entryStream.Dispose()
    Write-Host "Added: $entryName"
}

function Add-DirectoryToArchive($dirPath, $zipArchive, $rootPath) {
    Get-ChildItem -Path $dirPath -Recurse | Where-Object { -not $_.PSIsContainer } | ForEach-Object {
        $rel = $_.FullName.Substring($rootPath.Length).TrimStart('\', '/')
        Add-FileToArchive $_.FullName $rel $zipArchive
    }
}

$base = "D:\Test Astro\"

Add-DirectoryToArchive (Join-Path $base "postman") $zip $base
Add-DirectoryToArchive (Join-Path $base "reports") $zip $base
Add-DirectoryToArchive (Join-Path $base "sheets_csv") $zip $base

Add-FileToArchive (Join-Path $base "runner.js") "runner.js" $zip
Add-FileToArchive (Join-Path $base "build_postman.js") "build_postman.js" $zip
Add-FileToArchive (Join-Path $base "package.json") "package.json" $zip
Add-FileToArchive (Join-Path $base "README.md") "README.md" $zip

$zip.Dispose()

Write-Host "`n🎉 Zip package created successfully at: $zipPath"
Get-Item $zipPath | Select-Object Name, Length, LastWriteTime
