import Vue                                   from 'vue';
import './registerServiceWorker';
// @ts-ignore
import VueAnalytics                          from 'vue-analytics';
import {library}                             from '@fortawesome/fontawesome-svg-core';
import {faEnvelope, faTimes}                 from '@fortawesome/free-solid-svg-icons';
import {faFacebookF, faLinkedinIn, faGithub} from '@fortawesome/free-brands-svg-icons';
import {faSmile}                             from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon}                     from '@fortawesome/vue-fontawesome';
import smoothscroll                          from 'smoothscroll-polyfill';
import App                                   from '@/App.vue';
import router                                from '@/router';
import store                                 from '@/store';
import mainMixin                             from '@/mixins/Main';
import VueHttp                               from '@/plugins/VueHttpPlugin';
import Rand                                  from '@/plugins/RandPlugin';
import Tomwork                               from '@/plugins/TomworkPlugin';
import dayjs                                 from '@/plugins/dayjsPlugin';
import VueString                             from '@/plugins/VueStringPlugin';
import Range                                 from '@/plugins/NumericRangePlugin';

/** @description Adds scroll-behavior: smooth to browsers which do not support it natively. */
smoothscroll.polyfill();

/** @description Initializes the plugins. */
Vue.use(VueHttp);
Vue.use(dayjs);
Vue.use(Rand);
Vue.use(Tomwork);
Vue.use(VueString);
Vue.use(Range);

/** @description Adds the Font Awesome icons. */
library.add(faFacebookF, faGithub, faLinkedinIn, faEnvelope, faSmile, faTimes);

/** @description Creates the  font-awesome-icon component. */
Vue.component(`font-awesome-icon`, FontAwesomeIcon);

/** @description Prevents the production tip on Vue startup. */
Vue.config.productionTip = false;

/** @description Initializes the global mixin. */
Vue.mixin(mainMixin);

/** @description Initializes Google Analytics. */
Vue.use(VueAnalytics, {
    id: `UA-96781792-2`,
    router
});

/** @description Mounts the Vue application. */
new Vue({
    router,
    store,
    render: (h) =>
    {
        return h(App);
    }
}).$mount(`#app`);
