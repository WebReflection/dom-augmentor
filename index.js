var augmentor = (function (exports) {
  'use strict';

  /*! (c) Andrea Giammarchi - ISC */
  var self = null ||
  /* istanbul ignore next */
  {};
  self.CustomEvent = typeof CustomEvent === 'function' ? CustomEvent : function (__p__) {
    CustomEvent[__p__] = new CustomEvent('').constructor[__p__];
    return CustomEvent;

    function CustomEvent(type, init) {
      if (!init) init = {};
      var e = document.createEvent('CustomEvent');
      e.initCustomEvent(type, !!init.bubbles, !!init.cancelable, init.detail);
      return e;
    }
  }('prototype');
  var CustomEvent$1 = self.CustomEvent;

  /*! (c) Andrea Giammarchi - ISC */
  var self$1 = null ||
  /* istanbul ignore next */
  {};

  try {
    self$1.WeakSet = WeakSet;
  } catch (WeakSet) {
    // requires a global WeakMap (IE11+)
    (function (WeakMap) {
      var all = new WeakMap();
      var proto = WeakSet.prototype;

      proto.add = function (value) {
        return all.get(this).set(value, 1), this;
      };

      proto["delete"] = function (value) {
        return all.get(this)["delete"](value);
      };

      proto.has = function (value) {
        return all.get(this).has(value);
      };

      self$1.WeakSet = WeakSet;

      function WeakSet(iterable) {

        all.set(this, new WeakMap());
        if (iterable) iterable.forEach(this.add, this);
      }
    })(WeakMap);
  }

  var WeakSet$1 = self$1.WeakSet;

  /*! (c) Andrea Giammarchi */
  function disconnected(poly) {

    var Event = poly.Event;
    var WeakSet = poly.WeakSet;
    var notObserving = true;
    var observer = null;
    return function observe(node) {
      if (notObserving) {
        notObserving = !notObserving;
        observer = new WeakSet();
        startObserving(node.ownerDocument);
      }

      observer.add(node);
      return node;
    };

    function startObserving(document) {
      var connected = new WeakSet();
      var disconnected = new WeakSet();

      try {
        new MutationObserver(changes).observe(document, {
          subtree: true,
          childList: true
        });
      } catch (o_O) {
        var timer = 0;
        var records = [];

        var reschedule = function reschedule(record) {
          records.push(record);
          clearTimeout(timer);
          timer = setTimeout(function () {
            changes(records.splice(timer = 0, records.length));
          }, 0);
        };

        document.addEventListener('DOMNodeRemoved', function (event) {
          reschedule({
            addedNodes: [],
            removedNodes: [event.target]
          });
        }, true);
        document.addEventListener('DOMNodeInserted', function (event) {
          reschedule({
            addedNodes: [event.target],
            removedNodes: []
          });
        }, true);
      }

      function changes(records) {
        for (var record, length = records.length, i = 0; i < length; i++) {
          record = records[i];
          dispatchAll(record.removedNodes, 'disconnected', disconnected, connected);
          dispatchAll(record.addedNodes, 'connected', connected, disconnected);
        }
      }

      function dispatchAll(nodes, type, wsin, wsout) {
        for (var node, event = new Event(type), length = nodes.length, i = 0; i < length; (node = nodes[i++]).nodeType === 1 && dispatchTarget(node, event, type, wsin, wsout)) {
        }
      }

      function dispatchTarget(node, event, type, wsin, wsout) {
        if (observer.has(node) && !wsin.has(node)) {
          wsout["delete"](node);
          wsin.add(node);
          node.dispatchEvent(event);
          /*
          // The event is not bubbling (perf reason: should it?),
          // hence there's no way to know if
          // stop/Immediate/Propagation() was called.
          // Should DOM Level 0 work at all?
          // I say it's a YAGNI case for the time being,
          // and easy to implement in user-land.
          if (!event.cancelBubble) {
            var fn = node['on' + type];
            if (fn)
              fn.call(node, event);
          }
          */
        }

        for (var // apparently is node.children || IE11 ... ^_^;;
        // https://github.com/WebReflection/disconnected/issues/1
        children = node.children || [], length = children.length, i = 0; i < length; dispatchTarget(children[i++], event, type, wsin, wsout)) {
        }
      }
    }
  }

  /*! (c) Andrea Giammarchi - ISC */
  var curr = null;
  var augmentor = function augmentor(fn) {
    var stack = [];
    return function hook() {
      var prev = curr;
      var after = [];
      curr = {
        hook: hook,
        args: arguments,
        stack: stack,
        i: 0,
        after: after
      };

      try {
        return fn.apply(null, arguments);
      } finally {
        curr = prev;

        for (var i = 0, length = after.length; i < length; i++) {
          after[i]();
        }
      }
    };
  };
  var contextual = function contextual(fn) {
    var context = null;
    var augmented = augmentor(function () {
      return fn.apply(context, arguments);
    });
    return function () {
      context = this;
      return augmented.apply(this, arguments);
    };
  };
  var current = function current() {
    return curr;
  };
  function different(value, i) {
    return value !== this[i];
  }
  var isFunction = function isFunction(fn) {
    return typeof fn === 'function';
  };

  var compat = typeof cancelAnimationFrame === 'function';
  var cAF = compat ? cancelAnimationFrame : clearTimeout;
  var rAF = compat ? requestAnimationFrame : setTimeout;
  function reraf(limit) {
    var force, timer, callback, self, args;
    reset();
    return function reschedule(_callback, _self, _args) {
      callback = _callback;
      self = _self;
      args = _args;
      if (!timer) timer = rAF(invoke);
      if (--force < 0) stop(true);
      return stop;
    };

    function invoke() {
      reset();
      callback.apply(self, args || []);
    }

    function reset() {
      force = limit || Infinity;
      timer = compat ? 0 : null;
    }

    function stop(flush) {
      var didStop = !!timer;

      if (didStop) {
        cAF(timer);
        if (flush) invoke();
      }

      return didStop;
    }
  }

  /*! (c) Andrea Giammarchi - ISC */
  var updates = new WeakMap();

  var update = function update(hook, ctx, args) {
    hook.apply(ctx, args);
  };

  var defaults = {
    sync: false,
    always: false
  };
  var useState = function useState(value, options) {
    var state = current();
    var i = state.i++;
    var hook = state.hook,
        args = state.args,
        stack = state.stack;

    var _ref = options || defaults,
        sync = _ref.sync,
        always = _ref.always;

    if (stack.length <= i) {
      stack[i] = isFunction(value) ? value() : value;
      if (!updates.has(hook)) updates.set(hook, sync ? update : reraf());
    }

    return [stack[i], function (value) {
      var newValue = isFunction(value) ? value(stack[i]) : value;

      if (always || stack[i] !== newValue) {
        stack[i] = newValue;
        updates.get(hook)(hook, null, args);
      }
    }];
  };

  /*! (c) Andrea Giammarchi - ISC */
  var hooks = new WeakMap();

  var invoke = function invoke(_ref) {
    var hook = _ref.hook,
        args = _ref.args;
    hook.apply(null, args);
  };

  var createContext = function createContext(value) {
    var context = {
      value: value,
      provide: provide
    };
    hooks.set(context, []);
    return context;
  };
  var useContext = function useContext(context) {
    var _current = current(),
        hook = _current.hook,
        args = _current.args;

    var stack = hooks.get(context);
    var info = {
      hook: hook,
      args: args
    };
    if (!stack.some(update$1, info)) stack.push(info);
    return context.value;
  };

  function provide(value) {
    if (this.value !== value) {
      this.value = value;
      hooks.get(this).forEach(invoke);
    }
  }

  function update$1(_ref2) {
    var hook = _ref2.hook;
    return hook === this.hook;
  }

  /*! (c) Andrea Giammarchi - ISC */
  var effects = new WeakMap();

  var stop = function stop() {};

  var createEffect = function createEffect(sync) {
    return function (effect, guards) {
      var state = current();
      var i = state.i++;
      var hook = state.hook,
          stack = state.stack,
          after = state.after;

      if (i < stack.length) {
        var info = stack[i];
        var clean = info.clean,
            update = info.update,
            values = info.values;

        if (!guards || guards.some(different, values)) {
          info.values = guards;

          if (clean) {
            info.clean = null;
            clean();
          }

          var invoke = function invoke() {
            info.clean = effect();
          };

          if (sync) after.push(invoke);else update(invoke);
        }
      } else {
        if (!effects.has(hook)) effects.set(hook, {
          stack: [],
          update: reraf()
        });
        var details = effects.get(hook);
        var _info = {
          clean: null,
          stop: stop,
          update: details.update,
          values: guards
        };
        stack[i] = _info;
        details.stack.push(_info);

        var _invoke = function _invoke() {
          _info.clean = effect();
        };

        if (sync) after.push(_invoke);else _info.stop = details.update(_invoke);
      }
    };
  };

  var useEffect = createEffect(false);
  var useLayoutEffect = createEffect(true);
  var dropEffect = function dropEffect(hook) {
    if (effects.has(hook)) effects.get(hook).stack.forEach(function (info) {
      var clean = info.clean,
          stop = info.stop;
      stop();

      if (clean) {
        info.clean = null;
        clean();
      }
    });
  };

  /*! (c) Andrea Giammarchi - ISC */
  var useMemo = function useMemo(memo, guards) {
    var state = current();
    var i = state.i++;
    var stack = state.stack;
    if (!guards || stack.length <= i || guards.some(different, stack[i].values)) stack[i] = {
      current: memo(),
      values: guards
    };
    return stack[i].current;
  };
  var useCallback = function useCallback(fn, guards) {
    return useMemo(function () {
      return fn;
    }, guards);
  };

  /*! (c) Andrea Giammarchi - ISC */
  var useReducer = function useReducer(reducer, value, init, options) {
    var fn = typeof init === 'function'; // avoid `cons [state, update] = ...` Babel destructuring bloat

    var pair = useState(fn ? init(value) : value, fn ? options : init);
    return [pair[0], function (value) {
      pair[1](reducer(pair[0], value));
    }];
  };

  /*! (c) Andrea Giammarchi - ISC */
  var useRef = function useRef(value) {
    var state = current();
    var i = state.i++;
    var stack = state.stack;
    return i < stack.length ? stack[i] : stack[i] = {
      current: value
    };
  };

  /*! (c) Andrea Giammarchi - ISC */

  var find = function find(node) {
    var childNodes = node.childNodes;
    var length = childNodes.length;
    var i = 0;

    while (i < length) {
      var child = childNodes[i++];
      if (child.nodeType === 1) return child;
    }

    throw 'unobservable';
  };

  var observe = disconnected({
    Event: CustomEvent$1,
    WeakSet: WeakSet$1
  });

  var observer = function observer(element, handler) {
    var nodeType = element.nodeType;

    if (nodeType) {
      var node = nodeType === 1 ? element : find(element);
      observe(node);
      node.addEventListener('disconnected', handler, false);
    } else {
      var value = element.valueOf(); // give a chance to facades to return a reasonable value

      if (value !== element) observer(value, handler);
    }
  };

  var effect = false;
  var augmentor$1 = function augmentor$1(fn) {
    var hook = augmentor(fn);
    var handler = null;
    return function () {
      effect = false;
      var node = hook.apply(this, arguments);

      if (effect) {
        effect = false;
        observer(node, handler || (handler = dropEffect.bind(null, hook)));
      }

      return node;
    };
  };
  function useEffect$1() {
    effect = true;
    return useEffect.apply(null, arguments);
  }

  exports.augmentor = augmentor$1;
  exports.contextual = contextual;
  exports.createContext = createContext;
  exports.useCallback = useCallback;
  exports.useContext = useContext;
  exports.useEffect = useEffect$1;
  exports.useLayoutEffect = useLayoutEffect;
  exports.useMemo = useMemo;
  exports.useReducer = useReducer;
  exports.useRef = useRef;
  exports.useState = useState;

  return exports;

}({}));
