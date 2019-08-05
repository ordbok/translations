/*---------------------------------------------------------------------------*/
/* Copyright (c) ORDBOK contributors. All rights reserved.                   */
/* Licensed under the MIT License. See the LICENSE file in the project root. */
/*---------------------------------------------------------------------------*/

import * as Assert from 'assert';
import { IMarkdownPage } from '@ordbok/core/dist';

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
export function test (markdownPage: IMarkdownPage): void {

    testSectionOrder(markdownPage);
}

/**
 * Tests the order of a Markdown section.
 *
 * @param markdownPage
 *        Markdown page to test
 */
function testSectionOrder (markdownPage: IMarkdownPage): void {

    const sectionTitles = Object.keys(markdownPage);

    Assert.strictEqual(
        sectionTitles[0], 'Meta',
        'Meta has to be the first section.'
    );

    Assert.strictEqual(
        sectionTitles[1], 'English',
        'English has to be the second section.'
    );

    Assert.deepStrictEqual(
        sectionTitles,
        ['Meta', 'English', ...sectionTitles.slice(2).sort()],
        'Sections beginning at third position have to be in order.'
    );
}
