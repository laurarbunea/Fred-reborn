## Components

All our front-end components are compiled with [browserify](#).

```
frontend/
  + js/
  |-+ components/
  |---> polyfills.js
  |---> other-module.js
  |-> app.js
```

Compiles to

```
www/js/app.js
```

---

## Templates

Are compiled on the client-side through [nunjucks](#).

This allows us to share the template code between the back-end pattern library and the browser.

---

## JS Conventions

How to write succinct Javascript that works.

---

## Testing

Progressive enhancement cuts down on your regression testing.