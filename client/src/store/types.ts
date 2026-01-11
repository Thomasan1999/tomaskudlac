export enum ImageFormat {
    JPG = 'jpg',
    WEBP = 'webp',
}

export enum InitializingState {
    NOT_INITIALIZED,
    INITIALIZING,
    INITIALIZED,
}

export enum SiteLanguage {
    CZ = 'cz',
    EN = 'en',
    SK = 'sk',
}

export enum ToastType {
    FAIL = 'fail',
    SUCCESS = 'success',
}

export interface ToastData {
    message: string;
    type: ToastType;
}
