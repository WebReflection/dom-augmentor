# dom-augmentor

[![Build Status](https://travis-ci.com/WebReflection/dom-augmentor.svg?branch=master)](https://travis-ci.com/WebReflection/dom-augmentor) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/dom-augmentor/badge.svg?branch=master)](https://coveralls.io/github/WebReflection/dom-augmentor?branch=master) [![Greenkeeper badge](https://badges.greenkeeper.io/WebReflection/dom-augmentor.svg)](https://greenkeeper.io/) ![WebReflection status](https://offline.report/status/webreflection.svg)

## Project status

I'm currently unable to find time to maintain this project, which implies its direct or indirect dependents might be affected long time if a bug is found (and there are easily bugs in here).

I don't know how many other alternatives there are out there, but [tng-hooks](https://github.com/getify/TNG-Hooks) seems to be more active and popular.

- - -

This is exactly the same as the [augmentor](https://github.com/WebReflection/augmentor) module, except it provides automatically `connected` and `disconnected` effects per dom nodes, when the guard is an empty Array.

Compatible with any function that returns a DOM node, or a fragment, or a hyperhtml like Wire instance.

**[Live Demo](https://codepen.io/WebReflection/pen/maQXwq)**

```js
const {default: $, useEffect, useRef, useState} = augmentor;
const {render, hook} = lighterhtml;
const {html, svg} = hook(useRef);

const Button = (text) => $(() => {
  useEffect(
    () => {
      console.log('connected');
      return () => console.log('disconnected');
    },
    []
  );
  const [i, increment] = useState(0);
  return html`
  <button onclick=${() => increment(i + 1)}>
    ${text} ${i}
  </button>`;
});

const button = Button('hello');

render(document.body, button);
// alternatively
// document.body.appendChild(button());
```
