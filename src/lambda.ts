import { createApp } from './app';

export const handler = require('aws-lambda-fastify')(createApp());
