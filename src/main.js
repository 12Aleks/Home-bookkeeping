import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import './registerServiceWorker';
import Loader from './components/app/Loader.vue'
import router from './router';
import store from './store';
import messagePlugin from './utils/message.plugin';
import dateFilter from '@/filter/date.filter';
import dir from './mytest/test'
import 'materialize-css/dist/js/materialize';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


Vue.config.productionTip = false
Vue.use(messagePlugin)
Vue.directive('colored', dir)
Vue.use(Vuelidate)
Vue.filter('dateFilter', dateFilter);
Vue.component('Loader', Loader)

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