import { createApp } from '&/build/mini-vue-lib'
import './src/assets/styles/index.less'
import App from './src/app'

const app = createApp(App)
app.mount('#root')
