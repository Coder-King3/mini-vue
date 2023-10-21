import { h, reactive, ref } from '&/build/mini-vue-lib'
import './style.less'

const Count = () => {
  const count = ref(0)
  const title = reactive({
    str: 'Count'
  })

  const increase = () => {
    count.value++
  }
  const reduction = () => {
    count.value--
  }

  return {
    render() {
      return [
        h('button', { class: 'count-btn', onClick: reduction }, '-'),
        h(
          'button',
          {
            class: 'count-btn'
          },
          `${title.str}: ${count.value}`
        ),
        h('button', { class: 'count-btn', onClick: increase }, '+')
      ]
    }
  }
}

export default Count
