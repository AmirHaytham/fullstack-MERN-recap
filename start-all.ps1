# Starts every example that has a server, each in its own hidden window.
# Installs missing dependencies first, then prints a port check.
#
#   .\start-all.ps1
#   .\stop-all.ps1

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot

# vite would otherwise open 16 browser tabs at once
$env:SP1_NO_OPEN = "1"

$projects = @(
  @{ Name = "05 express routing"; Path = "05-express-routing";     Cmd = "node server.js"; Port = 3005 },
  @{ Name = "06 express router";  Path = "06-express-router";      Cmd = "node server.js"; Port = 3006 },
  @{ Name = "07 mvc";             Path = "07-mvc-architecture";    Cmd = "node server.js"; Port = 3007 },
  @{ Name = "24 mock api";        Path = "24-axios-useeffect";     Cmd = "node server.js"; Port = 3024 },
  @{ Name = "25 backend";         Path = "25-fullstack-integration\backend"; Cmd = "node server.js"; Port = 4000 },
  @{ Name = "10 jsx";             Path = "10-react-jsx-components";    Cmd = "npm run dev"; Port = 5110 },
  @{ Name = "11 props";           Path = "11-react-props";             Cmd = "npm run dev"; Port = 5111 },
  @{ Name = "12 props methods";   Path = "12-react-props-methods";     Cmd = "npm run dev"; Port = 5112 },
  @{ Name = "13 useState";        Path = "13-react-usestate";          Cmd = "npm run dev"; Port = 5113 },
  @{ Name = "14 setState";        Path = "14-react-setstate-callback"; Cmd = "npm run dev"; Port = 5114 },
  @{ Name = "15 useEffect";       Path = "15-react-useeffect";         Cmd = "npm run dev"; Port = 5115 },
  @{ Name = "16 localStorage";    Path = "16-react-localstorage";      Cmd = "npm run dev"; Port = 5116 },
  @{ Name = "17 router basics";   Path = "17-react-router-basics";     Cmd = "npm run dev"; Port = 5117 },
  @{ Name = "18 nested routes";   Path = "18-react-router-nested";     Cmd = "npm run dev"; Port = 5118 },
  @{ Name = "19 layout routes";   Path = "19-react-router-layout";     Cmd = "npm run dev"; Port = 5119 },
  @{ Name = "20 index routes";    Path = "20-react-router-index";      Cmd = "npm run dev"; Port = 5120 },
  @{ Name = "21 dynamic routes";  Path = "21-react-router-dynamic";    Cmd = "npm run dev"; Port = 5121 },
  @{ Name = "22 navigation";      Path = "22-react-navigation";        Cmd = "npm run dev"; Port = 5122 },
  @{ Name = "23 url values";      Path = "23-react-url-values";        Cmd = "npm run dev"; Port = 5123 },
  @{ Name = "24 axios app";       Path = "24-axios-useeffect";         Cmd = "npm run dev"; Port = 5124 },
  @{ Name = "25 frontend";        Path = "25-fullstack-integration\frontend"; Cmd = "npm run dev"; Port = 5125 }
)

Write-Host "Starting $($projects.Count) servers..." -ForegroundColor Cyan

foreach ($p in $projects) {
  $full = Join-Path $root $p.Path
  if (-not (Test-Path $full)) {
    Write-Host "  skipping $($p.Name), folder is missing" -ForegroundColor Yellow
    continue
  }
  if (-not (Test-Path (Join-Path $full "node_modules"))) {
    Write-Host "  installing dependencies for $($p.Name)" -ForegroundColor DarkGray
    Push-Location $full
    npm install --silent --no-audit --no-fund | Out-Null
    Pop-Location
  }
  Start-Process -FilePath "cmd.exe" `
    -ArgumentList "/c", "cd /d `"$full`" && set SP1_NO_OPEN=1 && $($p.Cmd)" `
    -WindowStyle Hidden
  Write-Host ("  {0,-20} http://localhost:{1}" -f $p.Name, $p.Port) -ForegroundColor Green
}

Write-Host "`nWaiting for them to bind..." -ForegroundColor Cyan
Start-Sleep -Seconds 12

Write-Host "`nPort check" -ForegroundColor Cyan
foreach ($p in $projects) {
  $up = Get-NetTCPConnection -LocalPort $p.Port -State Listen -ErrorAction SilentlyContinue
  $mark  = if ($up) { "up  " } else { "down" }
  $color = if ($up) { "Green" } else { "Red" }
  Write-Host ("  [{0}] {1,-20} http://localhost:{2}" -f $mark, $p.Name, $p.Port) -ForegroundColor $color
}

Write-Host "`nStop everything with .\stop-all.ps1" -ForegroundColor Cyan
