Write-Host "=== TOP LEVEL C:\ FOLDERS ==="
$cDirs = Get-ChildItem "C:\" -Directory -ErrorAction SilentlyContinue
foreach ($dir in $cDirs) {
    $bytes = (Get-ChildItem -Path $dir.FullName -Recurse -File -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum
    $gb = [math]::Round($bytes / 1GB, 2)
    Write-Host "$($dir.Name) : $gb GB"
}
