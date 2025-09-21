import Database from "better-sqlite3";

const database = new Database("./src/app/data/database.sqlite", { verbose: console.log });

const insert = database.prepare("INSERT INTO webservices (name, url, thumbnailPath) VALUES (?, ?, ?)");

insert.run("Docsify", "https://www.blog.example.com", "/webservices/Docsify.png");
insert.run("Jellyfin", "https://www.tv.example.com", "/webservices/Jellyfin.png");
insert.run("Jellyseerr", "https://www.jellyseerr.example.com", "/webservices/Jellyseerr.png");

database.close();