# Télécharger et installer Node.js
$nodeUrl = "https://nodejs.org/dist/v18.18.2/node-v18.18.2-x64.msi"
$nodeInstaller = "$env:TEMP\node-installer.msi"

Write-Host "Téléchargement de Node.js..." -ForegroundColor Cyan
Invoke-WebRequest -Uri $nodeUrl -OutFile $nodeInstaller

Write-Host "Installation de Node.js..." -ForegroundColor Cyan
Start-Process msiexec.exe -Wait -ArgumentList "/I $nodeInstaller /quiet /norestart"

# Mettre à jour le PATH
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Vérifier l'installation
Write-Host "\nVérification de l'installation..." -ForegroundColor Cyan
Write-Host "Node.js version: $(node --version)" -ForegroundColor Green
Write-Host "npm version: $(npm --version)" -ForegroundColor Green

# Installer les dépendances du projet
Write-Host "\nInstallation des dépendances du projet..." -ForegroundColor Cyan
npm install

Write-Host "\nInstallation terminée avec succès!" -ForegroundColor Green
