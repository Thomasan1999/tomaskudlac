declare global
{
    type ProjectPart = 'design' | 'frontEnd' | 'backEnd';
    type Project = Merge<{
        [s in ProjectPart]?: string;
    }, {href: string, title: string}>;
}

export {};
