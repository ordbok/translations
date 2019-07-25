/*---------------------------------------------------------------------------*/
/* Copyright (c) ORDBOK contributors. All rights reserved.                   */
/* Licensed under the MIT License. See the LICENSE file in the project root. */
/*---------------------------------------------------------------------------*/

import { strict as Assert } from 'assert';
import * as Fs from 'fs';
import { IMarkdownPage, IMarkdownSection } from '@ordbok/core/dist';

/* *
 *
 *  Functions
 *
 * */

export function test (markdownPage: IMarkdownPage): void {

    const markdownMeta = markdownPage['Meta'];

    if (!markdownMeta) {
        throw new Error('No meta headline found!');
    }

    const metaGrammar = markdownMeta['Grammar'];
    const metaStructure = markdownMeta['Structure'];

    if (!metaGrammar) {
        throw new Error('No meta grammar found!');
    }

    switch (metaGrammar[0]) {

        default:
            throw new Error('Unexpected grammar type: ' + metaGrammar[0]);

        case 'Adjective':
            testAdjective(metaGrammar, metaStructure);
            break;

        case 'Determiner':
            testDeterminer(metaGrammar, metaStructure);
            break;

        case 'Noun':
            testNoun(metaGrammar, metaStructure);
            break;

        case 'Particle':
            testParticle(metaGrammar, metaStructure);
            break;

        case 'Phrase':
            testPhrase(metaGrammar, metaStructure);
            break;

        case 'Pronoun':
            testPronoun(metaGrammar, metaStructure);
            break;

        case 'Verb':
            testVerb(metaGrammar, metaStructure);
            break;
    }
}

function testAdjective (grammar: Array<string>, structure: Array<string>): void {

    Assert.equal(
        grammar.length, 2,
        'Adjective grammar is invalid: ' + grammar.join(' ; ')
    );
}

function testDeterminer (grammar: Array<string>, structure: Array<string>): void {

    Assert.ok(
        grammar.length >= 2 && grammar.length <= 4,
        'Determiner grammar is invalid: ' + grammar.join(' ; ')
    );
}

function testNoun (grammar: Array<string>, structure: Array<string>): void {

    Assert.equal(
        grammar.length, 1,
        'Noun grammar is invalid: ' + grammar.join(' ; ')
    );
}

function testParticle (grammar: Array<string>, structure: Array<string>): void {

    Assert.equal(
        grammar.length, 1,
        'Particle grammar is invalid: ' + grammar.join(' ; ')
    );
}

function testPhrase (grammar: Array<string>, structure: Array<string>): void {

    Assert.equal(
        grammar.length, 1,
        'Phrase grammar is invalid: ' + grammar.join(' ; ')
    );
}

function testPronoun (grammar: Array<string>, structure: Array<string>): void {

    Assert.ok(
        grammar.length >= 2 && grammar.length <= 3,
        'Pronoun grammar is invalid: ' + grammar.join(' ; ')
    );
}

function testVerb (grammar: Array<string>, structure: Array<string>): void {

    Assert.equal(
        grammar.length, 2,
        'Verb grammar is invalid: ' + grammar.join(' ; '));
}
