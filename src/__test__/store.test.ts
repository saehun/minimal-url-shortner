import { DYNAMODB_REGION, DYNAMODB_TABLE_NAME } from '../constant';
import { DynamoStore } from '../store';

describe('DynamoStore e2e', () => {
  const store = new DynamoStore({ region: DYNAMODB_REGION, tableName: DYNAMODB_TABLE_NAME });
  it.skip('can save value', async () => {
    await store.set('foo', 'bar');
  });

  it.skip('can retrieve value', async () => {
    const value = await store.get('foo');
    expect(value).toEqual('bar');
  });

  it.skip('can check existence of the key', async () => {
    expect(await store.has('foo')).toBeTruthy();
    expect(await store.has('bar')).toBeFalsy();
  });
});
