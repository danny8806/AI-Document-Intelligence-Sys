import os

import chromadb
from chromadb.config import Settings
from sentence_transformers import SentenceTransformer


DATA_DIR = os.environ.get("CHROMA_DATA_DIR", "./chroma_data")
EMBEDDING_MODEL = os.environ.get("EMBEDDING_MODEL", "all-MiniLM-L6-v2")

_client: chromadb.ClientAPI | None = None
_embedding_model: SentenceTransformer | None = None


def get_chroma_client() -> chromadb.ClientAPI:
    """Get or create a persistent ChromaDB client."""
    global _client
    if _client is None:
        _client = chromadb.PersistentClient(
            path=DATA_DIR,
            settings=Settings(anonymized_telemetry=False),
        )
    return _client


def get_embedding_model() -> SentenceTransformer:
    """Get or create the sentence-transformers embedding model."""
    global _embedding_model
    if _embedding_model is None:
        _embedding_model = SentenceTransformer(EMBEDDING_MODEL)
    return _embedding_model


def embed_texts(texts: list[str]) -> list[list[float]]:
    """Embed a list of texts using sentence-transformers."""
    model = get_embedding_model()
    embeddings = model.encode(texts, show_progress_bar=False)
    return embeddings.tolist()


def embed_query(query: str) -> list[float]:
    """Embed a single query string."""
    model = get_embedding_model()
    embedding = model.encode(query, show_progress_bar=False)
    return embedding.tolist()


def add_documents_to_collection(
    collection_name: str,
    chunks: list[dict],
) -> int:
    """Add document chunks to a ChromaDB collection. Returns the number of chunks added."""
    client = get_chroma_client()

    texts = [chunk["content"] for chunk in chunks]
    embedding_vectors = embed_texts(texts)

    collection = client.get_or_create_collection(
        name=collection_name,
        metadata={"hnsw:space": "cosine"},
    )

    existing_count = collection.count()

    ids = [f"{collection_name}_chunk_{existing_count + i}" for i in range(len(chunks))]
    metadatas = [chunk["metadata"] for chunk in chunks]

    collection.add(
        ids=ids,
        documents=texts,
        embeddings=embedding_vectors,
        metadatas=metadatas,
    )

    return len(chunks)


def query_collection(
    collection_name: str,
    query: str,
    top_k: int = 5,
) -> list[dict]:
    """Query a collection and return the top-k most relevant chunks."""
    client = get_chroma_client()

    try:
        collection = client.get_collection(name=collection_name)
    except Exception:
        return []

    query_embedding = embed_query(query)

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=min(top_k, collection.count()),
        include=["documents", "metadatas", "distances"],
    )

    chunks = []
    if results["documents"] and results["documents"][0]:
        for i, doc in enumerate(results["documents"][0]):
            metadata = results["metadatas"][0][i] if results["metadatas"] else {}
            distance = results["distances"][0][i] if results["distances"] else 0.0
            relevance_score = 1.0 - distance

            chunks.append({
                "content": doc,
                "source": metadata.get("source", "unknown"),
                "page": metadata.get("page"),
                "chunk_index": metadata.get("chunk_index", 0),
                "relevance_score": round(relevance_score, 4),
            })

    return chunks


def list_collections() -> list[dict]:
    """List all collections with document counts."""
    client = get_chroma_client()
    collections = client.list_collections()
    return [
        {"name": col.name, "document_count": col.count()}
        for col in collections
    ]


def delete_collection(collection_name: str) -> bool:
    """Delete a collection. Returns True if successful."""
    client = get_chroma_client()
    try:
        client.delete_collection(name=collection_name)
        return True
    except Exception:
        return False


def get_collection_count(collection_name: str) -> int:
    """Get the number of documents in a collection."""
    client = get_chroma_client()
    try:
        collection = client.get_collection(name=collection_name)
        return collection.count()
    except Exception:
        return 0
