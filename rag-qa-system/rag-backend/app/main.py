import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI(
    title="RAG Q&A System",
    description="Retrieval-Augmented Generation for Domain-Specific Question Answering",
    version="1.0.0",
)

# Disable CORS. Do not remove this for full-stack development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

from app.routers import documents, qa

app.include_router(documents.router, prefix="/api")
app.include_router(qa.router, prefix="/api")


@app.get("/healthz")
async def healthz():
    return {"status": "ok"}


@app.get("/api/config")
async def get_config():
    """Check if the API key is configured."""
    api_key = os.environ.get("GROQ_API_KEY", "")
    return {
        "groq_configured": bool(api_key and len(api_key) > 10),
        "embedding_model": os.environ.get("EMBEDDING_MODEL", "all-MiniLM-L6-v2"),
        "llm_model": os.environ.get("LLM_MODEL", "llama-3.3-70b-versatile"),
    }
