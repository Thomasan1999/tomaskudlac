import MainSectionObject from '@/components/main/MainSectionObject';

export interface NavbarIconProps {
    mode: 'bars' | 'cross';
}

export interface NavbarLinkProps {
    active?: boolean;
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
