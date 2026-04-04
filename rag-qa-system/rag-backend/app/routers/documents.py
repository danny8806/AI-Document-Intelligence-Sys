from fastapi import APIRouter, UploadFile, File, Form, HTTPException

from app.models.schemas import (
    CollectionListResponse,
    DeleteResponse,
    DocumentInfo,
    StatsResponse,
    UploadResponse,
)
from app.services.document_processor import process_upload, SUPPORTED_EXTENSIONS
from app.services.vector_store import (
    add_documents_to_collection,
    delete_collection,
    list_collections,
)

router = APIRouter(prefix="/documents", tags=["Documents"])


@router.post("/upload", response_model=UploadResponse)
async def upload_documents(
    files: list[UploadFile] = File(...),
    collection_name: str = Form("default"),
):
    """Upload one or more documents (PDF, TXT, MD, CSV) to a collection."""
    results: list[DocumentInfo] = []

    for file in files:
        filename = file.filename or "unknown"
        ext = filename.rsplit(".", 1)[-1].lower() if "." in filename else ""

        if f".{ext}" not in SUPPORTED_EXTENSIONS:
            results.append(DocumentInfo(
                filename=filename,
                collection_name=collection_name,
                chunk_count=0,
                status=f"error: unsupported file type .{ext}",
            ))
            continue

        try:
            chunks = await process_upload(file)
            if not chunks:
                results.append(DocumentInfo(
                    filename=filename,
                    collection_name=collection_name,
                    chunk_count=0,
                    status="error: no text content extracted",
                ))
                continue

            count = add_documents_to_collection(collection_name, chunks)
            results.append(DocumentInfo(
                filename=filename,
                collection_name=collection_name,
                chunk_count=count,
                status="success",
            ))
        except Exception as e:
            results.append(DocumentInfo(
                filename=filename,
                collection_name=collection_name,
                chunk_count=0,
                status=f"error: {str(e)}",
            ))

    successful = sum(1 for r in results if r.status == "success")
    total = len(results)

    return UploadResponse(
        message=f"Processed {total} file(s): {successful} successful",
        documents=results,
    )


@router.get("/collections", response_model=CollectionListResponse)
async def get_collections():
    """List all document collections."""
    collections = list_collections()
    return CollectionListResponse(
        collections=[
            {"name": c["name"], "document_count": c["document_count"]}
            for c in collections
        ]
    )


@router.delete("/collections/{collection_name}", response_model=DeleteResponse)
async def remove_collection(collection_name: str):
    """Delete a document collection and all its chunks."""
    success = delete_collection(collection_name)
    if not success:
        raise HTTPException(status_code=404, detail=f"Collection '{collection_name}' not found")
    return DeleteResponse(
        message=f"Collection '{collection_name}' deleted successfully",
        collection_name=collection_name,
    )


@router.get("/stats", response_model=StatsResponse)
async def get_stats():
    """Get overall statistics about stored documents."""
    collections = list_collections()
    total_docs = sum(c["document_count"] for c in collections)
    return StatsResponse(
        total_collections=len(collections),
        total_documents=total_docs,
        collections=[
            {"name": c["name"], "document_count": c["document_count"]}
            for c in collections
        ],
    )
