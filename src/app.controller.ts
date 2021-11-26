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

  @Sse('/sse/:id')
  sse(@Param('id') id: string) {
    return interval(1000).pipe(concatMap(() => this.refresh(id)));
  }
}
