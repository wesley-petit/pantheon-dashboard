import { UploadMediaResponse } from "@/app/dto/upload";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3000";

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