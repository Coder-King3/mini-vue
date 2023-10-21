export function getDataType(target) {
  // 1.判断数据类型
  let type = typeof target

  // 2.为对象类型则进行深度判断
  if (type === 'object')
    type = Object.prototype.toString.call(target).slice(8, -1).toLowerCase()

  // 3.返回数据类型
  return type
}
