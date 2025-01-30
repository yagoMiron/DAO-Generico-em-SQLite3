import { join } from "path";
import { readFileSync } from "fs";
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

export abstract class GenericDAO<T> {
  protected _contacts: T[];
  protected _strContent: string;

  constructor(filename: string) {
    const filePath = join(__dirname, "..", "data", filename);
    this._strContent = readFileSync(filePath, "utf-8");
    this._contacts = [];
  }

  save(generic: T, identifier: string) {
    if (!this.findUserByEmail(identifier)) {
      this._contacts.push(generic);

      this.flush();
    } else {
      throw new Error();
    }
  }

  async create(entity: T): Promise<void> {
    db.run("CREATE TABLE lorem (info TEXT)");
    const { email, name } = entity
    db.run('INSERT INTO client(name, email) VALUES($name, $email)', {
      $name: name,
      $email: email,
    })

    const response = db.run('SELECT last_insert_rowid() FROM client').get()
    const id: number = response['last_insert_rowid()']

    return this.find(id)
  } //Insere um novo registro na tabela.
  async read(id: number): Promise<T | null> {} //Retorna um registro baseado no ID fornecido.
  async update(id: number, entity: T): Promise<void> {} //Atualiza um registro existente.
  async delete(id: number): Promise<void> {
    db.run('DELETE FROM client WHERE id = ?', id)
  } //Remove um registro pelo ID.
  async findAll(): Promise<T[]> {
    const generics:T[] = db.run('SELECT *FROM client').all().
    return generics
  } //Retorna todos os registros da tabela.
  async findByCriteria(criteria: Criteria): Promise<T[]> {}
  /**
   * Faz a descarga dos dados no arquivo fonte.
   */
  abstract flush(): void;
}
