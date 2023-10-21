import { getDataType } from './utils.js'

// h函数，创建虚拟dom
export function h(type, props, children) {
  // 1.校验传入type
  if (
    getDataType(type) !== 'string' ||
    (getDataType(type) === 'string' && type.trim() === '')
  )
    throw new Error(
      'The type argument passed to the h function must be of type string and cannot be null'
    )

  // 2.返回虚拟dom
  return {
    type,
    props,
    children
  }
}

// 挂载函数
export function mount(vNodes, container) {
  // 1.判断虚拟节点是否为数组类型，不是则赋值为数组
  if (!Array.isArray(vNodes)) vNodes = [vNodes]

  // 2.定义函数createElement，根据虚拟节点创建真实dom
  function createElement(vNode, pNode) {
    if (!vNode.type) return null

    const el = (vNode.el = document.createElement(vNode.type))

    if (vNode.props) {
      for (const key in vNode.props) {
        const value = vNode.props[key]
        if (key.startsWith('on')) {
          el.addEventListener(key.slice(2).toLowerCase(), value)
        } else {
          el.setAttribute(key, value)
        }
      }
    }

    if (vNode.children) {
      if (!Array.isArray(vNode.children)) {
        el.textContent = vNode.children
      } else {
        vNode.children.forEach((child) => {
          if (!Array.isArray(vNode.children)) {
            el.textContent = child
          } else if (typeof child === 'object') {
            createElement(child, el)
          }
        })
      }
    }

    if (pNode) {
      pNode.appendChild(el)
    } else {
      return el
    }
  }

  // 3.多个根节点mount处理
  const elements = []
  vNodes.forEach((vNode) => {
    elements.push(createElement(vNode))
  })

  // 4.将elements挂载到container上
  let containerType = getDataType(container)
  if (containerType.includes('element')) {
    container.append(...elements)
  } else if (containerType === 'string') {
    document.querySelector(container).append(...elements)
  } else {
    throw new Error('the container must be either a selector or a real dom')
  }
}

// 卸载函数
export function unmount(child) {
  // 1.判断节点是否存早
  if (!child.el) return

  // 2.获取父节点与当前节点
  let pNode = child.el.parentElement
  let sNode = child.el

  // 3.调用父节点的removeChild删除当前节点
  pNode.removeChild(sNode)
}

// patch函数，diff虚拟dom差异
export function patch(oldVnodes, newVnodes) {
  // 1.判断新旧虚拟节点是否为数组类型，不是则赋值为数组
  if (!Array.isArray(oldVnodes) && !Array.isArray(newVnodes)) {
    oldVnodes = [oldVnodes]
    newVnodes = [newVnodes]
  }

  // 2.定义函数patchVnode，diff新旧虚拟节点差异，进行更新(挂载，卸载)
  function patchVnode(n1, n2) {
    if (n1.type != n2.type) {
      // toUpDate vNode
      const n1ElParent = n1.el.parentElement
      n1ElParent.removeChild(n1.el)
      mount(n2, n1ElParent)
    } else {
      // 1.取出el对象并在n2中保存
      const el = (n2.el = n1.el)

      // 2.处理props
      const oldParops = n1.props || {}
      const newParops = n2.props || {}
      //  2.1获取所有newPrpps添加到el
      for (const key in newParops) {
        const oldValue = oldParops[key]
        const newValue = newParops[key]
        if (newValue !== oldValue) {
          if (key.startsWith('on')) {
            //对事件监听的判断
            el.addEventListener(key.slice(2).toLowerCase(), newValue)
          } else {
            el.setAttribute(key, newValue)
          }
        }
      }
      //  2.2处理旧的props
      for (const key in oldParops) {
        if (!(key in newParops)) {
          const value = oldParops[key]
          if (key.startsWith('on')) {
            //对事件监听的判断
            el.removeEventListener(key.slice(2).toLowerCase(), value)
          } else {
            el.removeAttribute(key)
          }
        }
      }

      // 3.处理children
      const oldChildren = n1.children || []
      const newChildren = n2.children || []
      if (typeof newChildren === 'string') {
        //情况一：newChildren本身是 String
        // 边界情况 (edge case)
        if (typeof oldChildren === 'string') {
          if (newChildren !== oldChildren) {
            el.textContent = newChildren
          }
        } else {
          el.innerHTML = newChildren
        }
      } else {
        //情况一：newChildren本身是 Array
        if (typeof oldChildren === 'string') {
          el.innerHTML = ''
          newChildren.forEach((item) => {
            mount(item, el)
          })
        } else {
          // oldChildren:[ v1, v2, v3 ]
          // newChildren:[ v1, v2, v3, v4, v5 ]
          // 1.前面有相同节点的原生做patch
          const commonLength = Math.min(oldChildren.length, newChildren.length)
          for (let i = 0; i < commonLength; i++) {
            patch(oldChildren[i], newChildren[i])
          }

          // 2. newChildren > oldChildren
          if (newChildren.length > oldChildren.length) {
            newChildren.slice(oldChildren.length).forEach((item) => {
              mount(item, el)
            })
          }

          // 3. newChildren < oldChildren
          if (newChildren.length < oldChildren.length) {
            oldChildren.slice(newChildren.length).forEach((item) => {
              unmount(item)
            })
          }
        }
      }
    }
  }

  // 3.多个根节点diff处理
  let patchLength = (oldVnodes.length = newVnodes.length)
  for (let i = 0; i < patchLength; i++) {
    patchVnode(oldVnodes[i], newVnodes[i])
  }
}
