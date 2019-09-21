/*---------------------------------------------------------------------------*/
/* Copyright (c) ORDBOK contributors. All rights reserved.                   */
/* Licensed under the MIT License. See the LICENSE file in the project root. */
/*---------------------------------------------------------------------------*/

import
{
    deepStrictEqual,
    strictEqual
}
from 'assert';
import
{
    IMarkdownPage
}
from '@ordbok/core/dist';

/* *
 *
 *  Functions
 *
 * */

/**
 * Tests the structure of a Markdown page.
 *
 * @param markdownPage
 *        Markdown page to test
 */
export function test (markdownPage: IMarkdownPage): void
{
    testCategories(markdownPage);
    testSections(markdownPage);
}

/**
 * Tests the Markdown categories.
 *
 * @param markdownPage
 *        Markdown page to test
 */
function testCategories (markdownPage: IMarkdownPage): void
{
    const categoryTitles = Object.values(markdownPage).map(Object.keys);

    strictEqual(
        categoryTitles[0].includes('Grammar'), true,
        'Meta has to contain the grammar category:\n' + categoryTitles[0].join('\n')
    );

    strictEqual(
        categoryTitles.every(function (titles: string[], index: number): boolean {
            return (index === 0 || titles.includes('Translation'));
        }),
        true,
        'Languages have to contain the translation category:\n' + categoryTitles.join('\n')
    );
}

/**
 * Tests the Markdown sections.
 *
 * @param markdownPage
 *        Markdown page to test
 */
function testSections (markdownPage: IMarkdownPage): void
{
    const sectionTitles = Object.keys(markdownPage);

    strictEqual(
        sectionTitles[0], 'Meta',
        'Meta has to be the first section.'
    );

    strictEqual(
        sectionTitles[1], 'English',
        'English has to be the second section.'
    );

    deepStrictEqual(
        sectionTitles,
        ['Meta', 'English', ...sectionTitles.slice(2).sort()],
        'Sections beginning at third position have to be in order.'
    );
}
