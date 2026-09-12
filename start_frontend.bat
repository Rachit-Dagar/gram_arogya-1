@echo off
cd /d "%~dp0"
echo ===================================================
echo Starting Gram Aarogya Frontend (Port 5173)...
echo ===================================================

cd frontend
call npm run dev
pause
