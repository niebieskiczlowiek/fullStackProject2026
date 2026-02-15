const BASE_URL = process.env.TMDB_API_BASE_URL
const API_KEY = process.env.TMDB_API_READ_ACCESS_TOKEN

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    if (!BASE_URL || !API_KEY) {
        console.error("❌ TMDB API Configuration missing!")
        throw new Error("Missing TMDB API keys in Enviroment Variables");
    }
    
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const cleanBase = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
    const url = `${cleanBase}${cleanEndpoint}`;
    
    const response = await fetch(url, {
        ...options,
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
            ...options.headers,
        }
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ API Error ${response.status}:`, errorText);
        throw new Error(`API Error: ${response.status}`);
    }

    const text = await response.text();
    if (!text) {
        console.warn("⚠️ API returned an empty response body.");
        return {} as T;
    }

    return JSON.parse(text) as T;
};