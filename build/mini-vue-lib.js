function g(e) {
  let t = typeof e;
  return t === "object" && (t = Object.prototype.toString.call(e).slice(8, -1).toLowerCase()), t;
}
function v(e, t, r) {
  if (g(e) !== "string" || g(e) === "string" && e.trim() === "")
    throw new Error(
      "The type argument passed to the h function must be of type string and cannot be null"
    );
  return {
    type: e,
    props: t,
    children: r
  };
}
function h(e, t) {
  Array.isArray(e) || (e = [e]);
  function r(n, o) {
    if (!n.type)
      return null;
    const u = n.el = document.createElement(n.type);
    if (n.props)
      for (const c in n.props) {
        const f = n.props[c];
        c.startsWith("on") ? u.addEventListener(c.slice(2).toLowerCase(), f) : u.setAttribute(c, f);
      }
    if (n.children && (Array.isArray(n.children) ? n.children.forEach((c) => {
      Array.isArray(n.children) ? typeof c == "object" && r(c, u) : u.textContent = c;
    }) : u.textContent = n.children), o)
      o.appendChild(u);
    else
      return u;
  }
  const l = [];
  e.forEach((n) => {
    l.push(r(n));
  });
  let i = g(t);
  if (i.includes("element"))
    t.append(...l);
  else if (i === "string")
    document.querySelector(t).append(...l);
  else
    throw new Error("the container must be either a selector or a real dom");
}
function A(e) {
  if (!e.el)
    return;
  let t = e.el.parentElement, r = e.el;
  t.removeChild(r);
}
function w(e, t) {
  !Array.isArray(e) && !Array.isArray(t) && (e = [e], t = [t]);
  function r(i, n) {
    if (i.type != n.type) {
      const o = i.el.parentElement;
      o.removeChild(i.el), h(n, o);
    } else {
      const o = n.el = i.el, u = i.props || {}, c = n.props || {};
      for (const s in c) {
        const a = u[s], y = c[s];
        y !== a && (s.startsWith("on") ? o.addEventListener(s.slice(2).toLowerCase(), y) : o.setAttribute(s, y));
      }
      for (const s in u)
        if (!(s in c)) {
          const a = u[s];
          s.startsWith("on") ? o.removeEventListener(s.slice(2).toLowerCase(), a) : o.removeAttribute(s);
        }
      const f = i.children || [], p = n.children || [];
      if (typeof p == "string")
        typeof f == "string" ? p !== f && (o.textContent = p) : o.innerHTML = p;
      else if (typeof f == "string")
        o.innerHTML = "", p.forEach((s) => {
          h(s, o);
        });
      else {
        const s = Math.min(f.length, p.length);
        for (let a = 0; a < s; a++)
          w(f[a], p[a]);
        p.length > f.length && p.slice(f.length).forEach((a) => {
          h(a, o);
        }), p.length < f.length && f.slice(p.length).forEach((a) => {
          A(a);
        });
      }
    }
  }
  let l = e.length = t.length;
  for (let i = 0; i < l; i++)
    r(e[i], t[i]);
}
class C {
  constructor() {
    this.reactiveEffect = /* @__PURE__ */ new Set();
  }
  depend() {
    m && this.reactiveEffect.add(m);
  }
  notify() {
    this.reactiveEffect.forEach((t) => {
      t();
    });
  }
}
class b {
  constructor(t) {
    this._value = t;
  }
  get value() {
    return this._value;
  }
  set value(t) {
    this._value = t;
  }
}
let m = null;
function L(e) {
  m = e, e(), m = null;
}
const E = /* @__PURE__ */ new WeakMap();
function d(e, t) {
  let r = E.get(e);
  r || (r = /* @__PURE__ */ new Map(), E.set(e, r));
  let l = r.get(t);
  return l || (l = new C(), r.set(t, l)), l;
}
function M(e) {
  return new Proxy(e, {
    get: function(t, r, l) {
      return d(t, r).depend(), Reflect.get(t, r, l);
    },
    set: function(t, r, l, i) {
      let n = !!Reflect.set(t, r, l, i);
      return d(t, r).notify(), n;
    }
  });
}
function x(e) {
  return M(new b(e));
}
function T(e) {
  if (g(e) !== "function")
    throw new Error(
      "rootComponent must be a function and return an object containing a render function"
    );
  const t = e();
  return {
    mount(r) {
      let l = !1, i = null;
      L(function() {
        if (!l)
          i = t.render(), h(i, r), l = !0;
        else {
          const n = t.render();
          w(i, n), i = n;
        }
      });
    }
  };
}
export {
  T as createApp,
  v as h,
  M as reactive,
  x as ref
};
