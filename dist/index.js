import { readFileSync } from 'fs';
import matter from 'gray-matter';
import { toString } from 'mdast-util-to-string';
import path from 'path';
import remarkGfm from 'remark-gfm';
import { remarkObsidianLink } from 'remark-obsidian-link';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { getSlug } from './getSlug.js';
import { getTocData } from './getTocData.js';
import { preset, presetBuilder } from './presets.js';
import { toLinkBuilder } from './toLinkBuilder.js';
function getFrontmatter(rawMd) {
    const { data: frontmatter } = matter(rawMd);
    return frontmatter;
}
function getFirstParagraphText(md) {
    const mdast = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkObsidianLink)
        .parse(md);
    const firstParagraph = mdast.children.find((child) => child.type === 'paragraph');
    return toString(firstParagraph);
}
function toText(md) {
    const mdast = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkObsidianLink)
        .parse(md);
    return toString(mdast);
}
function toHtml(md, preset) {
    return unified().use(preset).processSync(md).toString();
}
function getPage(filePath) {
    const { name: page } = path.parse(filePath);
    return page;
}
function getRawMd(filePath) {
    return readFileSync(filePath, 'utf8');
}
function getMdNoFrontmatter(rawMd) {
    const { content: md } = matter(rawMd);
    return md;
}
function getMark(filePath, pageAllowSet) {
    const rawMd = getRawMd(filePath);
    const page = getPage(filePath);
    const md = getMdNoFrontmatter(rawMd);
    const preset = presetBuilder({ toLink: toLinkBuilder(pageAllowSet) });
    const html = toHtml(md, preset);
    return {
        page,
        slug: getSlug(page),
        toc: getTocData(html),
        firstParagraphText: getFirstParagraphText(md),
        frontmatter: getFrontmatter(rawMd),
        html,
        text: toText(md),
    };
}
function getMarks(filePathList, pageAllowSet) {
    const marks = [];
    for (const filePath of filePathList) {
        const page = getPage(filePath);
        if (pageAllowSet.has(page)) {
            marks.push(getMark(filePath, pageAllowSet));
        }
    }
    return marks;
}
export const Metamark = {
    getFirstParagraphText,
    getFrontmatter,
    getMark,
    getMarks,
    getMdNoFrontmatter,
    getRawMd,
    getSlug,
    getPage,
    getTocData,
    preset,
    presetBuilder,
    toHtml,
    toText,
};
