import CustomEvent from '@ungap/custom-event';
import WeakSet from '@ungap/weakset';

import augmentor, {
  useCallback,
  useEffect as effect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState
} from 'augmentor';

import disconnected from 'disconnected';

const find = node => {
  const {childNodes} = node;
  const {length} = childNodes;
  let i = 0;
  while (i < length) {
    const child = childNodes[i++];
    if (child.nodeType === 1)
      return child;
  }
  throw 'unobservable';
};

const observe = disconnected({Event: CustomEvent, WeakSet});

const observer = ($, element) => {
  const {nodeType} = element;
  if (nodeType) {
    const node = nodeType === 1 ? element : find(element);
    observe(node);
    const handler = {handleEvent, onconnected, ondisconnected, $, _: null};
    node.addEventListener('connected', handler, false);
    node.addEventListener('disconnected', handler, false);
  }
  else {
    const value = element.valueOf();
    // give a chance to facades to return a reasonable value
    if (value !== element)
      observer($, value);
  }
};

const useEffect = (fn, inputs) => {
  const args = [fn];
  if (inputs)
    // if the inputs is an empty array
    // observe the returned element for connect/disconnect events
    // and invoke effects/cleanup on these events only
    args.push(inputs.length ? inputs : observer);
  return effect.apply(null, args);
};

export default augmentor;

export {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState
};

// handlers methods
function handleEvent(e) {
  this['on' + e.type]();
}

function onconnected() {
  ondisconnected.call(this);
  this._ = this.$();
}

function ondisconnected() {
  const {_} = this;
  this._ = null;
  if (_)
    _();
}
