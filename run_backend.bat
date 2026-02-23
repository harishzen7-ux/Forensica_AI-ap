@echo off
cd /d %~dp0backend
call ..\venv\Scripts\activate.bat
uvicorn app:app --reload
