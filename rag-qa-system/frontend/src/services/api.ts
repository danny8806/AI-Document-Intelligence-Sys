import type {
  QueryResponse,
  UploadResponse,
  CollectionInfo,
  ConfigResponse,
} from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function checkConfig(): Promise<ConfigResponse> {
  const res = await fetch(`${API_URL}/api/config`);
  if (!res.ok) throw new Error("Failed to check config");
  return res.json();
}

export async function uploadDocuments(
  files: File[],
  collectionName: string = "default"
): Promise<UploadResponse> {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  formData.append("collection_name", collectionName);

  const res = await fetch(`${API_URL}/api/documents/upload`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Upload failed" }));
    throw new Error(error.detail || "Upload failed");
  }
  return res.json();
}

export async function askQuestion(
  question: string,
  collectionName: string = "default",
  topK: number = 5
): Promise<QueryResponse> {
  const res = await fetch(`${API_URL}/api/qa/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      question,
      collection_name: collectionName,
      top_k: topK,
    }),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Query failed" }));
    throw new Error(error.detail || "Query failed");
  }
  return res.json();
}

export async function getCollections(): Promise<CollectionInfo[]> {
  const res = await fetch(`${API_URL}/api/documents/collections`);
  if (!res.ok) throw new Error("Failed to get collections");
  const data = await res.json();
  return data.collections;
}

export async function deleteCollection(name: string): Promise<void> {
  const res = await fetch(`${API_URL}/api/documents/collections/${name}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete collection");
}

export async function getStats(): Promise<{
  total_collections: number;
  total_documents: number;
  collections: CollectionInfo[];
}> {
  const res = await fetch(`${API_URL}/api/documents/stats`);
  if (!res.ok) throw new Error("Failed to get stats");
  return res.json();
}
