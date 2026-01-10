import MainSectionObject from '@/components/main/MainSectionObject';
import { FontWeight } from '@/types/components';

export enum NavbarIconMode {
    BARS = 'bars',
    CROSS = 'cross',
}

export interface NavbarIconProps {
    mode: NavbarIconMode;
}

export interface NavbarIconLineProps {
    mode: NavbarIconMode;
}

export interface NavbarLinkProps {
    active?: boolean;
    fontWeight?: FontWeight;
    replace?: boolean;
    routerLink?: boolean;
    text?: string;
    title: string;
    to: string;
}

export interface NavbarProps {
    activeSection: string;
    sections: [string, MainSectionObject][];
}

export interface NavbarSocialNetworkProps {
    icon: [string, string];
    title: string;
    to: string;
}
