import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useKakao } from 'vue3-kakao-maps';

import App from './App.vue'
import router from './router'

useKakao('ecb1ae075791abaebb41a00a8c1ac33e', ['clusterer'])
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
