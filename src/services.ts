import { nanoid } from 'nanoid';
import { API_HOST } from './constant';
import { findUrl, saveUrl, uuidAsync } from './core';
import { KeyValueStore } from './store';

export interface GetService {
  get: (id: string) => Promise<string>;
}

export function createGetService(store: KeyValueStore): GetService {
  async function get(id: string) {
    return await findUrl(id, (id: string) => store.get(id));
  }

  return {
    get,
  };
}

export interface SaveService {
  save: (url: string) => Promise<string>;
}

export function createSaveService(store: KeyValueStore): SaveService {
  async function save(url: string) {
    const id = await uuidAsync(
      () => nanoid(7),
      (id: string) => store.has(id)
    );
    await saveUrl(url, id, (key, value) => store.set(key, value));
    return `https://${API_HOST}/${id}`;
  }

  return {
    save,
  };
}
