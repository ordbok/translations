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
            throw new Error(`Unexpected grammar in Swedish: ${grammar[1]}`);

        case 'Common':
            strictEqual(
                (!indefinite.includes('(') || indefinite.startsWith('(en)')), true,
                `Common indefinite should start with "(en)" in Swedish: ${indefinite}`
            );
            break;

        case 'Neuter':
            strictEqual(
                (!indefinite.includes('(') || indefinite.startsWith('(ett)')), true,
                `Neuter indefinite should start with "(ett)" in Swedish: ${indefinite}`
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
    const firstPersonSingular = translation[0];
    const pronouns = [
        /(^| )mig( |$)/,
        /(^| )dig( |$)/,
        /(^| )sig( |$)/,
        /(^| )oss( |$)/,
        /(^| )er( |$)/,
        /(^| )sig( |$)/
    ];

    switch (grammar[1])
    {
        default:
            translation.forEach(
                function (translationCase: string, index: number): void
                {
                    strictEqual(
                        translationCase.replace(pronouns[index], '$1mig$2'), firstPersonSingular,
                        `Verb's translated grammar cases should be the same in Swedish.`
                    );
                }
            );
            break;

        case 'Infinitive':
            for (let translationCase of translation)
            {
                strictEqual(
                    translationCase.startsWith('(att)'), true,
                    `Verb's infinitive should start with "(att)" in Swedish.`
                );
                strictEqual(
                    translationCase, firstPersonSingular,
                    `Verb's translated grammar cases should be the same in Swedish infinitive.`
                );
            }
            break;
    }
}
