import { ToastType } from '@/store/types';
import { MainSectionName } from '@/locales/types';

export interface MainSectionProps {
    heading?: boolean;
    name: MainSectionName;
}

export interface ToastProps {
    message: string;
    type: ToastType;
}
