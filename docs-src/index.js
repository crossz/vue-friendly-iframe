import Vue from 'vue';
import { VueFriendlyIframe, VueRouterViewIframe } from '../src/index';

import App from './components/App';
import Sidebar from './components/Sidebar';
import router from './router';

Vue.use(VueFriendlyIframe);
Vue.use(VueRouterViewIframe);

Vue.component('sidebar', Sidebar);

new Vue({
        template: '<App></App>',
        router,
        components: {
            App
        }
    })
    .$mount('#app');