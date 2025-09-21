import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from 'crypto';
import path from "path";
import fs from "fs";
import { UploadMediaResponse } from "@/app/dto/upload"

const UPLOAD_DIR = path.resolve(process.cwd(), "public/uploads");

export const PUT = async (req: NextRequest) => {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
        return NextResponse.json(
            {
                success: false,
                error: "No file uploaded"
            },
            {
                status: 400
            }
        );
    }

    // Generate a GUID and use as filename, keeping the original extension
    const ext = path.extname(file.name);
    const newFileName = `${randomUUID()}${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    fs.writeFileSync(path.join(UPLOAD_DIR, newFileName), buffer);
    const response: UploadMediaResponse = {
        name: newFileName,
        fullPath: `/uploads/${newFileName}`
    };
    return NextResponse.json(response);
};
