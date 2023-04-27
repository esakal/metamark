import elixir from 'highlight.js/lib/languages/elixir';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import { remarkObsidianLink } from 'remark-obsidian-link';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import callouts from 'remark-callouts';
import rehypeExternalLinks from "rehype-external-links";
export const presetBuilder = ({ toLink }) => {
    return {
        preset: {
            plugins: [
                remarkParse,
                callouts,
                remarkGfm,
                [remarkObsidianLink, { toLink }],
                remarkRehype,
                [rehypeExternalLinks, { rel: ['nofollow'], target: '_blank' }],
                rehypeSlug,
                [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                [rehypeHighlight, { languages: { elixir } }],
                rehypeStringify,
            ],
        },
        presetManifest: {
            plugins: [
                'remark-parse',
                'remark-callouts',
                'remark-gfm',
                'remark-obsidian-link',
                'remark-rehype',
                'rehype-external-links',
                'rehype-slug',
                'rehype-autolink-headings',
                'rehype-highlight',
                'rehype-stringify'
            ]
        }
    };
};
