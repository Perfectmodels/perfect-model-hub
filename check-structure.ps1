# Vérification de la structure des dossiers
$requiredDirs = @(
    "src/components/common",
    "src/components/layout",
    "src/config",
    "src/contexts",
    "src/hooks",
    "src/pages",
    "src/utils"
)

Write-Host "Vérification de la structure des dossiers..." -ForegroundColor Cyan

foreach ($dir in $requiredDirs) {
    if (Test-Path $dir) {
        Write-Host "✓ $dir" -ForegroundColor Green
    } else {
        Write-Host "✗ $dir (manquant)" -ForegroundColor Red
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "  → Créé : $dir" -ForegroundColor Yellow
    }
}

# Vérification des dépendances
$packageJson = Get-Content -Path "package.json" -Raw | ConvertFrom-Json
$requiredDeps = @("react", "react-dom", "react-router-dom", "framer-motion")

Write-Host "`nVérification des dépendances..." -ForegroundColor Cyan

foreach ($dep in $requiredDeps) {
    $installed = $false
    
    # Vérifier dans les dépendances
    if ($packageJson.dependencies.PSObject.Properties.Name -contains $dep) {
        $installed = $true
    }
    
    # Vérifier dans les devDependencies
    if (-not $installed -and $packageJson.devDependencies.PSObject.Properties.Name -contains $dep) {
        $installed = $true
    }
    
    if ($installed) {
        Write-Host "✓ $dep est installé" -ForegroundColor Green
    } else {
        Write-Host "✗ $dep n'est pas installé" -ForegroundColor Red
    }
}

Write-Host "`nVérification terminée.`n" -ForegroundColor Cyan

# Vérification des fichiers de configuration
$requiredConfigs = @(
    "tsconfig.json",
    "vite.config.ts",
    "tailwind.config.js"
)

Write-Host "Vérification des fichiers de configuration..." -ForegroundColor Cyan

foreach ($config in $requiredConfigs) {
    if (Test-Path $config) {
        Write-Host "✓ $config" -ForegroundColor Green
    } else {
        Write-Host "✗ $config (manquant)" -ForegroundColor Red
    }
}

Write-Host "`nPour installer les dépendances manquantes, exécutez :" -ForegroundColor Cyan
Write-Host "npm install react react-dom react-router-dom framer-motion" -ForegroundColor Yellow
Write-Host "ou" -ForegroundColor Cyan
Write-Host "yarn add react react-dom react-router-dom framer-motion" -ForegroundColor Yellow
