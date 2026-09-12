# Git cheat sheet (the commands on the slide)

| Command | What it does |
|---|---|
| `git init` | initialize repo |
| `git add .` | add all files to the staging area |
| `git commit -m "message"` | save changes |
| `git push origin main` | push to GitHub |
| `git checkout -b new-branch` | create AND switch to a branch |
| `git merge branch-name` | merge a branch into the current one |

## The three areas every student must picture

```
working directory  --git add-->  staging area  --git commit-->  repository  --git push-->  GitHub
```

## Useful extras they will need in the project

```bash
git status                 # what changed, what is staged
git log --oneline --graph  # history as a tree
git switch main            # modern alias for: git checkout main
git clone <url>            # copy a repo from GitHub
git pull                   # fetch + merge from the remote
git diff                   # what exactly changed, line by line
```

## The most common mistakes in SP1

- Committing `node_modules/`. Always add a `.gitignore` with `node_modules` in it.
- Committing a `.env` file with database credentials.
- Everyone pushing to `main`. One branch per feature, then merge.
