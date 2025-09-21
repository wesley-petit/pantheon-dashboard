import Database from "better-sqlite3";

const database = new Database("./src/app/data/database.sqlite", { verbose: console.log });

const insert = database.prepare("INSERT INTO webservices (name, url, thumbnailPath, sortOrder) VALUES (?, ?, ?, ?)");

insert.run("Docsify", "https://www.blog.example.com", "/webservices/Docsify.png", 1);
insert.run("Jellyfin", "https://www.tv.example.com", "/webservices/Jellyfin.png", 2);
insert.run("Jellyseerr", "https://www.jellyseerr.example.com", "/webservices/Jellyseerr.png", 3);

database.close();