export interface SourceChunk {
  content: string;
  source: string;
  page: number | null;
  chunk_index: number;
  relevance_score: number;
}

export interface QueryResponse {
  answer: string;
  sources: SourceChunk[];
  model: string;
  total_tokens: number;
}

export interface DocumentInfo {
  filename: string;
  collection_name: string;
  chunk_count: number;
  status: string;
}

export interface UploadResponse {
  message: string;
  documents: DocumentInfo[];
}

export interface CollectionInfo {
  name: string;
  document_count: number;
}

export interface ConfigResponse {
  groq_configured: boolean;
  embedding_model: string;
  llm_model: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: SourceChunk[];
  model?: string;
  tokens?: number;
  timestamp: Date;
}
