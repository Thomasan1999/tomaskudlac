import VueGtag from 'vue-gtag';
import {createPinia} from 'pinia';

import './register-service-worker';
import router from '@/router';
import app from '@/app';

app.use(VueGtag, {
    config: {id: 'UA-96781792-2'}
});

app.use(createPinia());
app.use(router);

app.mount('#app');
