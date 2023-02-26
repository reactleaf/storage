export default class StorageAccessor<StorageData extends {}> {
    #private;
    constructor(prefix?: string, getStorage?: () => Storage);
    get<K extends keyof StorageData>(key: K): StorageData[K] | null;
    set<K extends keyof StorageData>(key: K, value: StorageData[K]): void;
    remove<K extends keyof StorageData>(key: K): void;
}
