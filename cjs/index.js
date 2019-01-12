'use strict';
const CustomEvent = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/custom-event'));
const WeakSet = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/weakset'));

const augmentor = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('augmentor'));
const {
  useCallback,
  useEffect: effect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState
} = require('augmentor');

const disconnected = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('disconnected'));

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

Object.defineProperty(exports, '__esModule', {value: true}).default = augmentor;

exports.useCallback = useCallback;
exports.useEffect = useEffect;
exports.useLayoutEffect = useLayoutEffect;
exports.useMemo = useMemo;
exports.useReducer = useReducer;
exports.useRef = useRef;
exports.useState = useState;

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
