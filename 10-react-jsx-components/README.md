# 10. JSX and components

From the React slide (page 015).

JSX basics, `{ }` for expressions, `className` instead of `class`, a list built
with `.map()`, and both a function component and a class component exactly as
they appear on the slide.

## Run it

```bash
npm install
```

```bash
npm run dev
```

Opens <http://localhost:5110>.

## How this folder was made

The slide tells students to run `npm create vite@latest`, pick react javascript,
then `npm i` and `npm run dev`. This is the result of exactly that, trimmed down
so the only code on screen is the code the lesson is about.

## Worth showing

Break it three times, in this order. Delete the `key` prop and show the console
warning. Return two sibling divs with no parent, show the error, then fix it with
a fragment. Rename `DemoComponent` to lowercase and watch React render nothing,
because lowercase means HTML tag to JSX.

Breaking it on purpose lands faster than explaining the rule.
