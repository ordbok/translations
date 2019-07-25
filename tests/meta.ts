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

    if (metaGrammar[0] === 'Verb') {
        test_verbStructure(metaGrammar, metaStructure);
    }
}

function test_verbStructure (grammar: Array<string>, structure: Array<string>): void {

    if (grammar.length !== 2) {
        throw new Error('Verb grammar is invalid!');
    }
}
