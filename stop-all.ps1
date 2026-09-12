# Frees every port start-all.ps1 uses, which also cleans up after a crash
# or a terminal you closed by accident.

$ports = @(3005, 3006, 3007, 3024, 4000,
           5110, 5111, 5112, 5113, 5114, 5115, 5116, 5117,
           5118, 5119, 5120, 5121, 5122, 5123, 5124, 5125)

$stopped = 0
foreach ($port in $ports) {
  $conns = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
  foreach ($c in $conns) {
    try {
      $proc = Get-Process -Id $c.OwningProcess -ErrorAction Stop
      Stop-Process -Id $c.OwningProcess -Force
      Write-Host ("  stopped {0} on port {1}" -f $proc.ProcessName, $port) -ForegroundColor Yellow
      $stopped++
    } catch { }
  }
}

if ($stopped -eq 0) {
  Write-Host "Nothing was running." -ForegroundColor DarkGray
} else {
  Write-Host "`nStopped $stopped process(es)." -ForegroundColor Cyan
}
