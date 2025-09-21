import Database from "better-sqlite3";

const database = new Database("./src/app/data/database.sqlite", { verbose: console.log });

database.prepare(`
    CREATE TABLE IF NOT EXISTS webservices (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(32) NOT NULL,
        url VARCHAR(128) NOT NULL,
        thumbnailPath VARCHAR(128) NOT NULL
    )
`).run();

export default database;