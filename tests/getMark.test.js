import assert from 'assert/strict'
import { describe, it } from 'node:test'
import { Metamark } from '../dist/index.js'

describe('Metamark.getMark', () => {
  it('works with defaults', () => {
    const pageAllowSet = new Set(['Wiki Link'])
    const actual = Metamark.getMark('./tests/Test File.md', pageAllowSet)

    assert.deepEqual(actual.page, 'Test File')
    assert.deepEqual(actual.slug, 'test-file')
    assert.deepEqual(actual.firstParagraphText, 'I am a markdown file!')
    assert.deepEqual(actual.frontmatter, {
      public: true,
      tags: ['markdown', 'yaml', 'html'],
    })
    assert.deepEqual(actual.toc, [
      { title: 'Hello', id: 'hello', depth: 1 },
      { title: 'More', id: 'more', depth: 2 },
    ])
    assert.match(
      actual.html,
      /<a href="\/content\/wiki-link" title="">Wiki Link<\/a>/g
    )
    assert.match(
      actual.text,
      /This is a Wiki Link./g
    )
  })
})
