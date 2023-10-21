import { h, reactive, ref } from '&/build/mini-vue-lib'
import './style.less'
import Count from '../count'

const Content = () => {
  const CountComponent = Count()

  return {
    render() {
      return h('div', { class: 'content' }, CountComponent.render())
    }
  }
}

export default Content
