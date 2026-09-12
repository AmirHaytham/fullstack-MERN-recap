# 15. useEffect

From the useEffect slide (page 022).

All three dependency cases running at once so they can be compared, plus a
cleanup function, which the slide skips but every project needs.

| Code | When it runs |
|---|---|
| `useEffect(() => {...})` | after every render |
| `useEffect(() => {...}, [])` | once, on mount. Where you fetch data. |
| `useEffect(() => {...}, [count])` | whenever `count` changes |

## Run it

```bash
npm install
```

```bash
npm run dev
```

Opens <http://localhost:5115>. Open the browser console first, case 1 only logs
there.

## Worth showing

Type one letter in the input. Case 1 fires, the text effect fires, the count
effect does not, the mount effect does not. A single keystroke separates all four.

Mount and unmount the timer while watching the console. Then comment out the
`clearInterval` line, unmount, and show the interval running forever. That is a
real leak they will otherwise ship.

Warn them up front that StrictMode runs mount effects twice in development,
before someone decides their code is broken.
