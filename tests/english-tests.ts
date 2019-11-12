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
 * Tests the English section of a Markdown page.
 *
 * @param markdownPage
 * Markdown page to test.
 */
export function test (markdownPage: IMarkdownPage): void
{
    const markdownMeta = markdownPage['Meta'];
    const markdownEnglish = markdownPage['English'];

    if (!markdownEnglish || !markdownMeta)
    {
        return;
    }

    const grammar = (markdownMeta['Grammar'] || []).concat(markdownEnglish['Grammar'] || []);
    const translation = (markdownEnglish['Translation'] || []);

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

    strictEqual(
        (
            !indefinite.includes('(') ||
            indefinite.startsWith('(a)') ||
            indefinite.startsWith('(an)')
        ),
        true,
        `Indefinite should start with "(a)" or with "(an)" in English.`
    );
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
        case 'Present':
            const [
                firstPersonSingular,
                secondPersonSingular,
                thirdPersonSingular,
                firstPersonPlural,
                secondPersonPlural,
                thirdPersonPlural,
            ] = translation;
            if (firstPersonSingular === 'am' || firstPersonSingular.startsWith('am '))
            {
                break;
            }
            strictEqual(
                secondPersonSingular, firstPersonSingular,
                `Verb's translated second person singular should be the same in English.`
            );
            strictEqual(
                (
                    thirdPersonSingular === 'can' ||
                    thirdPersonSingular === 'shall' ||
                    thirdPersonSingular.includes(' ') ||
                    thirdPersonSingular.endsWith(firstPersonSingular + 's') ||
                    (
                        firstPersonSingular.endsWith('o') &&
                        thirdPersonSingular.endsWith(firstPersonSingular + 'es')
                    ) ||
                    (
                        firstPersonSingular.endsWith('sh') &&
                        thirdPersonSingular.endsWith(firstPersonSingular + 'es')
                    ) ||
                    (
                        firstPersonSingular.endsWith('x') &&
                        thirdPersonSingular.endsWith(firstPersonSingular + 'es')
                    ) ||
                    (
                        firstPersonSingular.endsWith('ve') &&
                        thirdPersonSingular.endsWith(firstPersonSingular.substr(0, -2) + 's')
                    ) ||
                    firstPersonSingular.endsWith('s')
                ),
                true,
                `Verb's translated third person singular should end on "s" in English: ${thirdPersonSingular}`
            );
            strictEqual(
                firstPersonPlural, firstPersonSingular,
                `Verb's translated first person plural should be the same in English.`
            );
            strictEqual(
                secondPersonPlural, firstPersonSingular,
                `Verb's translated second person plural should be the same in English.`
            );
            strictEqual(
                thirdPersonPlural, firstPersonSingular,
                `Verb's translated third person plural should be the same in English.`
            );
            break;

        case 'Infinitive':
            for (let translationCase of translation)
            {
                strictEqual(
                    translationCase.startsWith('(to)'), true,
                    `Verb's infinitive should start with "(to)" in English: ${translationCase}`
                );
            }
            break;
    }
}
