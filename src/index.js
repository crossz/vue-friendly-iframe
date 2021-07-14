import FriendlyIframe from './components/VueFriendlyIframe';
import RouterViewIframe from './components/VueRouterViewIframe';

// expose component and service to global scope
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use({
        install(NewVue) {
            NewVue.component('vue-friendly-iframe', FriendlyIframe);
        }
    });
}
let VueFriendlyIframe = {
    install: function(NewVue, options) {
        NewVue.component('vue-friendly-iframe', FriendlyIframe);
    },
}

// expose component and service to global scope
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use({
        install(NewVue) {
            NewVue.component('iframe-router-view', RouterViewIframe);
        }
    });
}
let VueRouterViewIframe = {
    install: function(NewVue, options) {
        NewVue.component('iframe-router-view', RouterViewIframe);
    }
}

export default {
    // install: function(NewVue, options) {
    //     NewVue.component('vue-friendly-iframe', VueFriendlyIframe);
    //     NewVue.component('iframe-router-view', IframeRouterView);
    // },
    VueFriendlyIframe,
    VueRouterViewIframe
};