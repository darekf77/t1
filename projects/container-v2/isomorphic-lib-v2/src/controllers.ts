
//// FILE GENERATED BY TNP /////
import { Morphi } from 'morphi';



import { PiesController } from './apps/pies/PiesController';
export { PiesController } from './apps/pies/PiesController';

import { TestowyController } from './apps/testowy/TestowyController';
export { TestowyController } from './apps/testowy/TestowyController';

export const Controllers: Morphi.Base.Controller<any>[] = [
PiesController,
TestowyController
] as any;

//#region @backend

import { CLASS } from 'typescript-class-helpers';
import { _ } from 'tnp-core'

export function controllers<ADDITIONAL={}>(decoratorsControllers?: ADDITIONAL) {
return _.merge( {

PiesController: CLASS.getSingleton<PiesController>(PiesController),

TestowyController: CLASS.getSingleton<TestowyController>(TestowyController),
} , decoratorsControllers );
}
//#endregion
