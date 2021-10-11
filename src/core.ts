import { MAX_UUID_RETRY } from './constant';
import { CustomError, ErrorCode } from './error';

export async function uuidAsync(generate: () => string, exist: (id: string) => Promise<boolean>) {
  let counter = 0;
  let id: string;
  do {
    id = generate();
    counter++;
    if (counter > MAX_UUID_RETRY) {
      throw new CustomError('Cannot generate uuid', ErrorCode.ETC);
    }
  } while (await exist(id));

  return id;
}

export async function findUrl(id: string, findById: (id: string) => Promise<string>) {
  try {
    return await findById(id);
  } catch (e) {
    throw new CustomError('Url not found', ErrorCode.NOT_FOUND, e);
  }
}

export async function saveUrl(url: string, uuid: string, saveToStore: (key: string, value: string) => Promise<void>) {
  return await saveToStore(uuid, url);
}
