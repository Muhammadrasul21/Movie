// api.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.themoviedb.org/3";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDgxMWI5ZDI5YjU0YWQ1NjZkZmQwYmMyZWZkNGE2NyIsIm5iZiI6MTczOTk4NDk1Ni4zMDksInN1YiI6IjY3YjYxMDNjOTAyZjVlMjBhNjg4ZGNjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SEgSyBAOrJkQQi8joJ1tdXJ0MzwyZ0oTFNnQKDDdUW8";

export async function apiFetcher(
  endpoint: string,
  params: Record<string, any> = {}
) {
  try {
    const url = new URL(`${BASE_URL}${endpoint}`);

    // API key ni params ga qo'shamiz
    url.searchParams.append("api_key", "54811b9d29b54ad566dfd0bc2efd4a67");

    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null) {
        url.searchParams.append(key, params[key].toString());
      }
    });

    const res = await fetch(url.toString(), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.status} - ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}
