# dom-augmentor

[![Build Status](https://travis-ci.com/WebReflection/dom-augmentor.svg?branch=master)](https://travis-ci.com/WebReflection/dom-augmentor) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/dom-augmentor/badge.svg?branch=master)](https://coveralls.io/github/WebReflection/dom-augmentor?branch=master) [![Greenkeeper badge](https://badges.greenkeeper.io/WebReflection/dom-augmentor.svg)](https://greenkeeper.io/) ![WebReflection status](https://offline.report/status/webreflection.svg)

This is exactly the same as the [augmentor](https://github.com/WebReflection/augmentor) module, except it handles automatically effects per dom nodes.

Compatible with any function that returns a DOM node, or a fragment, or a hyperhtml like Wire instance.



### Breaking in v1

  * the default export has been removed, it's `import {augmentor} from 'augmentor'` now
  * the `augmentor` library is the v1 one
  * effects now work more reliably and there are no constrains for the guards



### Example

**[Live Demo](https://codepen.io/WebReflection/pen/maQXwq)**

```js
const {augmentor: $, useEffect, useRef, useState} = augmentor;
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
