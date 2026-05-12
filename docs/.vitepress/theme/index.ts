import DefaultTheme from 'vitepress/theme'
import './custom.css'
import Quiz from './components/Quiz.vue'
import PromptCompare from './components/PromptCompare.vue'
import ThinkBox from './components/ThinkBox.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Quiz', Quiz)
    app.component('PromptCompare', PromptCompare)
    app.component('ThinkBox', ThinkBox)
  }
}
