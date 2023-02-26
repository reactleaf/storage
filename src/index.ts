export default class StorageAccessor<StorageData extends {}> {
  #prefix: string;
  #getStorage: () => Storage;

  constructor(prefix?: string, getStorage?: () => Storage) {
    this.#prefix = prefix ?? "";
    this.#getStorage = getStorage ?? (() => window.localStorage);
  }

  #prefixer(key: string | number | symbol) {
    if (this.#prefix) {
      return `${this.#prefix}${String(key)}`;
    }
    return String(key);
  }

  get<K extends keyof StorageData>(key: K): StorageData[K] | null {
    const storedValue = this.#getStorage().getItem(this.#prefixer(key));
    if (storedValue !== null) {
      return JSON.parse(storedValue);
    }
    return null;
  }

  set<K extends keyof StorageData>(key: K, value: StorageData[K]): void {
    this.#getStorage().setItem(this.#prefixer(key), JSON.stringify(value));
  }

  remove<K extends keyof StorageData>(key: K) {
    this.#getStorage().removeItem(this.#prefixer(key));
  }
}
