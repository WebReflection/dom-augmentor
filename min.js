/*! (c) Andrea Giammarchi - ISC */
var augmentor=function(n){"use strict";var e={};e.CustomEvent="function"==typeof CustomEvent?CustomEvent:function(n){return e.prototype=new e("").constructor.prototype,e;function e(n,e){e||(e={});var t=document.createEvent("CustomEvent");return t.initCustomEvent(n,!!e.bubbles,!!e.cancelable,e.detail),t}}();var t=e.CustomEvent,r={};try{r.WeakSet=WeakSet}catch(n){!function(n){var e=new n,t=u.prototype;function u(t){e.set(this,new n),t&&t.forEach(this.add,this)}t.add=function(n){return e.get(this).set(n,1),this},t.delete=function(n){return e.get(this).delete(n)},t.has=function(n){return e.get(this).has(n)},r.WeakSet=u}(WeakMap)}var u=r.WeakSet;var o="function"==typeof cancelAnimationFrame,a=o?cancelAnimationFrame:clearTimeout,c=o?requestAnimationFrame:setTimeout;function i(n){var e,t,r,u,i;return f(),function(n,o,a){return r=n,u=o,i=a,t||(t=c(s)),--e<0&&l(!0),l};function s(){f(),r.apply(u,i||[])}function f(){e=n||1/0,t=o?0:null}function l(n){var e=!!t;return e&&(a(t),n&&s()),e}}var s=function(n){return{get:function(e){return n.get(e)},set:function(e,t){return n.set(e,t),t}}},f=null,l=function(n){var e=[];return function t(){var r=f,u=[];f={hook:t,args:arguments,stack:e,i:0,length:e.length,after:u};try{return n.apply(null,arguments)}finally{f=r;for(var o=0,a=u.length;o<a;o++)u[o]()}}},v=s(new WeakMap),h=function(n,e,t){n.apply(e,t)},d={async:!1,always:!1},p=function(n,e){var t=f.i++,r=f,u=r.hook,o=r.args,a=r.stack,c=r.length,s=e||d,l=s.async,p=s.always;t===c&&(f.length=a.push({$:"function"==typeof n?n():n,_:l?v.get(u)||v.set(u,i()):h}));var g=a[t];return[g.$,function(n){var e="function"==typeof n?n(g.$):n;(p||g.$!==e)&&(g.$=e,g._(u,null,o))}]},g=new WeakMap,m=function(n){var e=n.hook,t=n.args;e.apply(null,t)};function y(n){this.value!==n&&(this.value=n,g.get(this).forEach(m))}function k(n){return n.hook===this.hook}var E=new WeakMap,w=s(E),b=function(){},W=function(n){return function(e,t){var r=f.i++,u=f,o=u.hook,a=u.after,c=u.stack;if(r<u.length){var s=c[r],l=s.update,v=s.values,h=s.stop;if(!t||t.some(S,v)){s.values=t,n&&h(n);var d=s.clean;d&&(s.clean=null,d());var p=function(){s.clean=e()};n?l(p):a.push(p)}}else{var g=n?i():b,m={clean:null,update:g,values:t,stop:b};f.length=c.push(m),(w.get(o)||w.set(o,[])).push(m);var y=function(){m.clean=e()};n?m.stop=g(y):a.push(y)}}},C=E.has.bind(E),N=W(!0),M=W(!1),$=function(n,e){var t=f.i++,r=f,u=r.stack;return t===r.length?f.length=u.push({$:n(),_:e}):e&&!e.some(S,u[t]._)||(u[t]={$:n(),_:e}),u[t].$};function S(n,e){return n!==this[e]}var T=function(n){var e=n.Event,t=n.WeakSet,r=!0,u=null;return function(n){return r&&(r=!r,u=new t,function(n){var r=new t,o=new t;try{new MutationObserver(s).observe(n,{subtree:!0,childList:!0})}catch(e){var a=0,c=[],i=function(n){c.push(n),clearTimeout(a),a=setTimeout(function(){s(c.splice(a=0,c.length))},0)};n.addEventListener("DOMNodeRemoved",function(n){i({addedNodes:[],removedNodes:[n.target]})},!0),n.addEventListener("DOMNodeInserted",function(n){i({addedNodes:[n.target],removedNodes:[]})},!0)}function s(n){for(var e,t=n.length,u=0;u<t;u++)f((e=n[u]).removedNodes,"disconnected",o,r),f(e.addedNodes,"connected",r,o)}function f(n,t,r,u){for(var o,a=new e(t),c=n.length,i=0;i<c;1===(o=n[i++]).nodeType&&l(o,a,t,r,u));}function l(n,e,t,r,o){u.has(n)&&!r.has(n)&&(o.delete(n),r.add(n),n.dispatchEvent(e));for(var a=n.children||[],c=a.length,i=0;i<c;l(a[i++],e,t,r,o));}}(n.ownerDocument)),u.add(n),n}}({Event:t,WeakSet:u});return n.augmentor=function(n){var e=null,t=l(n);return function(){var n=t.apply(this,arguments);return C(t)&&function n(e,t){var r=e.nodeType;if(r){var u=1===r?e:function(n){for(var e=n.childNodes,t=e.length,r=0;r<t;){var u=e[r++];if(1===u.nodeType)return u}throw"unobservable"}(e);T(u),u.addEventListener("disconnected",t,!1)}else{var o=e.valueOf();o!==e&&n(o,t)}}(n,e||(e=function(n){(E.get(n)||[]).forEach(function(n){var e=n.clean;(0,n.stop)(),e&&(n.clean=null,e())})}.bind(null,t))),n}},n.contextual=function(n){var e=!0,t=null,r=l(function(){return n.apply(t,arguments)});return function n(){var u=r.apply(t=this,arguments);return e&&(e=!e,C(r)&&E.set(n,E.get(r))),u}},n.createContext=function(n){var e={value:n,provide:y};return g.set(e,[]),e},n.useCallback=function(n,e){return $(function(){return n},e)},n.useContext=function(n){var e=f,t=e.hook,r=e.args,u=g.get(n),o={hook:t,args:r};return u.some(k,o)||u.push(o),n.value},n.useEffect=N,n.useLayoutEffect=M,n.useMemo=$,n.useReducer=function(n,e,t,r){var u="function"==typeof t,o=p(u?t(e):e,u?r:t);return[o[0],function(e){o[1](n(o[0],e))}]},n.useRef=function(n){var e=f.i++,t=f,r=t.stack;return e===t.length&&(f.length=r.push({current:n})),r[e]},n.useState=p,n}({});
