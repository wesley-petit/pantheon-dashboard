import { WebService } from "@/app/dto/webservice";
import { AddWebServiceRequest, AddWebServiceResponse, UpdateWebServiceRequest, DeleteWebServiceRequest } from "@/app/dto/webservice";

const API_BASE = process.env.API_BASE ?? "http://localhost:3000";

export async function getWebServices(): Promise<WebService[]> {
    const res = await fetch(`${API_BASE}/api/webservices`, {
        method: "GET",
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch web services");
    }

    return res.json();
}

export async function addWebService(request: AddWebServiceRequest): Promise<AddWebServiceResponse> {
    const res = await fetch(`${API_BASE}/api/webservices`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
    });

    if (!res.ok) {
        const data = await res.json();
        console.log(data);
        throw new Error("Failed to add web service");
    }

    return res.json();
}

export async function updateWebService(request: UpdateWebServiceRequest) {
    const res = await fetch(`${API_BASE}/api/webservices`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
    });

    if (!res.ok) {
        const data = await res.json();
        console.log(data);
        throw new Error("Failed to update web service");
    }
}

export async function deleteWebService(id: number) {
    const request: DeleteWebServiceRequest = {
        id: id
    };
    const res = await fetch(`${API_BASE}/api/webservices`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
    });

    if (!res.ok) {
        const data = await res.json();
        console.log(data);
        throw new Error("Failed to delete web service");
    }
}

export function sortWebServices(webServices: WebService[]): WebService[] {
    return webServices.sort((a, b) => a.id - b.id);
}