/*! (c) Andrea Giammarchi - ISC */
import CustomEvent from '@ungap/custom-event';
import WeakSet from '@ungap/weakset';

import disconnected from 'disconnected';

import {
  augmentor as $augmentor,
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
  return element;
};

export const augmentor = fn => {
  const hook = $augmentor(fn);
  const disconnect = dropEffect.bind(null, hook);
  return function () {
    return observer(hook.apply(this, arguments), disconnect);
  };
};

export {
  useState,
  useEffect, useLayoutEffect,
  useContext, createContext,
  useReducer,
  useCallback,
  useMemo,
  useRef
} from 'augmentor';
