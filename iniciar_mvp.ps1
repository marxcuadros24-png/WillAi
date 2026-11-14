# Script de Inicio Rápido para el MVP de WillAI (Demo Hackathon NASA)
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "🚀 INICIANDO WILLAI MVP - HACKATHON NASA & COMUNIDADES" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

$backendDir = Join-Path $PSScriptRoot "backend"
$frontendDir = Join-Path $PSScriptRoot "frontend"
$pythonExe = "C:\Users\MARX\Desktop\Nueva carpeta\WillAi-ML\backend\.venv\Scripts\python.exe"

# 1. Iniciar Backend en ventana independiente
Write-Host "[1/2] Iniciando Servidor Backend Django (Puerto 8000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendDir'; & '$pythonExe' manage.py runserver 127.0.0.1:8000"

# 2. Iniciar Frontend en ventana independiente
Write-Host "[2/2] Iniciando Centro de Mando Frontend Vite (Puerto 5173)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendDir'; npm run dev -- --host 127.0.0.1"

Write-Host "==========================================================" -ForegroundColor Green
Write-Host "✅ Servidores iniciados en procesos independientes." -ForegroundColor Green
Write-Host "🔗 Frontend: http://localhost:5173/" -ForegroundColor Green
Write-Host "🔗 Backend:  http://127.0.0.1:8000/api/v1/" -ForegroundColor Green
Write-Host "🔗 Swagger:  http://127.0.0.1:8000/api/docs/" -ForegroundColor Green
Write-Host "🔑 Login:    admin@willai.pe / admin12345" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green
