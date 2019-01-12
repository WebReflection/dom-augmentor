# dom-augmentor

This is exactly the same as the [augmentor](https://github.com/WebReflection/augmentor) module, except it provides automatically `connected` and `disconnected` effects per dom nodes, when the guard is an empty Array.

Compatible with any function that returns a DOM node, or a fragment, or a hyperhtml like Wire instance.

```js
import augmentor, {useEffect, useRef} from 'dom-augmentor';
import {render, hook} from 'lighterhtml';

const {html, svg} = hook(useRef);

const Button = text => augmentor(() => {
  useEffect(
    () => {
      console.log('connected');
      return () => {
        consle.log('disconnected');
      };
    },
    // empty array to have callbacks invoked
    // only when the node is connected live or disconnected
    []
  );
  html`<button>${text}</button>`;
});

const button = Button('hello');

document.body.appendChild(button());
// or alternatively
// render(document.body, button);

```
