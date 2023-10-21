(function(h,d){typeof exports=="object"&&typeof module<"u"?d(exports):typeof define=="function"&&define.amd?define(["exports"],d):(h=typeof globalThis<"u"?globalThis:h||self,d(h.MiniVueLib={}))})(this,function(h){"use strict";function d(e){let t=typeof e;return t==="object"&&(t=Object.prototype.toString.call(e).slice(8,-1).toLowerCase()),t}function C(e,t,r){if(d(e)!=="string"||d(e)==="string"&&e.trim()==="")throw new Error("The type argument passed to the h function must be of type string and cannot be null");return{type:e,props:t,children:r}}function y(e,t){Array.isArray(e)||(e=[e]);function r(n,l){if(!n.type)return null;const u=n.el=document.createElement(n.type);if(n.props)for(const c in n.props){const f=n.props[c];c.startsWith("on")?u.addEventListener(c.slice(2).toLowerCase(),f):u.setAttribute(c,f)}if(n.children&&(Array.isArray(n.children)?n.children.forEach(c=>{Array.isArray(n.children)?typeof c=="object"&&r(c,u):u.textContent=c}):u.textContent=n.children),l)l.appendChild(u);else return u}const o=[];e.forEach(n=>{o.push(r(n))});let i=d(t);if(i.includes("element"))t.append(...o);else if(i==="string")document.querySelector(t).append(...o);else throw new Error("the container must be either a selector or a real dom")}function L(e){if(!e.el)return;let t=e.el.parentElement,r=e.el;t.removeChild(r)}function E(e,t){!Array.isArray(e)&&!Array.isArray(t)&&(e=[e],t=[t]);function r(i,n){if(i.type!=n.type){const l=i.el.parentElement;l.removeChild(i.el),y(n,l)}else{const l=n.el=i.el,u=i.props||{},c=n.props||{};for(const s in c){const a=u[s],g=c[s];g!==a&&(s.startsWith("on")?l.addEventListener(s.slice(2).toLowerCase(),g):l.setAttribute(s,g))}for(const s in u)if(!(s in c)){const a=u[s];s.startsWith("on")?l.removeEventListener(s.slice(2).toLowerCase(),a):l.removeAttribute(s)}const f=i.children||[],p=n.children||[];if(typeof p=="string")typeof f=="string"?p!==f&&(l.textContent=p):l.innerHTML=p;else if(typeof f=="string")l.innerHTML="",p.forEach(s=>{y(s,l)});else{const s=Math.min(f.length,p.length);for(let a=0;a<s;a++)E(f[a],p[a]);p.length>f.length&&p.slice(f.length).forEach(a=>{y(a,l)}),p.length<f.length&&f.slice(p.length).forEach(a=>{L(a)})}}}let o=e.length=t.length;for(let i=0;i<o;i++)r(e[i],t[i])}class M{constructor(){this.reactiveEffect=new Set}depend(){m&&this.reactiveEffect.add(m)}notify(){this.reactiveEffect.forEach(t=>{t()})}}class v{constructor(t){this._value=t}get value(){return this._value}set value(t){this._value=t}}let m=null;function T(e){m=e,e(),m=null}const w=new WeakMap;function b(e,t){let r=w.get(e);r||(r=new Map,w.set(e,r));let o=r.get(t);return o||(o=new M,r.set(t,o)),o}function A(e){return new Proxy(e,{get:function(t,r,o){return b(t,r).depend(),Reflect.get(t,r,o)},set:function(t,r,o,i){let n=!!Reflect.set(t,r,o,i);return b(t,r).notify(),n}})}function j(e){return A(new v(e))}function P(e){if(d(e)!=="function")throw new Error("rootComponent must be a function and return an object containing a render function");const t=e();return{mount(r){let o=!1,i=null;T(function(){if(!o)i=t.render(),y(i,r),o=!0;else{const n=t.render();E(i,n),i=n}})}}}h.createApp=P,h.h=C,h.reactive=A,h.ref=j,Object.defineProperty(h,Symbol.toStringTag,{value:"Module"})});
