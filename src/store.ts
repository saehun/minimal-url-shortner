import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { CustomError, ErrorCode } from './error';

export interface KeyValueStore {
  get(key: string): Promise<string>;
  set(key: string, value: string): Promise<void>;
  has(key: string): Promise<boolean>;
  remove(key: string): Promise<void>;
}

export interface DynamoDBConfig {
  region: string;
  tableName: string;
}

export class DynamoStore implements KeyValueStore {
  private client: DynamoDB;
  private document: DynamoDBDocument;
  constructor(private readonly config: DynamoDBConfig) {
    this.client = new DynamoDB({
      region: config.region,
    });
    this.document = DynamoDBDocument.from(this.client);
  }

  async set(key: string, value: string) {
    await this.document.put({
      TableName: this.config.tableName,
      Item: { key, value },
    });
  }

  async get(key: string) {
    const { Item } = await this.document.get({
      TableName: this.config.tableName,
      Key: { key },
    });
    if (Item == null) {
      throw new CustomError(`Cannot find item from dynamodb table ${this.config.tableName}`, ErrorCode.NOT_FOUND);
    }
    return Item.value as string;
  }

  async remove(key: string) {
    try {
      await this.document.delete({
        TableName: this.config.tableName,
        Key: { key },
      });
    } catch {
      /** noop */
    }
  }

  async has(key: string) {
    try {
      await this.get(key);
      return true;
    } catch (e) {
      if (e instanceof CustomError) {
        return false;
      }
      throw e;
    }
  }
}
