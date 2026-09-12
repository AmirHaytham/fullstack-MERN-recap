# 04. Git essentials

From the version control slide (page 005).

Runs every command on the slide against a throwaway repo it creates in
`sandbox/`, printing each step with a banner so the room can follow. Nothing
outside this folder is touched. `push` is explained but not run, since the
sandbox has no remote.

## Run it

```powershell
.\demo.ps1
```

```bash
bash demo.sh
```

Then poke around the result:

```bash
cd sandbox
git log --oneline --graph --all
```

Running the script again wipes the sandbox and starts over.

## Worth showing

Stop after `git checkout main` and point at `login.js` missing from the folder
listing. That is the moment branching stops being abstract for most people.

Show `git status` twice, once before `git add .` and once after. Untracked versus
staged is the distinction they keep failing on.

`cheatsheet.md` has the three areas diagram and the mistakes that cost marks
every term: committing `node_modules`, committing `.env`, everyone pushing
straight to `main`.
