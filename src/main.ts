import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/main.scss'
import Tres from '@tresjs/core'

const app = createApp(App)

app.use(Tres).mount('#app')
