import { configure as configureVueGtag } from 'vue-gtag';
import { createPinia } from 'pinia';

import './register-service-worker';
import router from '@/router';
import app from '@/app';
import './app.css';

configureVueGtag({
    tagId: 'UA-96781792-2',
});

app.use(createPinia());
app.use(router);

app.mount('#app');
