/*!*
 *
 *  Copyright (c) ORDBOK contributors. All rights reserved.
 *
 *  Licensed under the MIT License. See the LICENSE file in the project root.
 *
 *!*/

import
{
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
 * Tests the Norwegian section of a Markdown page.
 *
 * @param markdownPage
 * Markdown page to test.
 */
export function test (markdownPage: IMarkdownPage): void
{
    const markdownMeta = markdownPage['Meta'];
    const markdownNorwegian = markdownPage['Norwegian'];

    if (!markdownNorwegian || !markdownMeta)
    {
        return;
    }

    const grammar = (markdownMeta['Grammar'] || []).concat(markdownNorwegian['Grammar'] || []);
    const translation = (markdownNorwegian['Translation'] || []);

    if (!grammar.length || !translation || !translation.length)
    {
        return;
    }

    switch (grammar[0])
    {
        case 'Noun':
            testNoun(translation, grammar);
            break;

        case 'Verb':
            testVerb(translation, grammar);
            break;
    }
}

/**
 * Tests noun translation.
 *
 * @param translation
 * Translation to test.
 *
 * @param grammar
 * Grammar to test.
 */
function testNoun (translation: Array<string>, grammar: Array<string>)
{
    const indefinite = translation[0];

    switch (grammar[1])
    {
        default:
            throw new Error(`Unexpected grammar in Norwegian: ${grammar[1]}`);

        case 'Feminine':
            strictEqual(
                (!indefinite.includes('(') || indefinite.startsWith('(ei)')), true,
                `Feminine indefinite should start with "(ei)" in Norwegian: ${indefinite}`
            );
            break;

        case 'Masculine':
            strictEqual(
                (!indefinite.includes('(') || indefinite.startsWith('(en)')), true,
                `Masculine indefinite should start with "(en)" in Norwegian: ${indefinite}`
            );
            break;

        case 'Neuter':
            strictEqual(
                (!indefinite.includes('(') || indefinite.startsWith('(et)')), true,
                `Neuter indefinite should start with "(et)" in Norwegian: ${indefinite}`
            );
            break;
    }
}

/**
 * Tests verb translation.
 *
 * @param translation
 * Translation to test.
 *
 * @param grammar
 * Grammar to test.
 */
function testVerb (translation: Array<string>, grammar: Array<string>)
{
    switch (grammar[1])
    {
        default:
            const firstPersonSingular = translation[0];
            for (let grammarCase of translation)
            {
                strictEqual(
                    grammarCase, firstPersonSingular,
                    `Verb's translated grammar cases should be the same in Norwegian.`
                );
            }
            break;

        case 'Infinitive':
            for (let translationCase of translation)
            {
                strictEqual(
                    translationCase.startsWith('(å)'), true,
                    `Verb's infinitive should start with "(å)" in Norwegian.`
                );
            }
            break;
    }
}
