from pydantic import BaseModel


class QueryRequest(BaseModel):
    question: str
    collection_name: str = "default"
    top_k: int = 5


class SourceChunk(BaseModel):
    content: str
    source: str
    page: int | None = None
    chunk_index: int
    relevance_score: float


class QueryResponse(BaseModel):
    answer: str
    sources: list[SourceChunk]
    model: str
    total_tokens: int


class DocumentInfo(BaseModel):
    filename: str
    collection_name: str
    chunk_count: int
    status: str


class UploadResponse(BaseModel):
    message: str
    documents: list[DocumentInfo]


class CollectionInfo(BaseModel):
    name: str
    document_count: int


class CollectionListResponse(BaseModel):
    collections: list[CollectionInfo]


class DeleteResponse(BaseModel):
    message: str
    collection_name: str


class StatsResponse(BaseModel):
    total_collections: int
    total_documents: int
    collections: list[CollectionInfo]
