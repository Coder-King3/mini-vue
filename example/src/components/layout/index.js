import { h } from '&/build/mini-vue-lib'
import './style.less'
const Layout = () => {
  return {
    render({ slot }) {
      return h('div', { class: 'layout' }, [
        slot.header.render(),
        slot.content.render()
      ])
    }
  }
}

export default Layout
