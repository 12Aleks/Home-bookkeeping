import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import 'materialize-css/dist/js/materialize';
import dateFilter from '@/filter/date.filter';


Vue.config.productionTip = false
Vue.filter('dateFilter', dateFilter);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
