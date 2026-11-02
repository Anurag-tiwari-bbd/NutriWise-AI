<#
.SYNOPSIS
    NutriWise AI - Authoritative Development Server Startup Script (PowerShell)
.DESCRIPTION
    Verifies authoritative project root, resolves port conflicts on 5173, cleans Vite cache,
    and starts the latest application version on http://localhost:5173/.
#>

[Console]::Title = "NutriWise AI - Clinical Nutrition Engine"
Clear-Host

Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host "            NutriWise AI - Development Server Startup" -ForegroundColor Green
Write-Host "            Single Source of Truth & Version Integrity" -ForegroundColor Green
Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Enforce authoritative project root
$ProjectRoot = $PSScriptRoot
Set-Location -Path $ProjectRoot
Write-Host "[*] Authoritative Project Root: $ProjectRoot" -ForegroundColor Gray

# 2. Verify project integrity
if (-not (Test-Path "$ProjectRoot\package.json") -or -not (Test-Path "$ProjectRoot\src\App.tsx")) {
    Write-Host "[ERROR] Critical files missing in $ProjectRoot. Corrupted repository!" -ForegroundColor Red
    Pause
    Exit 1
}

# 3. Verify Node.js & npm
if (-not (Get-Command node -ErrorAction SilentlyContinue) -or -not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] Node.js or npm is not in PATH." -ForegroundColor Red
    Pause
    Exit 1
}

# 4. Check dependencies
if (-not (Test-Path "$ProjectRoot\node_modules")) {
    Write-Host "[*] node_modules not found. Running npm install..." -ForegroundColor Yellow
    npm install
}

# 5. Check and release port 5173 if occupied
Write-Host "[*] Checking Port 5173 status..." -ForegroundColor Gray
$PortConn = Get-NetTCPConnection -LocalPort 5173 -State Listen -ErrorAction SilentlyContinue
if ($PortConn) {
    $ConflictingPid = $PortConn.OwningProcess | Select-Object -First 1
    Write-Host "[!] Port 5173 is occupied by PID $ConflictingPid. Terminating for clean start..." -ForegroundColor Yellow
    Stop-Process -Id $ConflictingPid -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 1
    Write-Host "[OK] Port 5173 successfully freed." -ForegroundColor Green
} else {
    Write-Host "[OK] Port 5173 is clear." -ForegroundColor Green
}

# 6. Clear stale Vite cache
if (Test-Path "$ProjectRoot\node_modules\.vite") {
    Write-Host "[*] Clearing Vite cache (node_modules\.vite)..." -ForegroundColor Gray
    Remove-Item -Path "$ProjectRoot\node_modules\.vite" -Recurse -Force -ErrorAction SilentlyContinue
}

Write-Host ""
Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host "  Launching NutriWise AI on Strict Port 5173" -ForegroundColor Green
Write-Host "  Localhost URL: http://localhost:5173/" -ForegroundColor Yellow
Write-Host "  Chrome will launch automatically. Press Ctrl+C to stop." -ForegroundColor Gray
Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host ""

npm run dev
