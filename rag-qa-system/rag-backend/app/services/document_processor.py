import os
import tempfile
from pathlib import Path

from fastapi import UploadFile
from langchain_text_splitters import RecursiveCharacterTextSplitter
from pypdf import PdfReader


SUPPORTED_EXTENSIONS = {".pdf", ".txt", ".md", ".csv"}


def extract_text_from_pdf(file_path: str) -> list[dict]:
    """Extract text from a PDF file, returning a list of {page, content} dicts."""
    reader = PdfReader(file_path)
    pages = []
    for i, page in enumerate(reader.pages):
        text = page.extract_text()
        if text and text.strip():
            pages.append({"page": i + 1, "content": text.strip()})
    return pages


def extract_text_from_text_file(file_path: str) -> list[dict]:
    """Extract text from a plain text file."""
    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()
    if content.strip():
        return [{"page": None, "content": content.strip()}]
    return []


async def save_upload_file(upload_file: UploadFile) -> str:
    """Save an uploaded file to a temporary location and return the path."""
    suffix = Path(upload_file.filename or "file.txt").suffix
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        content = await upload_file.read()
        tmp.write(content)
        return tmp.name


def extract_text(file_path: str, filename: str) -> list[dict]:
    """Extract text from a file based on its extension."""
    ext = Path(filename).suffix.lower()

    if ext == ".pdf":
        return extract_text_from_pdf(file_path)
    elif ext in {".txt", ".md", ".csv"}:
        return extract_text_from_text_file(file_path)
    else:
        raise ValueError(f"Unsupported file type: {ext}. Supported: {SUPPORTED_EXTENSIONS}")


def chunk_documents(
    pages: list[dict],
    filename: str,
    chunk_size: int = 1000,
    chunk_overlap: int = 200,
) -> list[dict]:
    """Split extracted text into chunks with metadata."""
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
        length_function=len,
        separators=["\n\n", "\n", ". ", " ", ""],
    )

    chunks = []
    chunk_index = 0

    for page_data in pages:
        page_chunks = splitter.split_text(page_data["content"])
        for chunk_text in page_chunks:
            metadata: dict = {
                "source": filename,
                "chunk_index": chunk_index,
            }
            if page_data["page"] is not None:
                metadata["page"] = page_data["page"]
            chunks.append({
                "content": chunk_text,
                "metadata": metadata,
            })
            chunk_index += 1

    return chunks


async def process_upload(upload_file: UploadFile) -> list[dict]:
    """Full pipeline: save file -> extract text -> chunk."""
    file_path = await save_upload_file(upload_file)
    try:
        pages = extract_text(file_path, upload_file.filename or "file.txt")
        chunks = chunk_documents(pages, upload_file.filename or "file.txt")
        return chunks
    finally:
        os.unlink(file_path)
