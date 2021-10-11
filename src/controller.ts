import { FastifyInstance } from 'fastify';
import { CustomError, ErrorCode } from './error';
import { GetService, SaveService } from './services';

export function bindGetUrlController(app: FastifyInstance, service: GetService) {
  app.get('/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const origin = await service.get(id);
      reply.header('location', origin).status(301).send();
    } catch (e) {
      if (e instanceof CustomError && e.code === ErrorCode.NOT_FOUND) {
        reply.status(404).send();
      }
      throw e;
    }
  });
}

export function bindSaveUrlController(app: FastifyInstance, service: SaveService) {
  app.post('/', async (request, reply) => {
    const url = (request.body as { url: string }).url;
    if (url == null) {
      reply.status(400).send();
    } else {
      return await service.save(url);
    }
  });
}
