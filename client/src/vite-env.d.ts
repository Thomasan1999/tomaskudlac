/// <reference types="vite/client" />

interface ImportMetaEnv {
    /** GA4 measurement id, in the form `G-XXXXXXXXXX`. Analytics is skipped when it is not set. */
    readonly VITE_GA_TAG_ID?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
