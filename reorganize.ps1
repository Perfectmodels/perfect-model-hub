# Create main directories
$directories = @(
    "src\assets",
    "src\components\ui",
    "src\components\layout",
    "src\components\shared",
    "src\features\auth",
    "src\features\models",
    "src\features\agency",
    "src\features\forum",
    "src\features\services",
    "src\features\dashboard",
    "src\lib\firebase",
    "src\utils",
    "src\constants",
    "src\types",
    "src\services\api",
    "src\services\database",
    "src\styles"
)

foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force
        Write-Host "Created directory: $dir"
    } else {
        Write-Host "Directory already exists: $dir"
    }
}

Write-Host "\nProject structure has been reorganized successfully!" -ForegroundColor Green
