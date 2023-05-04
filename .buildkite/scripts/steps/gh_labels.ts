/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// import { GithubApi } from '../../../src/dev/prs/github_api';
import { Octokit } from '@octokit/rest';

const github = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});
console.log(`\n### github: \n${JSON.stringify(github, null, 2)}`);
const parseTarget = process.argv[2] ?? 'BUILDKITE_MESSAGE';

console.log(`\n### process.env.BUILDKITE_MESSAGE:
${process.env[parseTarget]}`);

// const mockBkMsg = `[Security Solution] Add technical preview tag to risk info panel and risk table tooltip (#156659)

// blah blah blah
// ### Checklist

// - [x] [Unit or functional
// tests](https://www.elastic.co/guide/en/kibana/master/development-tests.html)
// BLAH BLAH THE END`;

// console.log(`\n### mockBkMsg: \n  ${mockBkMsg}`);

const head = (x: string): string[] => x.split('\n');
const prNumWithinMsgRe = /\(\#(\d+)\)/;
// @ts-expect-error
const parse = (x: string) => x[0].match(prNumWithinMsgRe)[1];
// const prNum = pipe(head, parse, parseInt)(mockBkMsg);
const prNum = pipe(head, parse, parseInt)(`${process.env[parseTarget]}`);

console.log(`\n### prNum: \n  ${prNum}`);
// curl https://api.github.com/repos/elastic/kibana/issues/156373
export {};

function pipe(...fns: any[]) {
  return fns.reduce(
    (f, g) =>
      (...args: any[]) =>
        g(f(...args))
  );
}
