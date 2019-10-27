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
 * Tests the New Norwegian section of a Markdown page.
 *
 * @param markdownPage
 * Markdown page to test.
 */
export function test (markdownPage: IMarkdownPage): void
{
    const markdownMeta = markdownPage['Meta'];
    const markdownNewNorwegian = markdownPage['New Norwegian'];

    if (!markdownNewNorwegian || !markdownMeta)
    {
        return;
    }

    const grammar = (markdownMeta['Grammar'] || []).concat(markdownNewNorwegian['Grammar'] || []);
    const translation = (markdownNewNorwegian['Translation'] || []);

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
            throw new Error(`Unexpected grammar in New Norwegian: ${grammar[1]}`);

        case 'Feminine':
            strictEqual(
                (!indefinite.includes('(') || indefinite.startsWith('(ei)')), true,
                `Feminine indefinite should start with "(ei)" in New Norwegian: ${indefinite}`
            );
            break;

        case 'Masculine':
            strictEqual(
                (!indefinite.includes('(') || indefinite.startsWith('(ein)')), true,
                `Masculine indefinite should start with "(ein)" in New Norwegian: ${indefinite}`
            );
            break;

        case 'Neuter':
            strictEqual(
                (!indefinite.includes('(') || indefinite.startsWith('(eit)')), true,
                `Neuter indefinite should start with "(eit)" in New Norwegian: ${indefinite}`
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
                    `Verb's translated grammar cases should be the same in New Norwegian.`
                );
            }
            break;

        case 'Infinitive':
            for (let translationCase of translation)
            {
                strictEqual(
                    translationCase.startsWith('(å)'), true,
                    `Verb's infinitive should start with "(å)" in New Norwegian.`
                );
            }
            break;
    }
}
