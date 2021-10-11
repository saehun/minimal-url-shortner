import { DYNAMODB_REGION, DYNAMODB_TABLE_NAME } from './constant';
import { createSaveService } from './services';
import { DynamoStore } from './store';

async function main(url: string) {
  if (url == null) {
    console.error(`Usage: 'short <url>'`);
    process.exit(1);
  }

  if (!url.startsWith('http')) {
    console.error('<url> must be url string with protocol');
    process.exit(1);
  }

  const service = createSaveService(new DynamoStore({ region: DYNAMODB_REGION, tableName: DYNAMODB_TABLE_NAME }));

  console.log(await service.save(url));
}

main(process.argv[2]);
