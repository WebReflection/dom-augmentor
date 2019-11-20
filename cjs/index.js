'use strict';
/*! (c) Andrea Giammarchi - ISC */
const CustomEvent = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/custom-event'));
const WeakSet = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/weakset'));

const disconnected = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('disconnected'));

const {
  augmentor: $augmentor,
  useEffect: $useEffect,
  dropEffect
} = require('augmentor');

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
const augmentor = fn => {
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
exports.augmentor = augmentor;

(m => {
  exports.contextual = m.contextual;
  exports.useState = m.useState;
  exports.useLayoutEffect = m.useLayoutEffect;
  exports.useContext = m.useContext;
  exports.createContext = m.createContext;
  exports.useReducer = m.useReducer;
  exports.useCallback = m.useCallback;
  exports.useMemo = m.useMemo;
  exports.useRef = m.useRef;
})(require('augmentor'));

function useEffect() {
  effect = true;
  return $useEffect.apply(null, arguments);
}
exports.useEffect = useEffect
