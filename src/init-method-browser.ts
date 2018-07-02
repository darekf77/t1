
import { HttpMethod, MethodConfig, ParamConfig, Resource } from "ng2-rest";
import { Global } from './global-config';
import { SYMBOL } from './symbols';



export function initMethodBrowser(target, type: HttpMethod, methodConfig: MethodConfig, expressPath) {

  console.log(`Init ${target.name} method on ${expressPath}`)

  target.prototype[methodConfig.methodName] = function (...args) {
    console.log('FRONTEND expressPath', expressPath)

    const uri: URL = Global.vars.url;
    if (!window[SYMBOL.ENDPOINT_META_CONFIG]) window[SYMBOL.ENDPOINT_META_CONFIG] = {};
    if (!window[SYMBOL.ENDPOINT_META_CONFIG][uri.href]) window[SYMBOL.ENDPOINT_META_CONFIG][uri.href] = {};
    const endpoints = window[SYMBOL.ENDPOINT_META_CONFIG];
    let rest;
    if (!endpoints[uri.href][expressPath]) {
      rest = Resource.create(uri.href, expressPath, SYMBOL.MAPPING_CONFIG_HEADER as any );
      endpoints[uri.href][expressPath] = rest;
    } else {
      rest = endpoints[uri.href][expressPath];
    }


    const method = type.toLowerCase();
    const isWithBody = (method === 'put' || method === 'post');
    const pathPrams = {};
    const queryParams = {};
    let item = {};
    args.forEach((param, i) => {
      let currentParam: ParamConfig;
      //#region find param
      for (let pp in methodConfig.parameters) {
        let v = methodConfig.parameters[pp];
        if (v.index === i) {
          currentParam = v;
          break;
        }
      }
      //#endregion
      // debugger
      if (currentParam.paramType === 'Path') {
        pathPrams[currentParam.paramName] = param;
      }
      if (currentParam.paramType === 'Query') {
        queryParams[currentParam.paramName] = param;
      }
      if (currentParam.paramType === 'Header') {
        if (currentParam.paramName) {
          Resource.Headers.request.set(currentParam.paramName, param)
        } else {
          for (let header in param) {
            Resource.Headers.request.set(header, param[header])
          }
        }
      }
      if (currentParam.paramType === 'Cookie') {
        Resource.Cookies.write(currentParam.paramName, param, currentParam.expireInSeconds);
      }
      if (currentParam.paramType === 'Body') {
        if (currentParam.paramName) {
          item[currentParam.paramName] = param;
        } else {
          item = param;
        }
      }
    });
    // debugger;
    return {
      received: isWithBody ? rest.model(pathPrams)[method](item, [queryParams]) : rest.model(pathPrams)[method]([queryParams])
    }
  };
}
