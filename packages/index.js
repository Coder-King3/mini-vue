import { h, mount, patch } from './render.js'
import { watchEffect, reactive, ref } from './reactive.js'
import { getDataType } from './utils.js'

function createApp(rootComponent) {
  // 1.判断rootComponent类型
  if (getDataType(rootComponent) !== 'function')
    throw new Error(
      'rootComponent must be a function and return an object containing a render function'
    )

  // 2.创建一次组件实例
  const template = rootComponent()

  // 3.返回app实例对象
  return {
    mount(container) {
      // 3.1只挂载一次，其余diff比较算法
      let isMounted = false
      let oldVnode = null

      // 3.1将虚拟dom副作用进行跟踪
      watchEffect(function () {
        if (!isMounted) {
          oldVnode = template.render()
          mount(oldVnode, container)
          isMounted = true
        } else {
          const newValue = template.render()
          patch(oldVnode, newValue)
          oldVnode = newValue
        }
      })
    }
  }
}

export { h, reactive, createApp, ref }
