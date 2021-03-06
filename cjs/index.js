'use strict';
/*! (c) Andrea Giammarchi - ISC */
const CustomEvent = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/custom-event'));
const WeakSet = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/weakset'));

const disconnected = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('disconnected'));

const {
  augmentor: $augmentor,
  dropEffect,
  hasEffect
} = require('augmentor');

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

const augmentor = fn => {
  let handler = null;
  const hook = $augmentor(fn);
  return function () {
    const node = hook.apply(this, arguments);
    if (hasEffect(hook))
      observer(node, handler || (handler = dropEffect.bind(null, hook)));
    return node;
  };
};
exports.augmentor = augmentor;

(m => {
  exports.contextual = m.contextual;
  exports.useState = m.useState;
  exports.useEffect = m.useEffect;
  exports.useLayoutEffect = m.useLayoutEffect;
  exports.useContext = m.useContext;
  exports.createContext = m.createContext;
  exports.useReducer = m.useReducer;
  exports.useCallback = m.useCallback;
  exports.useMemo = m.useMemo;
  exports.useRef = m.useRef;
})(require('augmentor'));
