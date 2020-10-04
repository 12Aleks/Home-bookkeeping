import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import Paginate from 'vuejs-paginate'
import './registerServiceWorker';
import Loader from './components/app/Loader.vue'
import router from './router';
import store from './store';
import messagePlugin from './utils/message.plugin';
import titlePlugin from './utils/title.plugin';
import VueMeta from 'vue-meta'

import dateFilter from '@/filter/date.filter';
import currencyFilter from './filter/currency.filter';
import localizeFilter from './filter/localize.filter';

import 'materialize-css/dist/js/materialize';

import  tooltipDirective from './derectives/tooltip.directive'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


Vue.config.productionTip = false
Vue.use(VueMeta)
Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.use(Vuelidate)

Vue.directive('tooltipe', tooltipDirective)



Vue.filter('dateFilter', dateFilter);
Vue.filter('currencyFilter', currencyFilter);
Vue.filter('localizeFilter', localizeFilter);

Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)


firebase.initializeApp({
    apiKey: "AIzaSyCXEpNHiJTVJZdMTSeRCfOVeoYY3z2uJhU",
    authDomain: "bookkeeping-51320.firebaseapp.com",
    databaseURL: "https://bookkeeping-51320.firebaseio.com",
    projectId: "bookkeeping-51320",
    storageBucket: "bookkeeping-51320.appspot.com",
    messagingSenderId: "608253539543",
    appId: "1:608253539543:web:12edad3c4ae1b7bb7fec92",
    measurementId: "G-KSNWB037D9"
});

let app;

firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        app = new Vue({
            router,
            store,
            render: h => h(App)
        }).$mount('#app')
    }
});
