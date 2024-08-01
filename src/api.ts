const API_URL = "http://localhost:something";

export const fetchData = async (endpoint: string) => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Network response was not a 200");
    }
    const data = await response.json();
    return data;
  } catch {}
};
