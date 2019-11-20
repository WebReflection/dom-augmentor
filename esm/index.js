/*! (c) Andrea Giammarchi - ISC */
import CustomEvent from '@ungap/custom-event';
import WeakSet from '@ungap/weakset';

import disconnected from 'disconnected';

import {
  augmentor as $augmentor,
  useEffect as $useEffect,
  dropEffect
} from 'augmentor';

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

const observer = (element, handler) => {
  const {nodeType} = element;
  if (nodeType) {
    const node = nodeType === 1 ? element : find(element);
    observe(node);
    node.addEventListener('disconnected', handler, false);
  }
  else {
    const value = element.valueOf();
    // give a chance to facades to return a reasonable value
    if (value !== element)
      observer(value, handler);
  }
};

let effect = false;
export const augmentor = fn => {
  const hook = $augmentor(fn);
  let handler = null;
  return function () {
    effect = false;
    const node = hook.apply(this, arguments);
    if (effect) {
      effect = false;
      observer(node, handler || (handler = dropEffect.bind(null, hook)));
    }
    return node;
  };
};

export {
  contextual,
  useState,
  useLayoutEffect,
  useContext, createContext,
  useReducer,
  useCallback,
  useMemo,
  useRef
} from 'augmentor';

export function useEffect() {
  effect = true;
  return $useEffect.apply(null, arguments);
}
