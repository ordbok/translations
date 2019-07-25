/*---------------------------------------------------------------------------*/
/* Copyright (c) ORDBOK contributors. All rights reserved.                   */
/* Licensed under the MIT License. See the LICENSE file in the project root. */
/*---------------------------------------------------------------------------*/

import * as Fs from 'fs';
import { Markdown, Internals } from '@ordbok/core/dist';
import * as Meta from './meta';

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

        console.log('\nTests succeeded.\n');

        process.exit(0);
    }
    catch (catchedError) {

        console.error('\nTests failed!\n', catchedError);

        process.exit(1);
    }
}

function testFile (filePath: string): void {

    try {

        const fileContent = Fs.readFileSync(filePath).toString();
        const markdown = new Markdown(fileContent);

        markdown.pages.forEach(Meta.test);
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
