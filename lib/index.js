!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("@tenchleb/react-virtual-scroll",[],t):"object"==typeof exports?exports["@tenchleb/react-virtual-scroll"]=t():e["@tenchleb/react-virtual-scroll"]=t()}(window,function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=3)}([function(e,t,r){"use strict";e.exports=r(5)},function(e,t,r){"use strict";var n=this&&this.__extends||function(){var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(t,r)};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),o=this&&this.__assign||function(){return(o=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0});var i=r(0),l=r(2),u=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return n(t,e),t.prototype.setTransform=function(e,t){return{transform:"translate(0px, "+e*t+"px)"}},t.prototype.setSizing=function(e){return{height:e,maxHeight:e}},t.prototype.setClasses=function(e){var t=["virtual-scroll-element"];return e%2==0?t.push("is-even"):t.push("is-odd"),0===e&&t.push("is-first"),e===this.props.length&&t.push("is-last"),t.join(" ")},t.prototype.render=function(){var e=this,t=this.props,r=t.list,n=t.height,u=t.offsetIndex;return i.createElement("ul",{className:"virtual-scroll-list",style:l.default["virtual-scroll-list"]},r.map(function(t,r){return i.createElement("li",{key:r+u,className:e.setClasses(r+u),style:o({},l.default["virtual-scroll-element"],e.setSizing(n),e.setTransform(r+u,n))},t)}))},t}(i.Component);t.VirtualScrollList=u},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default={"virtual-scroll-wrapper":{flex:"1 1 100%",position:"relative",overflow:"hidden",overflowY:"auto"},"virtual-scroll-list":{position:"absolute",top:0,listStyle:"none",margin:0,padding:0,height:"100%",width:"100%"},"virtual-scroll-element":{position:"absolute",width:"100%",display:"block",overflow:"hidden"}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(4);t.VirtualScroll=n.VirtualScroll;var o=r(1);t.VirtualScrollList=o.VirtualScrollList},function(e,t,r){"use strict";var n=this&&this.__extends||function(){var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(t,r)};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();Object.defineProperty(t,"__esModule",{value:!0});var o=r(0),i=r(1),l=r(2),u=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.wrapper=o.createRef(),t.state={offsetIndex:0,endIndex:0,selection:[]},t}return n(t,e),t.prototype.select=function(e,t){var r=this.props,n=r.height,o=r.children,i=Math.floor(Math.abs(e)/n),l=Math.round((e+t)/n);return{offsetIndex:i,endIndex:l,selection:o.slice(i,l)}},t.prototype.reshuffle=function(){var e=this.wrapper.current,t=e&&e.scrollTop||0,r=e&&e.clientHeight||0,n=this.select(t,r),o=n.offsetIndex,i=n.endIndex,l=n.selection;this.setState({offsetIndex:o,endIndex:i,selection:l})},t.prototype.shouldComponentUpdate=function(e,t){var r=this.props.children,n=this.state,o=n.offsetIndex,i=n.endIndex;return!(o===t.offsetIndex&&i===t.endIndex)||r.length!==e.children.length},t.prototype.componentDidMount=function(){this.reshuffle()},t.prototype.componentDidUpdate=function(){var e=this.state,t=e.selection,r=e.endIndex,n=this.props,o=n.children,i=n.touchAfter;this.props.onTouchAfter&&(o.length-i<i||o.length-i<=r)&&this.props.onTouchAfter(t.length,o.length),this.props.onTouchdown&&r===o.length&&this.props.onTouchdown(t.length,o.length)},t.prototype.render=function(){var e=this,t=this.props,r=t.height,n=t.children,u=this.state,c=u.offsetIndex,s=u.selection;return o.createElement("div",{className:"virtual-scroll-wrapper",style:l.default["virtual-scroll-wrapper"],ref:this.wrapper,onScroll:function(){return e.reshuffle()}},"string"==typeof s?null:o.createElement(i.VirtualScrollList,{list:s,length:n.length,height:r,offsetIndex:c}),o.createElement("div",{className:"virtual-scroll-expander",style:{height:this.props.children.length*r}}))},t.defaultProps={touchBefore:0,touchAfter:0},t}(o.Component);t.VirtualScroll=u},function(e,t,r){"use strict";
/** @license React v16.6.1
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n=r(6),o="function"==typeof Symbol&&Symbol.for,i=o?Symbol.for("react.element"):60103,l=o?Symbol.for("react.portal"):60106,u=o?Symbol.for("react.fragment"):60107,c=o?Symbol.for("react.strict_mode"):60108,s=o?Symbol.for("react.profiler"):60114,f=o?Symbol.for("react.provider"):60109,a=o?Symbol.for("react.context"):60110,p=o?Symbol.for("react.concurrent_mode"):60111,d=o?Symbol.for("react.forward_ref"):60112,y=o?Symbol.for("react.suspense"):60113,h=o?Symbol.for("react.memo"):60115,v=o?Symbol.for("react.lazy"):60116,m="function"==typeof Symbol&&Symbol.iterator;function b(e){for(var t=arguments.length-1,r="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=0;n<t;n++)r+="&args[]="+encodeURIComponent(arguments[n+1]);!function(e,t,r,n,o,i,l,u){if(!e){if(e=void 0,void 0===t)e=Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var c=[r,n,o,i,l,u],s=0;(e=Error(t.replace(/%s/g,function(){return c[s++]}))).name="Invariant Violation"}throw e.framesToPop=1,e}}(!1,"Minified React error #"+e+"; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",r)}var g={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},_={};function x(e,t,r){this.props=e,this.context=t,this.refs=_,this.updater=r||g}function j(){}function O(e,t,r){this.props=e,this.context=t,this.refs=_,this.updater=r||g}x.prototype.isReactComponent={},x.prototype.setState=function(e,t){"object"!=typeof e&&"function"!=typeof e&&null!=e&&b("85"),this.updater.enqueueSetState(this,e,t,"setState")},x.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},j.prototype=x.prototype;var S=O.prototype=new j;S.constructor=O,n(S,x.prototype),S.isPureReactComponent=!0;var w={current:null,currentDispatcher:null},P=Object.prototype.hasOwnProperty,k={key:!0,ref:!0,__self:!0,__source:!0};function $(e,t,r){var n=void 0,o={},l=null,u=null;if(null!=t)for(n in void 0!==t.ref&&(u=t.ref),void 0!==t.key&&(l=""+t.key),t)P.call(t,n)&&!k.hasOwnProperty(n)&&(o[n]=t[n]);var c=arguments.length-2;if(1===c)o.children=r;else if(1<c){for(var s=Array(c),f=0;f<c;f++)s[f]=arguments[f+2];o.children=s}if(e&&e.defaultProps)for(n in c=e.defaultProps)void 0===o[n]&&(o[n]=c[n]);return{$$typeof:i,type:e,key:l,ref:u,props:o,_owner:w.current}}function I(e){return"object"==typeof e&&null!==e&&e.$$typeof===i}var C=/\/+/g,E=[];function M(e,t,r,n){if(E.length){var o=E.pop();return o.result=e,o.keyPrefix=t,o.func=r,o.context=n,o.count=0,o}return{result:e,keyPrefix:t,func:r,context:n,count:0}}function A(e){e.result=null,e.keyPrefix=null,e.func=null,e.context=null,e.count=0,10>E.length&&E.push(e)}function T(e,t,r){return null==e?0:function e(t,r,n,o){var u=typeof t;"undefined"!==u&&"boolean"!==u||(t=null);var c=!1;if(null===t)c=!0;else switch(u){case"string":case"number":c=!0;break;case"object":switch(t.$$typeof){case i:case l:c=!0}}if(c)return n(o,t,""===r?"."+R(t,0):r),1;if(c=0,r=""===r?".":r+":",Array.isArray(t))for(var s=0;s<t.length;s++){var f=r+R(u=t[s],s);c+=e(u,f,n,o)}else if(f=null===t||"object"!=typeof t?null:"function"==typeof(f=m&&t[m]||t["@@iterator"])?f:null,"function"==typeof f)for(t=f.call(t),s=0;!(u=t.next()).done;)c+=e(u=u.value,f=r+R(u,s++),n,o);else"object"===u&&b("31","[object Object]"==(n=""+t)?"object with keys {"+Object.keys(t).join(", ")+"}":n,"");return c}(e,"",t,r)}function R(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+(""+e).replace(/[=:]/g,function(e){return t[e]})}(e.key):t.toString(36)}function V(e,t){e.func.call(e.context,t,e.count++)}function N(e,t,r){var n=e.result,o=e.keyPrefix;e=e.func.call(e.context,t,e.count++),Array.isArray(e)?U(e,n,r,function(e){return e}):null!=e&&(I(e)&&(e=function(e,t){return{$$typeof:i,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(e,o+(!e.key||t&&t.key===e.key?"":(""+e.key).replace(C,"$&/")+"/")+r)),n.push(e))}function U(e,t,r,n,o){var i="";null!=r&&(i=(""+r).replace(C,"$&/")+"/"),T(e,N,t=M(t,i,n,o)),A(t)}var q={Children:{map:function(e,t,r){if(null==e)return e;var n=[];return U(e,n,null,t,r),n},forEach:function(e,t,r){if(null==e)return e;T(e,V,t=M(null,null,t,r)),A(t)},count:function(e){return T(e,function(){return null},null)},toArray:function(e){var t=[];return U(e,t,null,function(e){return e}),t},only:function(e){return I(e)||b("143"),e}},createRef:function(){return{current:null}},Component:x,PureComponent:O,createContext:function(e,t){return void 0===t&&(t=null),(e={$$typeof:a,_calculateChangedBits:t,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:f,_context:e},e.Consumer=e},forwardRef:function(e){return{$$typeof:d,render:e}},lazy:function(e){return{$$typeof:v,_ctor:e,_status:-1,_result:null}},memo:function(e,t){return{$$typeof:h,type:e,compare:void 0===t?null:t}},Fragment:u,StrictMode:c,Suspense:y,createElement:$,cloneElement:function(e,t,r){(null===e||void 0===e)&&b("267",e);var o=void 0,l=n({},e.props),u=e.key,c=e.ref,s=e._owner;if(null!=t){void 0!==t.ref&&(c=t.ref,s=w.current),void 0!==t.key&&(u=""+t.key);var f=void 0;for(o in e.type&&e.type.defaultProps&&(f=e.type.defaultProps),t)P.call(t,o)&&!k.hasOwnProperty(o)&&(l[o]=void 0===t[o]&&void 0!==f?f[o]:t[o])}if(1===(o=arguments.length-2))l.children=r;else if(1<o){f=Array(o);for(var a=0;a<o;a++)f[a]=arguments[a+2];l.children=f}return{$$typeof:i,type:e.type,key:u,ref:c,props:l,_owner:s}},createFactory:function(e){var t=$.bind(null,e);return t.type=e,t},isValidElement:I,version:"16.6.3",__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentOwner:w,assign:n}};q.unstable_ConcurrentMode=p,q.unstable_Profiler=s;var L={default:q},D=L&&q||L;e.exports=D.default||D},function(e,t,r){"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var n=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable;e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(t).map(function(e){return t[e]}).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach(function(e){n[e]=e}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(e){return!1}}()?Object.assign:function(e,t){for(var r,l,u=function(e){if(null===e||void 0===e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}(e),c=1;c<arguments.length;c++){for(var s in r=Object(arguments[c]))o.call(r,s)&&(u[s]=r[s]);if(n){l=n(r);for(var f=0;f<l.length;f++)i.call(r,l[f])&&(u[l[f]]=r[l[f]])}}return u}}])});