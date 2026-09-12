# 13. useState

From the useState slides (pages 019 and 020).

The slide's counter, plus a deliberately broken one written with a plain variable
so the contrast is visible, plus a string, a boolean and an array.

## Run it

```bash
npm install
```

```bash
npm run dev
```

Opens <http://localhost:5113>.

## Worth showing

Section 2 is the whole lesson. Open the console, click the broken button, and
show the number climbing in the console while the page sits at zero. State is not
about storing a value, it is about telling React to re render.

In section 5, click the wrong button a few times and nothing happens. Then click
the correct one once and everything appears at the same moment. React compares
the reference, and the reference never changed.

Walk the four numbered steps at the bottom while clicking. That is the slide's
"how it works" list made visible.
