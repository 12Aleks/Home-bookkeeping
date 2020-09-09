import Vue from 'vue';
import Vuelidate from 'vuelidate'
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import messagePlugin from './utils/message.plugin'
import dateFilter from '@/filter/date.filter';
import dir from './mytest/test'
import 'materialize-css/dist/js/materialize';


Vue.config.productionTip = false
Vue.use(messagePlugin)
Vue.directive('colored', dir)
Vue.use(Vuelidate)
Vue.filter('dateFilter', dateFilter);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')