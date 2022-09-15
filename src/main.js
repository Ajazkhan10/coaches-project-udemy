import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import baseCard from './ui/baseCard.vue'
import baseButton from './ui/baseButton.vue'
import baseBadge from './ui/baseBadge.vue'
import BaseSpinner from './ui/BaseSpinner.vue'
import BaseDialog from './ui/BaseDialog.vue'
// import RequestItems from './components/requests/RequestItems.vue'

const app=createApp(App)
app.use(store)
app.use(router)
app.mount('#app')

app.component('base-card',baseCard)
app.component('base-button',baseButton)
app.component('base-badge',baseBadge)
app.component('base-spinner',BaseSpinner)
app.component('base-dialog',BaseDialog)
// app.component('request-items',RequestItems)
