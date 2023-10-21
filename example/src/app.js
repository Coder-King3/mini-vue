import Layout from './components/layout'
import Header from './components/header'
import Content from './components/content'

const App = () => {
  const LayoutComponent = Layout()
  const HeaderComponent = Header()
  const ContentComponent = Content()
  return {
    render() {
      return [
        LayoutComponent.render({
          slot: { header: HeaderComponent, content: ContentComponent }
        })
      ]
    }
  }
}

export default App
