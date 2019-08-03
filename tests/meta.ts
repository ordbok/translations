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

export function test (markdownPage: IMarkdownPage): void {

    const markdownMeta = markdownPage['Meta'];

    if (!markdownMeta) {
        throw new Error('No meta headline found!');
    }

    const metaGrammar = (markdownMeta['Grammar'] || []);
    const metaStructure = (markdownMeta['Structure'] || []);

    if (!metaGrammar.length) {
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

/**
 * Adjective tests
 *
 * @param grammar
 *        Grammar to test
 *
 * @param structure
 *        Structure to test
 */
function testAdjective (grammar: Array<string>, structure: Array<string>): void {

    Assert.strictEqual(
        grammar.length, 2,
        'Adjective grammar is invalid: ' + grammar.join(' ; ')
    );

    Assert.ok(
        [
            'Positive', 'Comparative', 'Superlative'
        ]
        .includes(grammar[1]),
        'Adjective grammar is invalid: ' + grammar.join(' ; ')
    );

    Assert.ok(
        structure.length === 4 || structure.length === 12,
        'Adjective structure is invalid: ' + structure.join(' ; ')
    );

    if (structure.length === 4) {
        Assert.deepStrictEqual(
            structure,
            [
                'Singular, Predicative, Feminine', 'Singular, Predicative, Masculine',
                'Singular, Predicative, Neuter', 'Plural, Predicative, Common',
            ],
            'Adjective structure is invalid: ' + structure.join(' ; ')
        );
    }
    else {
        Assert.deepStrictEqual(
            structure,
            [
                'Singular, Predicative, Feminine', 'Singular, Predicative, Masculine',
                'Singular, Predicative, Neuter', 'Plural, Predicative, Common',
                'Singular, Indefinite, Feminine', 'Singular, Indefinite, Masculine',
                'Singular, Indefinite, Neuter', 'Plural, Indefinite, Common',
                'Singular, Definite, Feminine', 'Singular, Definite, Masculine',
                'Singular, Definite, Neuter', 'Plural, Definite, Common'
            ],
            'Adjective structure is invalid: ' + structure.join(' ; ')
        );
    }
}

/**
 * Determiner tests
 *
 * @param grammar
 *        Grammar to test
 *
 * @param structure
 *        Structure to test
 */
function testDeterminer (grammar: Array<string>, structure: Array<string>): void {

    Assert.ok(
        grammar.length >= 2 && grammar.length <= 4,
        'Determiner grammar is invalid: ' + grammar.join(' ; ')
    );

    Assert.ok(
        [
            'Indefinite', 'Definite', 'First Person','Second Person', 'Third Person'
        ]
        .includes(grammar[1]),
        'Determiner grammar is invalid: ' + grammar.join(' ; ')
    );

    Assert.ok(
        [
            'Indefinite', 'Singular', 'Plural'
        ]
        .includes(grammar[2] || 'Indefinite'),
        'Determiner grammar is invalid: ' + grammar.join(' ; ')
    );

    Assert.ok(
        [
            'Common', 'Feminine', 'Masculine', 'Neuter'
        ]
        .includes(grammar[3] || 'Common'),
        'Determiner grammar is invalid: ' + grammar.join(' ; ')
    );

    Assert.strictEqual(
        structure.length, 4,
        'Determiner structure is invalid: ' + structure.join(' ; ')
    );

    Assert.deepStrictEqual(
        structure,
        [
            'Singular, Feminine', 'Singular, Masculine', 'Singular, Neuter', 'Plural, Common'
        ],
        'Determiner structure is invalid: ' + structure.join(' ; ')
    );
}

/**
 * Noun tests
 *
 * @param grammar
 *        Grammar to test
 *
 * @param structure
 *        Structure to test
 */
function testNoun (grammar: Array<string>, structure: Array<string>): void {

    Assert.strictEqual(
        grammar.length, 1,
        'Noun grammar is invalid: ' + grammar.join(' ; ')
    );

    Assert.strictEqual(
        structure.length, 4,
        'Noun structure is invalid: ' + structure.join(' ; ')
    );

    Assert.deepStrictEqual(
        structure,
        [
            'Singular, Indefinite', 'Singular, Definite', 'Plural, Indefinite', 'Plural, Definite'
        ],
        'Noun structure is invalid: ' + structure.join(' ; ')
    );
}

function testParticle (grammar: Array<string>, structure: Array<string>): void {

    Assert.strictEqual(
        grammar.length, 1,
        'Particle grammar is invalid: ' + grammar.join(' ; ')
    );

    Assert.strictEqual(
        structure.length, 0,
        'Particle structure is invalid: ' + structure.join(' ; ')
    );
}

function testPhrase (grammar: Array<string>, structure: Array<string>): void {

    Assert.strictEqual(
        grammar.length, 1,
        'Phrase grammar is invalid: ' + grammar.join(' ; ')
    );

    Assert.strictEqual(
        structure.length, 0,
        'Phrase structure is invalid: ' + structure.join(' ; ')
    );
}

function testPronoun (grammar: Array<string>, structure: Array<string>): void {

    Assert.ok(
        grammar.length === 2 ||
        grammar.length === 3,
        'Pronoun grammar is invalid: ' + grammar.join(' ; ')
    );

    Assert.strictEqual(
        structure.length, 4,
        'Pronoun structure is invalid: ' + structure.join(' ; ')
    );
}

function testVerb (grammar: Array<string>, structure: Array<string>): void {

    Assert.strictEqual(
        grammar.length, 2,
        'Verb grammar is invalid: ' + grammar.join(' ; '));

    Assert.strictEqual(
        structure.length, 6,
        'Verb structure is invalid: ' + structure.join(' ; ')
    );
}
