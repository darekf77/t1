//// FILE GENERATED BY TNP /////
import { Morphi } from 'morphi';




export const Entities: Morphi.Base.Entity<any>[] = [

] as any;

//#region @backend



import { Repository } from 'typeorm';
export { Repository } from 'typeorm';
import { _ } from 'tnp-core'

export function entities<ADDITIONAL={}>(connection?: Morphi.Orm.Connection, decoratorsEntities?: ADDITIONAL) {
return _.merge({

} , decoratorsEntities );
}
//#endregion