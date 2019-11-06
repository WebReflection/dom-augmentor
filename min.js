/*! (c) Andrea Giammarchi - ISC */
var augmentor=function(e){"use strict";var n={};n.CustomEvent="function"==typeof CustomEvent?CustomEvent:function(e){return n.prototype=new n("").constructor.prototype,n;function n(e,n){n||(n={});var t=document.createEvent("CustomEvent");return t.initCustomEvent(e,!!n.bubbles,!!n.cancelable,n.detail),t}}();var t=n.CustomEvent,r={};try{r.WeakSet=WeakSet}catch(e){!function(e){var n=new e,t=u.prototype;function u(t){n.set(this,new e),t&&t.forEach(this.add,this)}t.add=function(e){return n.get(this).set(e,1),this},t.delete=function(e){return n.get(this).delete(e)},t.has=function(e){return n.get(this).has(e)},r.WeakSet=u}(WeakMap)}var u=r.WeakSet;var o=null,a=function(e){e()},c=function(){return o};function i(e,n){return e!==this[n]}var s="function"==typeof cancelAnimationFrame,f=s?cancelAnimationFrame:clearTimeout,l=s?requestAnimationFrame:setTimeout;function v(e){var n,t,r,u,o;return c(),function(e,c,s){return r=e,u=c,o=s,t||(t=l(a)),--n<0&&i(!0),i};function a(){c(),r.apply(u,o||[])}function c(){n=e||1/0,t=s?0:null}function i(e){var n=!!t;return n&&(f(t),e&&a()),n}}var d=v(),h=function(e){var n=c(),t=n.hook,r=n.args,u=n.stack,o=n.index;return u.length<=o&&(u[o]=e),[u[o],function(e){u[o]=e,d(t,null,r)}]},p=new WeakMap,m=function(e){var n=e.hook,t=e.args;n.apply(null,t)};function g(e){this.value!==e&&(this.value=e,p.get(this).forEach(m))}function k(e){return e.hook===this.hook}var E=new WeakMap,y=function(){},w=function(e){return function(n,t){var r=c(),u=r.hook,o=r.stack,a=r.index,s=r.after;if(a<o.length){var f=o[a],l=f.clean,d=f.invoke,h=f.update,p=f.values;t&&!t.some(i,p)||(f.values=t,l&&(f.clean=null,l()),e?s.push(d):h(d))}else{var m=function(){k.clean=n()},g=v(),k={clean:null,invoke:m,stop:y,update:g,values:t};o[a]=k,(E.get(u)||E.set(u,[]).get(u)).push(k),e?s.push(m):k.stop=g(m)}}},b=w(!1),C=w(!0),N=function(e,n){var t=c(),r=t.stack,u=t.index;return(!n||r.length<=u||n.some(i,r[u].values))&&(r[u]={current:e(),values:n}),r[u].current},W=function(e){var n=e.Event,t=e.WeakSet,r=!0,u=null;return function(e){return r&&(r=!r,u=new t,function(e){var r=new t,o=new t;try{new MutationObserver(s).observe(e,{subtree:!0,childList:!0})}catch(n){var a=0,c=[],i=function(e){c.push(e),clearTimeout(a),a=setTimeout(function(){s(c.splice(a=0,c.length))},0)};e.addEventListener("DOMNodeRemoved",function(e){i({addedNodes:[],removedNodes:[e.target]})},!0),e.addEventListener("DOMNodeInserted",function(e){i({addedNodes:[e.target],removedNodes:[]})},!0)}function s(e){for(var n,t=e.length,u=0;u<t;u++)f((n=e[u]).removedNodes,"disconnected",o,r),f(n.addedNodes,"connected",r,o)}function f(e,t,r,u){for(var o,a=new n(t),c=e.length,i=0;i<c;1===(o=e[i++]).nodeType&&l(o,a,t,r,u));}function l(e,n,t,r,o){u.has(e)&&!r.has(e)&&(o.delete(e),r.add(e),e.dispatchEvent(n));for(var a=e.children||[],c=a.length,i=0;i<c;l(a[i++],n,t,r,o));}}(e.ownerDocument)),u.add(e),e}}({Event:t,WeakSet:u});return e.augmentor=function(e){var n=function(e){var n=[];return function t(){var r=o,u=[],c=0;o={hook:t,args:arguments,stack:n,get index(){return c++},after:u};try{return e.apply(null,arguments)}finally{o=r,u.forEach(a)}}}(e),t=function(e){E.has(e)&&E.get(e).forEach(function(e){var n=e.clean;(0,e.stop)(),n&&(e.clean=null,n())})}.bind(null,n);return function(){return function e(n,t){var r=n.nodeType;if(r){var u=1===r?n:function(e){for(var n=e.childNodes,t=n.length,r=0;r<t;){var u=n[r++];if(1===u.nodeType)return u}throw"unobservable"}(n);W(u),u.addEventListener("disconnected",t,!1)}else{var o=n.valueOf();o!==n&&e(o,t)}return n}(n.apply(this,arguments),t)}},e.createContext=function(e){var n={value:e,provide:g};return p.set(n,[]),n},e.useCallback=function(e,n){return N(function(){return e},n)},e.useContext=function(e){var n=c(),t=n.hook,r=n.args,u=p.get(e),o={hook:t,args:r};return u.some(k,o)||u.push(o),e.value},e.useEffect=b,e.useLayoutEffect=C,e.useMemo=N,e.useReducer=function(e,n,t){var r=h(t?t(n):n);return[r[0],function(n){r[1](e(r[0],n))}]},e.useRef=function(e){var n=c(),t=n.stack,r=n.index;return r<t.length?t[r]:t[r]={current:e}},e.useState=h,e}({});
