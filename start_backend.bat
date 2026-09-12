@echo off
cd /d "%~dp0"
echo ===================================================
echo Starting Gram Aarogya Backend (Port 8000)...
echo ===================================================

if exist ".venv-local\Scripts\python.exe" (
    .venv-local\Scripts\python.exe -c "import fastapi, sqlalchemy, pydantic_settings, bcrypt" >nul 2>nul
    if not errorlevel 1 (
        .venv-local\Scripts\python.exe backend\run.py
        goto :end
    )
)

if exist ".venv\Scripts\python.exe" (
    .venv\Scripts\python.exe -c "import fastapi, sqlalchemy, pydantic_settings, bcrypt" >nul 2>nul
    if not errorlevel 1 (
        .venv\Scripts\python.exe backend\run.py
        goto :end
    )
)

python backend\run.py

:end
pause
