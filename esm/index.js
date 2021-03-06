/*! (c) Andrea Giammarchi - ISC */
import CustomEvent from '@ungap/custom-event';
import WeakSet from '@ungap/weakset';

import disconnected from 'disconnected';

import {
  augmentor as $augmentor,
  dropEffect, hasEffect
} from 'augmentor';

const find = node => {
  let {firstChild} = node;
  while (firstChild && firstChild.nodeType !== 1)
    firstChild = firstChild.nextSibling;
  if (firstChild)
    return firstChild;
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

export const augmentor = fn => {
  let handler = null;
  const hook = $augmentor(fn);
  return function () {
    const node = hook.apply(this, arguments);
    if (hasEffect(hook))
      observer(node, handler || (handler = dropEffect.bind(null, hook)));
    return node;
  };
};

export {
  contextual,
  useState,
  useEffect, useLayoutEffect,
  useContext, createContext,
  useReducer,
  useCallback,
  useMemo,
  useRef
} from 'augmentor';
