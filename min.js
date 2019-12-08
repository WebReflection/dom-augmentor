/*! (c) Andrea Giammarchi - ISC */
var augmentor=function(n){"use strict";var e={};e.CustomEvent="function"==typeof CustomEvent?CustomEvent:function(n){return e.prototype=new e("").constructor.prototype,e;function e(n,e){e||(e={});var t=document.createEvent("CustomEvent");return t.initCustomEvent(n,!!e.bubbles,!!e.cancelable,e.detail),t}}();var t=e.CustomEvent,r={};try{r.WeakSet=WeakSet}catch(n){!function(n){var e=new n,t=u.prototype;function u(t){e.set(this,new n),t&&t.forEach(this.add,this)}t.add=function(n){return e.get(this).set(n,1),this},t.delete=function(n){return e.get(this).delete(n)},t.has=function(n){return e.get(this).has(n)},r.WeakSet=u}(WeakMap)}var u=r.WeakSet;var o="function"==typeof cancelAnimationFrame,a=o?cancelAnimationFrame:clearTimeout,i=o?requestAnimationFrame:setTimeout;function c(n){var e,t,r,u,c;return f(),function(n,o,a){return r=n,u=o,c=a,t||(t=i(s)),--e<0&&l(!0),l};function s(){f(),r.apply(u,c||[])}function f(){e=n||1/0,t=o?0:null}function l(n){var e=!!t;return e&&(a(t),n&&s()),e}}var s=null,f=function(n){var e=[];return function t(){var r=s,u=[];s={hook:t,args:arguments,stack:e,i:0,length:e.length,after:u};try{return n.apply(null,arguments)}finally{s=r;for(var o=0,a=u.length;o<a;o++)u[o]()}}},l=new WeakMap,v=function(n,e,t){n.apply(e,t)},h={async:!1,always:!1},d=function(n,e){var t=s,r=t.hook,u=t.args,o=t.stack,a=t.i,i=t.length,f=e||h,d=f.async,p=f.always;a===i&&(s.length=o.push({$:"function"==typeof n?n():n,_:d?l.get(r)||function(n){var e=c();return l.set(n,e),e}(r):v}));var g=o[s.i++];return[g.$,function(n){var e="function"==typeof n?n(g.$):n;(p||g.$!==e)&&(g.$=e,g._(r,null,u))}]},p=new WeakMap,g=function(n){var e=n.hook,t=n.args;e.apply(null,t)};function m(n){this.value!==n&&(this.value=n,p.get(this).forEach(g))}function y(n){return n.hook===this.hook}var k=new WeakMap,E=function(){},w=function(n){return function(e,t){var r=s,u=r.hook,o=r.after,a=r.stack,i=r.i,f=r.length;if(s.i++,i<f){var l=a[i],v=l.clean,h=l.update,d=l.values;if(!t||t.some(M,d)){l.values=t,v&&(l.clean=null,v());var p=function(){l.clean=e()};n?o.push(p):h(p)}}else{var g=n?E:c(),m={clean:null,stop:E,update:g,values:t};s.length=a.push(m),(k.get(u)||function(n){var e=[];return k.set(n,e),e}(u)).push(m);var y=function(){m.clean=e()};n?o.push(y):m.stop=g(y)}}},b=w(!1),W=w(!0),C=k.has.bind(k),N=function(n,e){var t=s,r=t.stack,u=t.i;return u===t.length?s.length=r.push({$:n(),_:e}):e&&!e.some(M,r[u]._)||(r[u]={$:n(),_:e}),r[s.i++].$};function M(n,e){return n!==this[e]}var $=function(n){var e=n.Event,t=n.WeakSet,r=!0,u=null;return function(n){return r&&(r=!r,u=new t,function(n){var r=new t,o=new t;try{new MutationObserver(s).observe(n,{subtree:!0,childList:!0})}catch(e){var a=0,i=[],c=function(n){i.push(n),clearTimeout(a),a=setTimeout(function(){s(i.splice(a=0,i.length))},0)};n.addEventListener("DOMNodeRemoved",function(n){c({addedNodes:[],removedNodes:[n.target]})},!0),n.addEventListener("DOMNodeInserted",function(n){c({addedNodes:[n.target],removedNodes:[]})},!0)}function s(n){for(var e,t=n.length,u=0;u<t;u++)f((e=n[u]).removedNodes,"disconnected",o,r),f(e.addedNodes,"connected",r,o)}function f(n,t,r,u){for(var o,a=new e(t),i=n.length,c=0;c<i;1===(o=n[c++]).nodeType&&l(o,a,t,r,u));}function l(n,e,t,r,o){u.has(n)&&!r.has(n)&&(o.delete(n),r.add(n),n.dispatchEvent(e));for(var a=n.children||[],i=a.length,c=0;c<i;l(a[c++],e,t,r,o));}}(n.ownerDocument)),u.add(n),n}}({Event:t,WeakSet:u});return n.augmentor=function(n){var e=null,t=f(n);return function(){var n=t.apply(this,arguments);return C(t)&&function n(e,t){var r=e.nodeType;if(r){var u=1===r?e:function(n){for(var e=n.childNodes,t=e.length,r=0;r<t;){var u=e[r++];if(1===u.nodeType)return u}throw"unobservable"}(e);$(u),u.addEventListener("disconnected",t,!1)}else{var o=e.valueOf();o!==e&&n(o,t)}}(n,e||(e=function(n){(k.get(n)||[]).forEach(function(n){var e=n.clean;(0,n.stop)(),e&&(n.clean=null,e())})}.bind(null,t))),n}},n.contextual=function(n){var e=null,t=f(function(){return n.apply(e,arguments)});return function(){return e=this,t.apply(this,arguments)}},n.createContext=function(n){var e={value:n,provide:m};return p.set(e,[]),e},n.useCallback=function(n,e){return N(function(){return n},e)},n.useContext=function(n){var e=s,t=e.hook,r=e.args,u=p.get(n),o={hook:t,args:r};return u.some(y,o)||u.push(o),n.value},n.useEffect=b,n.useLayoutEffect=W,n.useMemo=N,n.useReducer=function(n,e,t,r){var u="function"==typeof t,o=d(u?t(e):e,u?r:t);return[o[0],function(e){o[1](n(o[0],e))}]},n.useRef=function(n){var e=s,t=e.stack;return e.i===e.length&&(s.length=t.push({current:n})),t[s.i++]},n.useState=d,n}({});
