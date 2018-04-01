import * as child from 'child_process';

import * as path from 'path';

import * as fs from 'fs';

import { Helpers } from './helpers';
import { wrapperIsomorphicBuildProcess } from "./build";
import { copyExampleTo } from './new';

export * from './helpers';
export * from './build';

export function run(argsv: string[], morphiEnvironmentCheck = true) {
  if (morphiEnvironmentCheck) {
    Helpers.checkEnvironment()
  }
  if (argsv.length >= 3) {
    const commandName: 'build' | 'ln' | 'new' | '-v' | '-h' | '--help' | '-help' = argsv[2] as any;


    if (commandName === 'build') {
      wrapperIsomorphicBuildProcess({
        build: {
          otherIsomorphicLibs: argsv.slice(4)
        }
      });
    } else if (commandName === '-h' || commandName === '-help' || commandName === '--help') {
      console.log('Usage: morphi build <lib1> <lib2> ... ')
      console.log('Where lib(n) is name of included in node_modules isomorphic lib')
      console.log('Example isomorphic libs are: typeorm, ng2-rest, morphi...');
    } else if (commandName === 'ln') {
      if (!Array.isArray(argsv) || argsv.length < 2) {
        console.log(`To few arguments for linking function...`);
        process.exit(0)
      }
      const link = argsv[3]
      let target = argsv[4]
      child.execSync(Helpers.createLink(target, link))
    } else if (commandName === 'new') {
      if (!Array.isArray(argsv) || argsv.length < 4) {
        console.log(`To few arguments.. try: morphi new myAppName`);
        process.exit(0)
      }
      const name = argsv[3]
      copyExampleTo(name)
    } else if (commandName === '-v') {
      console.log(JSON.parse(fs.readFileSync(path.join(__dirname, '../..', 'package.json').toString(), 'utf8').toString()).version)
    }
    process.exit(0)

  }

}


