import { ToastType } from '@/store/types';

export interface MainSectionProps {
    heading?: boolean;
    name: string;
}

export interface ToastProps {
    message: string;
    type: ToastType;
}
