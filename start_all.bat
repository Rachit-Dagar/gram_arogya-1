@echo off
cd /d "%~dp0"
echo ===================================================
echo Starting GRAM AAROGYA (Universal Healthcare Platform)
echo Gram Aarogya - Healthcare, connected to you.
echo ===================================================

start "Gram Arogya Backend" cmd /k "call start_backend.bat"
timeout /t 2 /nobreak >nul
start "Gram Arogya Frontend" cmd /k "call start_frontend.bat"

echo.
echo ===================================================
echo Both servers have been launched!
echo Frontend UI:        http://localhost:5173
echo Backend API Docs:   http://127.0.0.1:8000/docs
echo Health Check:       http://127.0.0.1:8000/health
echo ===================================================
timeout /t 5 >nul
