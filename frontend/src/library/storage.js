const STORAGE = {
  TOKEN: "token",
  USER_INFO: "user-info",
  USER_ID: "user-id",
};

export const getStorage = (name) => {
  let data;
  data =
    typeof window !== "undefined" && name !== undefined
      ? localStorage.getItem(name)
      : "";
  try {
    if (data) return JSON.parse(data);
  } catch (error) {
    return data;
  }
};

export const setStorage = (name, value) => {
  const stringify = typeof value !== "string" ? JSON.stringify(value) : value;
  return localStorage.setItem(name, stringify);
};

export const deleteStorage = (name) => {
  return localStorage.removeItem(name);
};

export const clearStorage = () => {
  return localStorage.clear();
};

export default STORAGE;
