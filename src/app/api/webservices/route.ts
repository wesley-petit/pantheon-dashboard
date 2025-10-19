import { NextResponse } from "next/server";
import { okResponse, withErrorHandling } from "@/app/api/apiHandler"
import {
    AddWebServiceRequestSchema,
    AddWebServiceResponse,
    DeleteWebServiceRequestSchema,
    UpdateWebServiceRequestSchema,
    WebService
} from "@/app/dto/webservice";
import database from "@/app/lib/database/database";
import fs from "fs";
import path from "path";

const UPLOAD_DIR = path.resolve(process.cwd(), "public");

// GET all services
export const GET = withErrorHandling(async () => {
    const rows = database.prepare("SELECT * FROM webservices").all();
    return NextResponse.json(rows);
});

// POST new service
export const POST = withErrorHandling(async (req: Request) => {
    const request = AddWebServiceRequestSchema.parse(await req.json());
    const stmt = database.prepare("INSERT INTO webservices (name, url, thumbnailPath, sortOrder) VALUES (?, ?, ?, ?)");
    const result = stmt.run(request.name, request.url, request.thumbnailPath, request.sortOrder);
    const response: AddWebServiceResponse = {
        id: Number(result.lastInsertRowid)
    };
    return NextResponse.json(response);
});

// PATCH a service
export const PATCH = withErrorHandling(async (req: Request) => {
    const request = UpdateWebServiceRequestSchema.parse(await req.json());
    const webService = await getOrDefaultWebService(request.id);
    if (!webService) {
        return NextResponse.json({ error: "Web service not found" }, { status: 404 });
    }
    const stmt = database.prepare("UPDATE webservices SET name = ?, url = ?, thumbnailPath = ?, sortOrder= ? WHERE id = ?");
    stmt.run(request.name, request.url, request.thumbnailPath, request.sortOrder, request.id);
    // Clean-up old file
    if (request.thumbnailPath !== webService.thumbnailPath) {
        await deleteFile(webService.thumbnailPath);
    }
    return okResponse();
});

// DELETE a service
export const DELETE = withErrorHandling(async (req: Request) => {
    const request = DeleteWebServiceRequestSchema.parse(await req.json());
    const webService = await getOrDefaultWebService(request.id);
    if (!webService) {
        return NextResponse.json({ error: "Web service not found" }, { status: 404 });
    }
    const stmt = database.prepare("DELETE FROM webservices WHERE id = ?");
    stmt.run(Number(request.id));
    await deleteFile(webService.thumbnailPath);
    return okResponse();
});

async function getOrDefaultWebService(id: number): Promise<WebService | null> {
    const stmt = await database.prepare("SELECT * FROM webservices WHERE id = ? ORDER by sortOrder");
    const row = stmt.get(id);
    return row ? row as WebService : null;
}

async function deleteFile(thumbnailPath: string): Promise<void> {
    const filePath = path.join(UPLOAD_DIR, thumbnailPath);
    if (!fs.existsSync(filePath)) {
        return;
    }
    console.log(`Delete file at ${filePath}`)
    fs.unlinkSync(filePath);
};