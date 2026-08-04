$disk = Get-CimInstance Win32_LogicalDisk -Filter "DeviceID='C:'"
$free = [math]::Round($disk.FreeSpace / 1GB, 2)
$total = [math]::Round($disk.Size / 1GB, 2)
$used = [math]::Round(($disk.Size - $disk.FreeSpace) / 1GB, 2)

Write-Host "=== DISK C SUMMARY ==="
Write-Host "Total Disk C Size: $total GB"
Write-Host "Used Space:        $used GB"
Write-Host "Free Space:        $free GB"
Write-Host "------------------------"

function Get-DirSizeGB ($p) {
    if (Test-Path $p) {
        $b = (Get-ChildItem -Path $p -Recurse -File -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum
        return [math]::Round($b / 1GB, 2)
    }
    return 0
}

Write-Host "AppData (Local & Roaming):" (Get-DirSizeGB "C:\Users\giaph\AppData") "GB"
Write-Host "Antigravity IDE & Brains (.gemini):" (Get-DirSizeGB "C:\Users\giaph\.gemini") "GB"
Write-Host "Windows Temp ($env:TEMP):" (Get-DirSizeGB $env:TEMP) "GB"
Write-Host "Downloads Folder:" (Get-DirSizeGB "C:\Users\giaph\Downloads") "GB"
Write-Host "NPM & Pip Caches:" (Get-DirSizeGB "C:\Users\giaph\AppData\Local\npm-cache") "GB"
