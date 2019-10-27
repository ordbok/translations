/*!*
 *
 *  Copyright (c) ORDBOK contributors. All rights reserved.
 *
 *  Licensed under the MIT License. See the LICENSE file in the project root.
 *
 *!*/

import
{
    readFileSync
}
from 'fs';
import
{
    Markdown,
    Internals
}
from '@ordbok/core/dist';
import * as EnglishTests from './english-tests';
import * as GermanTests from './german-tests';
import * as MarkdownTests from './markdown-tests';
import * as MetaTests from './meta-tests';
import * as NewNorwegianTests from './new-norwegian-tests';
import * as NorwegianTests from './norwegian-tests';
import * as SwedishTests from './swedish-tests';

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

function test (): void
{
    try
    {
        Internals
            .getFiles('sources', /\.(?:md|markdown)$/)
            .forEach(testFile);

        console.log('\nTests of ' + pageCounter + ' pages succeeded.\n');

        process.exit(0);
    }
    catch (catchedError)
    {
        console.log('\nTests failed!');
        console.error('\nERROR: ' + catchedError.message);
        console.error('\nACTUAL: ', catchedError.actual);
        console.error('\nEXPECTED: ', catchedError.expected);

        process.exit(1);
    }
}

function testFile (filePath: string): void
{
    try
    {

        const fileContent = readFileSync(filePath).toString();
        const markdown = new Markdown(fileContent);

        markdown.pages.forEach(MarkdownTests.test);
        markdown.pages.forEach(MetaTests.test);
        markdown.pages.forEach(EnglishTests.test);
        markdown.pages.forEach(GermanTests.test);
        markdown.pages.forEach(NewNorwegianTests.test);
        markdown.pages.forEach(NorwegianTests.test);
        markdown.pages.forEach(SwedishTests.test);

        pageCounter += markdown.pages.length;
    }
    finally
    {
        console.log('Tested', filePath);
    }
}

/* *
 *
 *  Runtime
 *
 * */

test();
