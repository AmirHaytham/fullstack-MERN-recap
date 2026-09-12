# Slide: "Git Essentials - Version Control" (page 005)
# PowerShell version. Creates a THROWAWAY repo inside .\sandbox.

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

if (Test-Path sandbox) { Remove-Item -Recurse -Force sandbox }
New-Item -ItemType Directory sandbox | Out-Null
Set-Location sandbox

function Step($msg) {
  Write-Host ""
  Write-Host "=============================================="
  Write-Host ">>> $msg"
  Write-Host "=============================================="
}

Step "git init  -> initialize repo"
git init -b main
git config user.name  "SP1 Demo"
git config user.email "demo@giu-uni.de"

Step "creating a file"
"# My Project" | Out-File -Encoding utf8 README.md
Get-Content README.md

Step "git status  -> the file is untracked"
git status --short

Step "git add .   -> add all files to the staging area"
git add .
git status --short

Step "git commit -m 'message'  -> save changes"
git commit -m "first commit"
git log --oneline

Step "git checkout -b new-branch  -> create AND switch to a branch"
git checkout -b feature-login
git branch

Step "making a change on the branch"
"console.log('login page');" | Out-File -Encoding utf8 login.js
git add .
git commit -m "add login page"
git log --oneline

Step "back to main -> login.js is NOT here"
git checkout main
Get-ChildItem

Step "git merge branch-name  -> bring the branch into main"
git merge feature-login
Get-ChildItem
git log --oneline --graph --all

Step "git push origin main"
Write-Host "Not run here: there is no GitHub remote in this sandbox."
Write-Host "On a real project you would do:"
Write-Host "    git remote add origin https://github.com/<user>/<repo>.git"
Write-Host "    git push -u origin main"
