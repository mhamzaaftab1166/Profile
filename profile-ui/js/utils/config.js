async function apiFetch(endpoint, { method = "GET", contentType = "application/json", body = null } = {}) {
  const { baseUrl, token } = await getApiConfig();

  const isFormData = body instanceof FormData;

  const headers = {
    Authorization: `Bearer ${token}`,
    ...(isFormData ? {} : { "Content-Type": contentType }),
  };

  const response = await fetch(`${baseUrl}${endpoint}`, {
    method,
    headers,
    body,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "API request failed");
  }

  return response.json();
}
