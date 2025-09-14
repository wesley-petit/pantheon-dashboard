import { WebService } from "@/app/dto/webservice";

const API_BASE = process.env.API_BASE ?? "http://localhost:3000";

export async function getWebServices(): Promise<WebService[]> {
    const res = await fetch(`${API_BASE}/api/webservices`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch web services");
    }

    return res.json();
}

export async function addWebService(service: Omit<WebService, "id">): Promise<WebService> {
    const res = await fetch(`${API_BASE}/api/webservices`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(service),
    });

    if (!res.ok) {
        throw new Error("Failed to add web service");
    }

    return res.json();
}