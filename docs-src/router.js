import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/Home';
import Install from './components/Install';
import Options from './components/Options';
import Events from './components/Events';
import Examples from './components/Examples';

Vue.use(VueRouter);

const routes = [{
    path: '*',
    redirect: '/home'
}, {
    path: '/',
    redirect: '/home'
}, {
    name: 'Home',
    path: '/home',
    component: Home
}, {
    name: 'Install',
    path: '/install',
    iframeComponent: Install
}, {
    name: 'Options',
    path: '/options',
    component: Options
}, {
    name: 'Events',
    path: '/events',
    component: Events
}, {
    name: 'Examples',
    path: '/examples',
    iframeComponent: Examples
}];

export default new VueRouter({
    // base: '/vue-friendly-iframe/',
    // base: '/',
    routes,
    scrollBehavior(to) {
        if (to.name === 'Home') {
            return {
                x: 0,
                y: 0
            };
        }

        return {
            x: 0,
            y: 550
        };
    }
});