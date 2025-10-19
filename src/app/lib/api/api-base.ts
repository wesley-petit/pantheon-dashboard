const LOCAL_API_BASE = "http://localhost:3000";
const DEFAULT_API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? LOCAL_API_BASE;

export function getApiBase() {
    // SERVER-SIDE
    if (typeof window === "undefined") {
        return LOCAL_API_BASE;
    }

    // CLIENT-SIDE
    return DEFAULT_API_BASE;
}