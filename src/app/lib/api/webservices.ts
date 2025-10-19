import { WebService } from "@/app/dto/webservice";
import { getApiBase } from "@/app/lib/api/api-base";
import {
    AddWebServiceRequest,
    AddWebServiceResponse,
    UpdateWebServiceRequest,
    DeleteWebServiceRequest,
    SortWebServicesRequest
} from "@/app/dto/webservice";


export async function getWebServices(): Promise<WebService[]> {
    const apiBase = getApiBase();
    const res = await fetch(`${apiBase}/api/webservices`, {
        method: "GET",
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch web services");
    }

    return res.json();
}

export async function addWebService(request: AddWebServiceRequest): Promise<AddWebServiceResponse> {
    const apiBase = getApiBase();
    const res = await fetch(`${apiBase}/api/webservices`, {
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
    const apiBase = getApiBase();
    const res = await fetch(`${apiBase}/api/webservices`, {
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
    const apiBase = getApiBase();
    const request: DeleteWebServiceRequest = {
        id: id
    };
    const res = await fetch(`${apiBase}/api/webservices`, {
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
    const apiBase = getApiBase();
    const res = await fetch(`${apiBase}/api/webservices/sort`, {
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
