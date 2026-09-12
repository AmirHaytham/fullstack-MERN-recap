#!/usr/bin/env bash
# Slide: "Git Essentials - Version Control" (page 005)
# Creates a THROWAWAY repo inside ./sandbox and walks through every command
# from the slide. Nothing outside this folder is touched.

set -e
cd "$(dirname "$0")"

rm -rf sandbox
mkdir sandbox
cd sandbox

step () { echo ""; echo "=============================================="; echo ">>> $1"; echo "=============================================="; }

step "git init  -> initialize repo"
git init -b main
git config user.name  "SP1 Demo"
git config user.email "demo@giu-uni.de"

step "creating a file"
echo "# My Project" > README.md
cat README.md

step "git status  -> the file is untracked (red)"
git status --short

step "git add .   -> add all files to the staging area"
git add .
git status --short

step "git commit -m \"message\"  -> save changes"
git commit -m "first commit"
git log --oneline

step "git checkout -b new-branch  -> create AND switch to a branch"
git checkout -b feature-login
git branch

step "making a change on the branch"
echo "console.log('login page');" > login.js
git add .
git commit -m "add login page"
git log --oneline

step "back to main -> login.js is NOT here"
git checkout main
ls

step "git merge branch-name  -> bring the branch into main"
git merge feature-login
ls
git log --oneline --graph --all

step "git push origin main"
echo "Not run here: there is no GitHub remote in this sandbox."
echo "On a real project you would do:"
echo "    git remote add origin https://github.com/<user>/<repo>.git"
echo "    git push -u origin main"

echo ""
echo "Done. Explore the result with:  cd sandbox && git log --oneline --graph --all"
