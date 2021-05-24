import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import FileUploader from 'vuetify-file-uploader'

Vue.config.productionTip = false

Vue.use(FileUploader)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
