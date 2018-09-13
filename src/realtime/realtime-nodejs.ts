import { Global } from '../global-config';
// import { HttpMethod, MethodConfig, ClassConfig } from 'ng2-rest';

//#region @backend
import { Http2Server } from 'http2';
import * as io from 'socket.io';
import { Response, Request } from "express";
import { getExpressPath } from '../models';
import { SYMBOL } from '../symbols';
//#endregion


export class RealtimeNodejs {
  //#region @backend
  init(http: Http2Server) {
    const uri: URL = Global.vars.urlSocket;
    if (!uri) {
      console.warn(`
        MORPHI: Please use { hostSocket } in morphi init(..)
        function to make socket works
      `)
      return
    }
    // const routePathame = (uri.pathname !== '/');
    const socket = io(http
      , {
        // path: routePathame ? '/api' : undefined,
        // transports: routePathame ?
        //   [
        //     'websocket',
        //     'flashsocket',
        //     'htmlfile',
        //     'xhr-polling',
        //     'jsonp-polling',
        //     'polling']
        //   : undefined,
      }
    );
    Global.vars.socket.BE = socket;

    Global.vars.clientsSockets = new Map<string, io.Socket>();
    const socketSession = Global.vars.clientsSockets;

    socket.on('connection', (socket) => {
      socketSession.set(socket.id, socket);
      console.info(`Client connected [id=${socket.id}]`);
      socket.on('disconnect', () => {
        socketSession.delete(socket.id)
        console.info(`Client gone [id=${socket.id}]`);
      });
    });

  }

  request(req: Request, res: Response) {

    // res.on('finish', () => {
    //   // console.log(res.statusCode + ': 1' + req.method);
    //   const statusCode = res.statusCode;
    //   const method: HttpMethod = req.method as any;
    //   if (method !== 'GET' && !isNaN(statusCode) && statusCode >= 200 && statusCode < 300) {
    //     const m: MethodConfig = res[SYMBOL.METHOD_DECORATOR];
    //     const c: ClassConfig = res[SYMBOL.CLASS_DECORATOR];
    //     let pathes = Object.keys(c.methods)
    //       .filter(k => c.methods[k].realtimeUpdate)
    //       .map(k => getExpressPath(c, c.methods[k].path));
    //     // socket.emit(SOCKET_MSG, {
    //     //   method: 'GET',
    //     //   pathes
    //     // });
    //   }
    // });
  }


  //#endregion
}
