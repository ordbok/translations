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
    const markdownGerman = markdownPage['German'];

    if (!markdownGerman || !markdownMeta)
    {
        return;
    }

    const grammar = (markdownMeta['Grammar'] || []).concat(markdownGerman['Grammar'] || []);
    const translation = (markdownGerman['Translation'] || []);

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
            throw new Error(`Unexpected grammar in German: ${grammar[1]}`);

        case 'Feminine':
            strictEqual(
                (!indefinite.includes('(') || indefinite.startsWith('(eine)')), true,
                `Feminine indefinite should start with "(eine)" in German: ${indefinite}`
            );
            break;

        case 'Masculine':
            strictEqual(
                (!indefinite.includes('(') || indefinite.startsWith('(ein)')), true,
                `Masculine indefinite should start with "(ein)" in German: ${indefinite}`
            );
            break;

        case 'Neuter':
            strictEqual(
                (!indefinite.includes('(') || indefinite.startsWith('(ein)')), true,
                `Neuter indefinite should start with "(ein)" in German: ${indefinite}`
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
        case 'Infinitive':
            for (let translationCase of translation)
            {
                strictEqual(
                    (
                        translationCase.startsWith('(zu)') ||
                        (
                            translationCase.includes(' ') &&
                            translationCase.includes('(zu) ')
                        )
                    ),
                    true,
                    `Verb's infinitive should start with "(zu)" in German.`
                );
            }
            break;
    }
}
