const API_URL = import.meta.env.VITE_API_BASE_URL;

console.log("API URL:", API_URL);

export const getEntities = async <T>(
  entity: string
): Promise<T[]> => {
  const response = await fetch(`${API_URL}/${entity}`);
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return response.json() as Promise<T[]>;
};

export const createEntity = async <T>(
  entity: string,
  payload: Omit<T, "id">
): Promise<T> => {
  const response = await fetch(`${API_URL}/${entity}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create");
  }

  return response.json() as Promise<T>;
};


export const updateEntity = async <T>(
  entity: string,
  id: string,
  payload: Omit<T, "id">
): Promise<T> => {
  const response = await fetch(`${API_URL}/${entity}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to update");
  }

  return response.json() as Promise<T>;
};

export const deleteEntity = async (
  entity: string,
  id: string
): Promise<void> => {
  const response = await fetch(`${API_URL}/${entity}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete");
  }
};
