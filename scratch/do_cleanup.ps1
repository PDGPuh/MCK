$diskBefore = Get-CimInstance Win32_LogicalDisk -Filter "DeviceID='C:'"
$freeBefore = [math]::Round($diskBefore.FreeSpace / 1GB, 2)

Write-Host "=== BEFORE CLEANUP ==="
Write-Host "Free C: Space: $freeBefore GB"
Write-Host "------------------------"

# 1. Disable Hibernation
Write-Host "1. Disabling Hibernation..."
try {
    powercfg /hibernate off
    Write-Host "Done disabling hibernation"
} catch {
    Write-Host "Hibernation step skipped"
}

# 2. NPM and Pip Caches
Write-Host "2. Cleaning NPM and Pip caches..."
try {
    npm cache clean --force
} catch {}

try {
    pip cache purge
} catch {}

# 3. User Temp files cleanup
Write-Host "3. Cleaning User Temp Files..."
$tempDir = $env:TEMP
if (Test-Path $tempDir) {
    Get-ChildItem -Path $tempDir -Recurse -File -ErrorAction SilentlyContinue | Remove-Item -Force -ErrorAction SilentlyContinue
}

# 4. System Temp files cleanup
Write-Host "4. Cleaning System Temp Files..."
$winTemp = "C:\Windows\Temp"
if (Test-Path $winTemp) {
    Get-ChildItem -Path $winTemp -Recurse -File -ErrorAction SilentlyContinue | Remove-Item -Force -ErrorAction SilentlyContinue
}

Start-Sleep -Seconds 2

$diskAfter = Get-CimInstance Win32_LogicalDisk -Filter "DeviceID='C:'"
$freeAfter = [math]::Round($diskAfter.FreeSpace / 1GB, 2)
$freedGB = [math]::Round($freeAfter - $freeBefore, 2)

Write-Host "========================"
Write-Host "=== AFTER CLEANUP ==="
Write-Host "Free C: Space Now: $freeAfter GB"
Write-Host "TOTAL FREED UP:    $freedGB GB"
Write-Host "========================"
