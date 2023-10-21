// depend观察类
class Dep {
  constructor() {
    this.reactiveEffect = new Set()
  }

  depend() {
    if (activeEffect) {
      this.reactiveEffect.add(activeEffect)
    }
  }

  notify() {
    this.reactiveEffect.forEach((effect) => {
      effect()
    })
  }
}

// ref包装类
class Ref {
  constructor(val) {
    this._value = val
  }
  get value() {
    return this._value
  }
  set value(newVal) {
    this._value = newVal
  }
}

// 观察者方法，专门执行响应式函数
let activeEffect = null
export function watchEffect(effect) {
  activeEffect = effect
  effect()
  activeEffect = null
}

// 响应式依赖收集，负责通过obj的key获取对应的depend观察类
const targetMap = new WeakMap()
export function getDep(target, key) {
  // 1.根据对象target, 取出对应的Map对象
  let map = targetMap.get(target)
  if (!map) {
    map = new Map()
    targetMap.set(target, map)
  }

  // 2.根据key, 找到对应的dep对象
  let dep = map.get(key)
  if (!dep) {
    dep = new Dep()
    map.set(key, dep)
  }
  return dep
}

// reactive函数，自动收集信息依赖
export function reactive(raw) {
  return new Proxy(raw, {
    get: function (target, key, receiver) {
      // 1.获取depend观察类，并将当前activeEffect跟踪
      const dep = getDep(target, key)
      dep.depend()

      // 2.返回get value
      return Reflect.get(target, key, receiver)
    },
    set: function (target, key, newValue, receiver) {
      // 1.修改target[key]的值
      let status = Reflect.set(target, key, newValue, receiver) ? true : false

      // 2.更具key更新对应的effect
      const dep = getDep(target, key)
      dep.notify()

      // 3.返回修噶是否成功
      return status
    }
  })
}

// ref函数，响应基本类型
export function ref(value) {
  return reactive(new Ref(value))
}
