import { UploadMediaResponse } from "@/app/dto/upload";
import { da } from "zod/locales";

const API_BASE = process.env.API_BASE ?? "http://localhost:3000";

export async function uploadMedia(formData: FormData): Promise<UploadMediaResponse> {
    const response = await fetch(`${API_BASE}/api/upload`, {
        method: "PUT",
        body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
        console.log(data.error);
        throw new Error(data.error || "Upload failed");
    }

    return data;
}