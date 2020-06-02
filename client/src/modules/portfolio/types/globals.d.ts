declare global
{
    /** @description Types of project parts. */
    type ProjectPart = 'design' | 'frontEnd' | 'backEnd';
    /** @description Type containing all data related to a referral project which I've contributed to. */
    type Project = {
        /** @description The text describing mine back-end contributions to the project. */
        backEnd?: string,
        /** @description The text describing mine design contributions to the project. */
        design?: string,
        /** @description The text describing mine front-end contributions to the project. */
        frontEnd?: string,
        /** @description The href attribute of the project which points to the referred website. */
        href: string,
        /** @description The name of the project. */
        title: string
    };
}

export {};
