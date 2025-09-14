import { NextResponse } from "next/server";
import database from "@/app/lib/database/database";

// GET all services
export async function GET() {
    const stmt = database.prepare("SELECT * FROM webservices");
    const rows = stmt.all();
    return NextResponse.json(rows);
}

// POST new service
export async function POST(req: Request) {
    const { name, url, image_path } = await req.json();

    if (!name || !url || !image_path) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const stmt = database.prepare("INSERT INTO webservices (name, url, image_path) VALUES (?, ?, ?)");
    const result = stmt.run(name, url, image_path);

    return NextResponse.json({ id: result.lastInsertRowid, name, url, image_path });
}