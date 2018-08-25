import * as sqlite from 'sqlite';

export class ItemRepository {

  private dbHandle!: sqlite.Database;

  constructor(private dbPath: string) { }

  async init(): Promise<void> {
    this.dbHandle = await sqlite.open(this.dbPath);

    await this.dbHandle.exec('CREATE TABLE IF NOT EXISTS "items" (`id`	UUIDV4,  `version`	VARCHAR(255), PRIMARY KEY(id))');
  }

  private findById(id: string) {
    return this.dbHandle.get('SELECT * FROM items WHERE id = (?)', id);
  }

  async findOrCreate(id: string): Promise<[any, boolean]> {
    let item = await this.findById(id);
    let created = false;

    if (typeof item === 'undefined') {
      item = await this.dbHandle.run('insert into items (id, version) values (?, 0)', id).then(() => {
        return { id, version: 0 };
      });
      created = true;
    }

    console.log(id, item, created);

    return [ item, created ];
  }

  async updateVersion(id: string, version: number) {
    return this.dbHandle.run('update items set version = ? where id = ?', version, id);
  }
}
