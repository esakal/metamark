import { Preset } from 'unified';
import { getSlug } from './getSlug.js';
import { getTocData, MetamarkTocItem } from './getTocData.js';
import { GetPageUriBuilder } from './toLinkBuilder.js';
declare function getFrontmatter(rawMd: string): {
    [key: string]: any;
};
declare function getFirstParagraphText(md: string): string;
declare function toText(md: string): string;
declare function toHtml(md: string, preset: Preset): string;
declare function getPage(filePath: string): string;
declare function getRawMd(filePath: string): string;
declare function getMdNoFrontmatter(rawMd: string): string;
export interface GetMarksOptions {
    getPageUriBuilder?: GetPageUriBuilder;
    modifyPreset?: (preset: Preset, presetManifest: {
        plugins: string[];
    }) => Preset;
}
export interface Mark {
    page: string;
    slug: string;
    toc: MetamarkTocItem[];
    firstParagraphText: string;
    frontmatter: {
        [key: string]: any;
    };
    html: string;
    text: string;
}
declare function getMark(filePath: string, pageAllowSet: Set<string>, options?: GetMarksOptions): Mark;
declare function getMarks(filePathList: string[], pageAllowSet: Set<string>, options?: GetMarksOptions): Mark[];
export declare const Metamark: {
    getFirstParagraphText: typeof getFirstParagraphText;
    getFrontmatter: typeof getFrontmatter;
    getMark: typeof getMark;
    getMarks: typeof getMarks;
    getMdNoFrontmatter: typeof getMdNoFrontmatter;
    getRawMd: typeof getRawMd;
    getSlug: typeof getSlug;
    getPage: typeof getPage;
    getTocData: typeof getTocData;
    presetBuilder: ({ toLink }: {
        toLink: any;
    }) => {
        preset: Preset;
        presetManifest: {
            plugins: string[];
        };
    };
    toHtml: typeof toHtml;
    toText: typeof toText;
};
export {};
