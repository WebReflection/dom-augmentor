/*! (c) Andrea Giammarchi - ISC */
var augmentor=function(n){"use strict";var e={};e.CustomEvent="function"==typeof CustomEvent?CustomEvent:function(n){return e.prototype=new e("").constructor.prototype,e;function e(n,e){e||(e={});var t=document.createEvent("CustomEvent");return t.initCustomEvent(n,!!e.bubbles,!!e.cancelable,e.detail),t}}();var t=e.CustomEvent,r={};try{r.WeakSet=WeakSet}catch(n){!function(n){var e=new n,t=u.prototype;function u(t){e.set(this,new n),t&&t.forEach(this.add,this)}t.add=function(n){return e.get(this).set(n,1),this},t.delete=function(n){return e.get(this).delete(n)},t.has=function(n){return e.get(this).has(n)},r.WeakSet=u}(WeakMap)}var u=r.WeakSet;var a="function"==typeof cancelAnimationFrame,o=a?cancelAnimationFrame:clearTimeout,c=a?requestAnimationFrame:setTimeout;function i(n){var e,t,r,u,i;return f(),function(n,a,o){return r=n,u=a,i=o,t||(t=c(s)),--e<0&&l(!0),l};function s(){f(),r.apply(u,i||[])}function f(){e=n||1/0,t=a?0:null}function l(n){var e=!!t;return e&&(o(t),n&&s()),e}}var s=null,f=function(n){var e=[];return function t(){var r=s,u=[];s={hook:t,args:arguments,stack:e,i:0,length:e.length,after:u};try{return n.apply(null,arguments)}finally{s=r;for(var a=0,o=u.length;a<o;a++)u[a]()}}},l=new WeakMap,v=function(n,e,t){n.apply(e,t)},h={async:!1,always:!1},d=function(n,e){var t=s.i++,r=s,u=r.hook,a=r.args,o=r.stack,c=r.length,f=e||h,d=f.async,p=f.always;t===c&&(s.length=o.push({$:"function"==typeof n?n():n,_:d?l.get(u)||function(n){var e=i();return l.set(n,e),e}(u):v}));var g=o[t];return[g.$,function(n){var e="function"==typeof n?n(g.$):n;(p||g.$!==e)&&(g.$=e,g._(u,null,a))}]},p=new WeakMap,g=function(n){var e=n.hook,t=n.args;e.apply(null,t)};function m(n){this.value!==n&&(this.value=n,p.get(this).forEach(g))}function y(n){return n.hook===this.hook}var k=new WeakMap,E=function(){},w=function(n){return function(e,t){var r=s.i++,u=s,a=u.hook,o=u.after,c=u.stack;if(r<u.length){var f=c[r],l=f.update,v=f.values,h=f.stop;if(!t||t.some(M,v)){f.values=t,n&&h(n);var d=f.clean;d&&(f.clean=null,d());var p=function(){f.clean=e()};n?l(p):o.push(p)}}else{var g=n?i():E,m={clean:null,update:g,values:t,stop:E};s.length=c.push(m),(k.get(a)||function(n){var e=[];return k.set(n,e),e}(a)).push(m);var y=function(){m.clean=e()};n?m.stop=g(y):o.push(y)}}},b=k.has.bind(k),W=w(!0),C=w(!1),N=function(n,e){var t=s.i++,r=s,u=r.stack;return t===r.length?s.length=u.push({$:n(),_:e}):e&&!e.some(M,u[t]._)||(u[t]={$:n(),_:e}),u[t].$};function M(n,e){return n!==this[e]}var $=function(n){var e=n.Event,t=n.WeakSet,r=!0,u=null;return function(n){return r&&(r=!r,u=new t,function(n){var r=new t,a=new t;try{new MutationObserver(s).observe(n,{subtree:!0,childList:!0})}catch(e){var o=0,c=[],i=function(n){c.push(n),clearTimeout(o),o=setTimeout(function(){s(c.splice(o=0,c.length))},0)};n.addEventListener("DOMNodeRemoved",function(n){i({addedNodes:[],removedNodes:[n.target]})},!0),n.addEventListener("DOMNodeInserted",function(n){i({addedNodes:[n.target],removedNodes:[]})},!0)}function s(n){for(var e,t=n.length,u=0;u<t;u++)f((e=n[u]).removedNodes,"disconnected",a,r),f(e.addedNodes,"connected",r,a)}function f(n,t,r,u){for(var a,o=new e(t),c=n.length,i=0;i<c;1===(a=n[i++]).nodeType&&l(a,o,t,r,u));}function l(n,e,t,r,a){u.has(n)&&!r.has(n)&&(a.delete(n),r.add(n),n.dispatchEvent(e));for(var o=n.children||[],c=o.length,i=0;i<c;l(o[i++],e,t,r,a));}}(n.ownerDocument)),u.add(n),n}}({Event:t,WeakSet:u});return n.augmentor=function(n){var e=null,t=f(n);return function(){var n=t.apply(this,arguments);return b(t)&&function n(e,t){var r=e.nodeType;if(r){var u=1===r?e:function(n){for(var e=n.childNodes,t=e.length,r=0;r<t;){var u=e[r++];if(1===u.nodeType)return u}throw"unobservable"}(e);$(u),u.addEventListener("disconnected",t,!1)}else{var a=e.valueOf();a!==e&&n(a,t)}}(n,e||(e=function(n){(k.get(n)||[]).forEach(function(n){var e=n.clean;(0,n.stop)(),e&&(n.clean=null,e())})}.bind(null,t))),n}},n.contextual=function(n){var e=!0,t=null,r=f(function(){return n.apply(t,arguments)});return function n(){var u=r.apply(t=this,arguments);return e&&(e=!e,b(r)&&k.set(n,k.get(r))),u}},n.createContext=function(n){var e={value:n,provide:m};return p.set(e,[]),e},n.useCallback=function(n,e){return N(function(){return n},e)},n.useContext=function(n){var e=s,t=e.hook,r=e.args,u=p.get(n),a={hook:t,args:r};return u.some(y,a)||u.push(a),n.value},n.useEffect=W,n.useLayoutEffect=C,n.useMemo=N,n.useReducer=function(n,e,t,r){var u="function"==typeof t,a=d(u?t(e):e,u?r:t);return[a[0],function(e){a[1](n(a[0],e))}]},n.useRef=function(n){var e=s.i++,t=s,r=t.stack;return e===t.length&&(s.length=r.push({current:n})),r[e]},n.useState=d,n}({});
