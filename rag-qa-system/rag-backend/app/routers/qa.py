from fastapi import APIRouter, HTTPException

from app.models.schemas import QueryRequest, QueryResponse
from app.services.rag_pipeline import generate_answer
from app.services.vector_store import get_collection_count

router = APIRouter(prefix="/qa", tags=["Question & Answer"])


@router.post("/ask", response_model=QueryResponse)
async def ask_question(request: QueryRequest):
    """Ask a question and get an AI-generated answer based on uploaded documents."""
    doc_count = get_collection_count(request.collection_name)
    if doc_count == 0:
        raise HTTPException(
            status_code=400,
            detail=f"Collection '{request.collection_name}' is empty or doesn't exist. Upload documents first.",
        )

    try:
        result = generate_answer(
            question=request.question,
            collection_name=request.collection_name,
            top_k=request.top_k,
        )
        return QueryResponse(
            answer=result["answer"],
            sources=result["sources"],
            model=result["model"],
            total_tokens=result["total_tokens"],
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating answer: {str(e)}")
