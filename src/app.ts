import fastify from 'fastify';
import { DYNAMODB_REGION, DYNAMODB_TABLE_NAME } from './constant';
import { bindGetUrlController, bindSaveUrlController } from './controller';
import { createGetService, createSaveService } from './services';
import { DynamoStore } from './store';

export function createApp(store = new DynamoStore({ region: DYNAMODB_REGION, tableName: DYNAMODB_TABLE_NAME })) {
  const app = fastify();
  bindGetUrlController(app, createGetService(store));
  bindSaveUrlController(app, createSaveService(store));
  return app;
}
