import '@/polyfills';
import app from '@/app';

import VueGtag from 'vue-gtag';
import router from '@/router';

import './register-service-worker';

app.use(VueGtag, {
    config: {id: 'UA-96781792-2'}
});

app.use(router);

app.mount('#app');
