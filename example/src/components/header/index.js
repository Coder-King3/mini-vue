import { h, reactive, ref } from '&/build/mini-vue-lib'
import './style.less'
import { getAssetsUrl } from '@/utils'

const Header = () => {
  return {
    render() {
      return h('div', { class: 'header' }, [
        h(
          'div',
          {
            src: getAssetsUrl('logo'),
            class: 'header-logo'
          },
          [
            h('div', {
              class: 'header-logo_bg'
            }),
            h('img', {
              src: getAssetsUrl('logo'),
              class: 'header-logo_img'
            })
          ]
        )
      ])
    }
  }
}

export default Header
