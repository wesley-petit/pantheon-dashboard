import { UploadMediaResponse } from "@/app/dto/upload";
import { getApiBase } from "@/app/lib/api/api-base";

export async function uploadMedia(formData: FormData): Promise<UploadMediaResponse> {
    const apiBase = getApiBase();
    const response = await fetch(`${apiBase}/api/upload`, {
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