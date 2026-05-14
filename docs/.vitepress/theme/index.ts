import DefaultTheme from 'vitepress/theme'
import './custom.css'
import Quiz from './components/Quiz.vue'
import PromptCompare from './components/PromptCompare.vue'
import ThinkBox from './components/ThinkBox.vue'
import CustomLayout from './components/CustomLayout.vue'

export default {
  extends: DefaultTheme,
  Layout: CustomLayout,
  enhanceApp({ app }) {
    app.component('Quiz', Quiz)
    app.component('PromptCompare', PromptCompare)
    app.component('ThinkBox', ThinkBox)
  }
}
