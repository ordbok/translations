/*---------------------------------------------------------------------------*/
/* Copyright (c) ORDBOK contributors. All rights reserved.                   */
/* Licensed under the MIT License. See the LICENSE file in the project root. */
/*---------------------------------------------------------------------------*/

import * as Fs from 'fs';
import { Markdown, Internals } from '@ordbok/core/dist';
import * as MarkdownTests from './markdown-tests';
import * as MetaTests from './meta-tests';

/* *
 *
 *  Variables
 *
 * */

let pageCounter = 0;

/* *
 *
 *  Functions
 *
 * */

function test (): void {

    try {

        Internals
            .getFiles('sources', /\.(?:md|markdown)$/)
            .forEach(testFile);

        console.log('\nTests of ' + pageCounter + ' pages succeeded.\n');

        process.exit(0);
    }
    catch (catchedError) {

        console.log('\nTests failed!');
        console.error('\nERROR: ' + catchedError.message);
        console.error('\nACTUAL: ', catchedError.actual);
        console.error('\nEXPECTED: ', catchedError.expected);

        process.exit(1);
    }
}

function testFile (filePath: string): void {

    try {

        const fileContent = Fs.readFileSync(filePath).toString();
        const markdown = new Markdown(fileContent);

        markdown.pages.forEach(MarkdownTests.test);
        markdown.pages.forEach(MetaTests.test);

        pageCounter += markdown.pages.length;
    }
    finally {

        console.log('Tested', filePath);
    }
}

/* *
 *
 *  Runtime
 *
 * */

test();
