/** @description Type of a social network link located in the header. */
export type SocialNetwork = {
    /** @description The HTML href attribute of the link. */
    href: string,
    /** @description An array of 2 strings which determine what Font Awesome icon is used to create the link icon. */
    icon: [string, string],
    /** @description The HTML title attribute of the link. */
    title: string
};
