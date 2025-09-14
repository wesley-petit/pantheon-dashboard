import Database from "better-sqlite3";

const database = new Database("./src/app/data/database.sqlite", { verbose: console.log });

database.prepare(`
    CREATE TABLE IF NOT EXISTS webservices (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        url TEXT NOT NULL,
        image_path TEXT NOT NULL
    )
`).run();

export default database;