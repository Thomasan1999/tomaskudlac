import { configure as configureVueGtag } from 'vue-gtag';
import { createPinia } from 'pinia';

import './register-service-worker';
import router from '@/router';
import app from '@/app';
import './app.css';

/**
 * Skipped when the id is unset, so development, CI and tests never report to Google Analytics. The previous id was
 * a Universal Analytics one, which stopped collecting in 2023; vue-gtag 3 expects a GA4 `G-` measurement id.
 */
const gaTagId = import.meta.env.VITE_GA_TAG_ID;

if (gaTagId && import.meta.env.PROD) {
    configureVueGtag({ tagId: gaTagId });
}

app.use(createPinia());
app.use(router);

app.mount('#app');
