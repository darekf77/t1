// @ts-ignore
import * as ENV from '../../../../tmp-environment.json';
const production = true;
// @ts-ignore
window.ENV = ENV;
// @ts-ignore
window.ENV.angularProd = production;

export const environment = {
  production
};
