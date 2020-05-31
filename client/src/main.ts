import Vue                                    from 'vue';
import './registerServiceWorker';
// @ts-ignore
import VueAnalytics                           from 'vue-analytics';
import {library}                              from '@fortawesome/fontawesome-svg-core';
import {faEnvelope, faTimes}                  from '@fortawesome/free-solid-svg-icons';
import {faFacebookF, faTwitter, faLinkedinIn} from '@fortawesome/free-brands-svg-icons';
import {faSmile}                              from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon}                      from '@fortawesome/vue-fontawesome';
import smoothscroll                           from 'smoothscroll-polyfill';
import App                                    from '@/App.vue';
import router                                 from '@/router';
import store                                  from '@/store';
import mainMixin                              from '@/mixins/Main';
import VueHttp                                from '@/plugins/VueHttpPlugin';
import Rand                                   from '@/plugins/RandPlugin';
import Tomwork                                from '@/plugins/TomworkPlugin';
import dayjs                                  from '@/plugins/dayjsPlugin';
import VueString                              from '@/plugins/VueStringPlugin';
import Range                                  from '@/plugins/NumericRangePlugin';

require(`./polyfills`);

smoothscroll.polyfill();

Vue.use(VueHttp);
Vue.use(dayjs);
Vue.use(Rand);
Vue.use(Tomwork);
Vue.use(VueString);
Vue.use(Range);

library.add(faFacebookF, faTwitter, faLinkedinIn, faEnvelope, faSmile, faTimes);

Vue.component(`font-awesome-icon`, FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.mixin(mainMixin);

Vue.use(VueAnalytics, {
    id: `UA-96781792-2`,
    router
});

new Vue({
    router,
    store,
    render: (h) =>
    {
        return h(App);
    }
}).$mount(`#app`);
