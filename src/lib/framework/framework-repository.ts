import {
  Repository as TypeormRepository, EntityRepository
} from 'typeorm';
import { _ } from 'tnp-core';

export function Repository(entity: Function) {
  return function (target: any) {
    EntityRepository(entity)(target)
  }
}

// TODO_NOT_IMPORTANT fix it whe typescipt stable
export abstract class BASE_REPOSITORY<Entity, GlobalAliases = {}> extends TypeormRepository<Entity> {


  //#region @websql

  __?: { [prop in keyof GlobalAliases]: { [propertyName in keyof Entity]: string } };
  _?: GlobalAliases;

  globalAliases?: (keyof GlobalAliases)[];

  pagination() {
    // TODO_NOT_IMPORTANT
  }

  //#endregion

}
