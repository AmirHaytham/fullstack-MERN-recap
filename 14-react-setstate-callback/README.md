# 14. setState, direct vs callback

From the best practice slide (page 021).

Two counters with identical logic. One calls `setDirect(direct + 1)` three times,
the other calls `setCallback(prev => prev + 1)` three times.

| Button | Result per click |
|---|---|
| direct | 1 |
| callback | 3 |

## Run it

```bash
npm install
```

```bash
npm run dev
```

Opens <http://localhost:5114>.

## Worth showing

Before you click anything, ask the room what section 1 will show. Almost everyone
says 3. It shows 1. That surprise is the lesson.

Section 3 is where this actually bites in project code. Click the delayed direct
button, then hammer the fast button four times before the second elapses. The
delayed write throws away everything that happened in between. The callback
version does not.

Close with the rule: if you depend on the old value, use the callback.
