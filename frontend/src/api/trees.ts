import api from "./client";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

export const fetchTrees = async () => {
  const res = await api.get("/trees", { headers: getAuthHeaders() });
  return res.data;
};

export const createTree = async (startNumber: number) => {
  const res = await api.post("/trees", { startNumber }, { headers: getAuthHeaders() });
  return res.data;
};

export const fetchTreeById = async (id: number) => {
  const res = await api.get(`/trees/${id}`, { headers: getAuthHeaders() });
  return res.data;
};

export const addOperation = async (treeId: number, parentId: number, operation: string, rightValue: number) => {
  const res = await api.post(
    `/trees/${treeId}/operations`,
    { parentId, operation, rightValue },
    { headers: getAuthHeaders() }
  );
  return res.data;
};