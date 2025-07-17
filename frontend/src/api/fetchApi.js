export async function fetchApi(endpoint, data, options = {}) {
  const url = import.meta.env.VITE_API_BASE_URL + endpoint;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(options.headers || {}),
    },
    credentials: 'omit',
    body: JSON.stringify(data),
    ...options,
  });
  return response;
} 