import { DBConfig } from 'ngx-indexed-db';

export class IndexedDB {
  public static userDb(): DBConfig {
    const dbConfigUser: DBConfig = {
      name: 'db-users',
      version: 1,
      objectStoresMeta: [
        {
          store: 'users',
          storeConfig: { keyPath: 'document', autoIncrement: false },
          storeSchema: [
            { name: 'user', keypath: 'document', options: { unique: false } },
          ],
        },
      ],
    };

    return dbConfigUser;
  }
}
