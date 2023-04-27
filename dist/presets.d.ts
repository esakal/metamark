import { Preset } from 'unified';
export declare const presetBuilder: ({ toLink }: {
    toLink: any;
}) => {
    preset: Preset;
    presetManifest: {
        plugins: string[];
    };
};
