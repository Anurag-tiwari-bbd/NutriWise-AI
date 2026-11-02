@echo off
title NutriWise AI - Clinical Nutrition Engine
color 0A
cls

echo ======================================================================
echo             NutriWise AI - Development Server Startup
echo             Single Source of Truth & Version Integrity
echo ======================================================================
echo.

:: 1. Navigate strictly to the authoritative script directory
cd /d "%~dp0"
echo [*] Authoritative Project Root: %CD%

:: 2. Verify project integrity
if not exist "package.json" (
    color 0C
    echo [ERROR] package.json not found in %CD%!
    echo Please ensure you are running this script from the authoritative NutriWise-AI folder.
    pause
    exit /b 1
)

if not exist "src\App.tsx" (
    color 0C
    echo [ERROR] src\App.tsx not found! Project structure is corrupted or invalid.
    pause
    exit /b 1
)

:: 3. Check Node.js and npm availability
where node >nul 2>nul
if %errorlevel% neq 0 (
    color 0C
    echo [ERROR] Node.js is not installed or not in PATH!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

where npm >nul 2>nul
if %errorlevel% neq 0 (
    color 0C
    echo [ERROR] npm is not installed or not in PATH!
    pause
    exit /b 1
)

:: 4. Verify dependencies
if not exist "node_modules\" (
    echo [*] node_modules not detected. Installing dependencies...
    call npm install
    if %errorlevel% neq 0 (
        color 0C
        echo [ERROR] npm install failed! Please check your network or package.json.
        pause
        exit /b 1
    )
)

:: 5. Port Conflict Detection & Cleanup for Port 5173
echo [*] Checking for orphaned processes on Port 5173...
for /f "tokens=5" %%a in ('netstat -ano -p tcp ^| findstr /r /c:":5173 .*LISTENING"') do (
    set "PID_CONFLICT=%%a"
)

if defined PID_CONFLICT (
    echo [!] Port 5173 is currently occupied by PID: %PID_CONFLICT%
    echo [*] Terminating conflicting/orphaned process on Port 5173 to ensure clean start...
    taskkill /f /pid %PID_CONFLICT% >nul 2>nul
    timeout /t 1 /nobreak >nul
    echo [OK] Port 5173 has been freed.
) else (
    echo [OK] Port 5173 is free and ready.
)

:: 6. Clean stale Vite dependency cache to guarantee latest version
if exist "node_modules\.vite\" (
    echo [*] Refreshing Vite cache (node_modules\.vite)...
    rmdir /s /q "node_modules\.vite" >nul 2>nul
)

echo.
echo ======================================================================
echo   Launching NutriWise AI Development Engine on Strict Port 5173
echo   Localhost URL: http://localhost:5173/
echo   Chrome will open automatically. Press Ctrl+C in this window to stop.
echo ======================================================================
echo.

call npm run dev

if %errorlevel% neq 0 (
    color 0C
    echo.
    echo [ERROR] Vite development server stopped with exit code %errorlevel%.
    pause
)
