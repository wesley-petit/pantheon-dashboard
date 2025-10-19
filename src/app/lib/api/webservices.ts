import { WebService } from "@/app/dto/webservice";
import {
    AddWebServiceRequest,
    AddWebServiceResponse,
    UpdateWebServiceRequest,
    DeleteWebServiceRequest,
    SortWebServicesRequest
} from "@/app/dto/webservice";

const LOCAL_API_BASE = "http://localhost:3000";
const DEFAULT_API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? LOCAL_API_BASE;

function getApiBase() {
    // SERVER-SIDE
    if (typeof window === "undefined") {
        return LOCAL_API_BASE;
    }

    // CLIENT-SIDE
    return DEFAULT_API_BASE;
}

export async function getWebServices(): Promise<WebService[]> {
    const API_BASE = getApiBase();
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
    const API_BASE = getApiBase();
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
    const API_BASE = getApiBase();
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
    const API_BASE = getApiBase();
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

export async function sortWebServices(request: SortWebServicesRequest) {
    const API_BASE = getApiBase();
    const res = await fetch(`${API_BASE}/api/webservices/sort`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
    });

    if (!res.ok) {
        throw new Error("Failed to sort web services");
    }
}

export function sortWebServicesLocally(services: WebService[]): WebService[] {
    return services.sort((a, b) => a.sortOrder - b.sortOrder);
}
