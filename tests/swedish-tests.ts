/*!*
 *
 *  Copyright (c) ORDBOK contributors. All rights reserved.
 *
 *  Licensed under the MIT License. See the LICENSE file in the project root.
 *
 *!*/

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
 * Tests the Swedish section of a Markdown page.
 *
 * @param markdownPage
 * Markdown page to test.
 */
export function test (markdownPage: IMarkdownPage): void
{
    const markdownMeta = markdownPage['Meta'];
    const markdownSwedish = markdownPage['Swedish'];

    if (!markdownSwedish || !markdownMeta)
    {
        return;
    }

    const grammar = (markdownMeta['Grammar'] || []).concat(markdownSwedish['Grammar'] || []);
    const translation = (markdownSwedish['Translation'] || []);

    if (!grammar.length || !translation || !translation.length)
    {
        return;
    }

    switch (grammar[0])
    {
        case 'Noun':
            testNoun(grammar, translation);
            break;
    }
}

/**
 * Noun tests
 *
 * @param translation
 * Translation to test.
 *
 * @param grammar
 * Grammar to test.
 */
function testNoun (grammar: Array<string>, translation: Array<string>) {

    const indefinite = (translation[0] || '');

    switch (grammar[1]) {
        default:
            throw new Error('Unexpected grammar: ' + grammar[1]);

        case 'Common':
            if (indefinite.includes('(') && !indefinite.includes('(en)')) {
                throw new Error('Unexpected common indefinite: ' + indefinite);
            }
            break;

        case 'Neuter':
            if (indefinite.includes('(') && !indefinite.includes('(ett)')) {
                throw new Error('Unexpected neuter indefinite: ' + indefinite);
            }
            break;
    }
}
