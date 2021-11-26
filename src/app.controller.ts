/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Param,
  Req,
  Request,
  Res,
  Response,
  Sse,
} from '@nestjs/common';
import { interval, concatMap, from, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { FastifyReply } from 'fastify';

interface Media {
  id: string;
  type: 'Video' | 'Image';
  status: 'Uploaded' | 'Uploading';
}

interface ResponseSSE {
  data: Media;
}

@Controller()
export class AppController {
  async refresh(id: string): Promise<ResponseSSE> {
    return {
      data: {
        id: uuidv4(),
        status: 'Uploaded',
        type: 'Image',
      },
    };
  }

  // @Get('/sse/:id')
  // sse(@Param('id') id: string, @Request() req, @Res() res) {
  //   res.header('Content-Type', 'text/event-stream');
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  //   res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
  //   return res.sse(interval(1000).pipe(concatMap(() => this.refresh(id))));
  //   // return interval(1000).pipe(concatMap(() => this.refresh(id)));
  //   // return new Buffer('Joao');
  //   // return Buffer.from('asdfasdfadsf');
  //   // , @Response() response
  //   // response.set({ 'Content-Type': 'text/event-stream' });
  //   // return res.set({ 'Content-Type': 'text/event-stream' });
  //   // return res.header('Content-Type', 'text/event-stream').send({
  //   //   data: { stream: 'ok' },
  //   // });
  //   // return {
  //   //   id,
  //   // };
  //   // return interval(1000).pipe(concatMap(() => this.refresh(id)));
  //   // return ob$;
  // }

  @Sse('/sse/:id')
  sse(@Param('id') id: string) {
    return interval(1000).pipe(concatMap(() => this.refresh(id)));
  }
}
