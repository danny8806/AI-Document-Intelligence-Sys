# RAG Q&A System

This project is a full-stack Retrieval-Augmented Generation (RAG) application for asking questions over uploaded documents.

Users can upload PDF, TXT, MD, and CSV files, store them in named collections, and ask natural-language questions grounded in those documents. The backend handles document processing, chunking, embeddings, vector search, and answer generation. The frontend provides a simple interface for uploading files, managing collections, and chatting with the assistant.

## What This Project Does

- Uploads documents into a knowledge base
- Splits document text into searchable chunks
- Converts chunks into embeddings using `sentence-transformers`
- Stores embeddings in ChromaDB
- Retrieves the most relevant chunks for a user question
- Sends retrieved context to a Groq-hosted LLM
- Returns an answer with source references

## Tech Stack

### Backend

- FastAPI
- ChromaDB
- sentence-transformers
- PyPDF
- Groq API
- langchain-text-splitters

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- lucide-react

## Project Structure

```text
xyz/
├── README.md
└── rag-qa-system/
    ├── frontend/
    │   ├── src/
    │   │   ├── components/
    │   │   ├── services/
    │   │   ├── types/
    │   │   ├── App.tsx
    │   │   └── main.tsx
    │   ├── package.json
    │   └── vite.config.ts
    └── rag-backend/
        ├── app/
        │   ├── models/
        │   ├── routers/
        │   ├── services/
        │   └── main.py
        ├── pyproject.toml
        └── chroma_data/
```

## How The System Works

### 1. Document Upload

The frontend sends selected files to the backend endpoint:

`POST /api/documents/upload`

The backend:

1. saves the uploaded file to a temporary location
2. extracts text based on file type
3. splits text into chunks
4. generates embeddings for those chunks
5. stores the chunks and metadata in a Chroma collection

### 2. Question Answering

The frontend sends a question to:

`POST /api/qa/ask`

The backend:

1. embeds the user question
2. retrieves the top matching chunks from ChromaDB
3. builds a prompt containing those chunks
4. sends the prompt to the Groq LLM
5. returns the generated answer plus source chunks

### 3. Source Attribution

Each retrieved chunk includes metadata such as:

- source filename
- page number when available
- chunk index
- relevance score

The frontend shows those sources below each assistant response.

## Backend Overview

### Main App

[`rag-qa-system/rag-backend/app/main.py`](/Users/dannyjadhav/RAG AI /xyz/rag-qa-system/rag-backend/app/main.py)

- creates the FastAPI app
- loads environment variables
- enables CORS for frontend access
- registers routers
- exposes `/healthz`
- exposes `/api/config`

### API Schemas

[`rag-qa-system/rag-backend/app/models/schemas.py`](/Users/dannyjadhav/RAG AI /xyz/rag-qa-system/rag-backend/app/models/schemas.py)

Defines request and response models such as:

- `QueryRequest`
- `QueryResponse`
- `UploadResponse`
- `CollectionInfo`
- `StatsResponse`

### Document Routes

[`rag-qa-system/rag-backend/app/routers/documents.py`](/Users/dannyjadhav/RAG AI /xyz/rag-qa-system/rag-backend/app/routers/documents.py)

Provides endpoints for:

- uploading documents
- listing collections
- deleting collections
- returning collection statistics

### QA Route

[`rag-qa-system/rag-backend/app/routers/qa.py`](/Users/dannyjadhav/RAG AI /xyz/rag-qa-system/rag-backend/app/routers/qa.py)

Validates that a collection exists and contains data, then runs the RAG pipeline to answer the question.

### Document Processing Service

[`rag-qa-system/rag-backend/app/services/document_processor.py`](/Users/dannyjadhav/RAG AI /xyz/rag-qa-system/rag-backend/app/services/document_processor.py)

Responsible for:

- saving uploaded files
- extracting text from PDF and text-based files
- splitting text into chunks
- attaching metadata to each chunk

### Vector Store Service

[`rag-qa-system/rag-backend/app/services/vector_store.py`](/Users/dannyjadhav/RAG AI /xyz/rag-qa-system/rag-backend/app/services/vector_store.py)

Responsible for:

- creating the persistent Chroma client
- loading the embedding model
- embedding texts and questions
- storing chunks in collections
- retrieving relevant chunks
- listing and deleting collections

### RAG Pipeline

[`rag-qa-system/rag-backend/app/services/rag_pipeline.py`](/Users/dannyjadhav/RAG AI /xyz/rag-qa-system/rag-backend/app/services/rag_pipeline.py)

Responsible for:

- retrieving relevant chunks
- formatting prompt context
- calling the Groq chat completion API
- returning the answer, model name, token count, and sources

## Frontend Overview

### App Shell

[`rag-qa-system/frontend/src/App.tsx`](/Users/dannyjadhav/RAG AI /xyz/rag-qa-system/frontend/src/App.tsx)

Stores the active collection and renders:

- `Sidebar`
- `ChatArea`

### API Client

[`rag-qa-system/frontend/src/services/api.ts`](/Users/dannyjadhav/RAG AI /xyz/rag-qa-system/frontend/src/services/api.ts)

Wraps all backend calls:

- `checkConfig`
- `uploadDocuments`
- `askQuestion`
- `getCollections`
- `deleteCollection`
- `getStats`

### Sidebar

[`rag-qa-system/frontend/src/components/Sidebar.tsx`](/Users/dannyjadhav/RAG AI /xyz/rag-qa-system/frontend/src/components/Sidebar.tsx)

Lets the user:

- view collections
- switch collections
- create a collection name
- refresh collection data
- delete a collection
- upload documents through the embedded uploader

### File Upload Component

[`rag-qa-system/frontend/src/components/FileUpload.tsx`](/Users/dannyjadhav/RAG AI /xyz/rag-qa-system/frontend/src/components/FileUpload.tsx)

Handles:

- drag and drop
- file selection
- upload requests
- success and error display

### Chat Area

[`rag-qa-system/frontend/src/components/ChatArea.tsx`](/Users/dannyjadhav/RAG AI /xyz/rag-qa-system/frontend/src/components/ChatArea.tsx)

Handles:

- chat state
- question submission
- loading state
- error state
- rendering assistant and user messages

### Chat Message Renderer

[`rag-qa-system/frontend/src/components/ChatMessage.tsx`](/Users/dannyjadhav/RAG AI /xyz/rag-qa-system/frontend/src/components/ChatMessage.tsx)

Displays:

- user or assistant message bubble
- source chunk list
- relevance score
- model name
- token count
- timestamps

## API Endpoints

### Health and Config

- `GET /healthz`
- `GET /api/config`

### Documents

- `POST /api/documents/upload`
- `GET /api/documents/collections`
- `DELETE /api/documents/collections/{collection_name}`
- `GET /api/documents/stats`

### Q&A

- `POST /api/qa/ask`

## Environment Variables

### Backend

Create a `.env` file in `rag-qa-system/rag-backend/`:

```env
GROQ_API_KEY=your_groq_api_key
CHROMA_DATA_DIR=./chroma_data
EMBEDDING_MODEL=all-MiniLM-L6-v2
LLM_MODEL=llama-3.3-70b-versatile
```

### Frontend

Create a `.env` file in `rag-qa-system/frontend/`:

```env
VITE_API_URL=http://localhost:8000
```

## Local Setup

### 1. Start the Backend

From `rag-qa-system/rag-backend/`:

```bash
poetry install
poetry run uvicorn app.main:app --reload
```

The backend will run at:

`http://localhost:8000`

### 2. Start the Frontend

From `rag-qa-system/frontend/`:

```bash
npm install
npm run dev
```

The frontend will usually run at:

`http://localhost:5173`

## Typical Usage Flow

1. start the backend
2. start the frontend
3. create or select a collection
4. upload one or more documents
5. wait for processing and embedding to finish
6. ask a question about the uploaded content
7. inspect the answer and source citations

## Data Storage

- Vector data is stored in `rag-qa-system/rag-backend/chroma_data/`
- Uploaded files are processed through temporary files and are not stored permanently by the app itself
- Chroma collections persist across runs unless deleted

## Supported File Types

- `.pdf`
- `.txt`
- `.md`
- `.csv`

## Notes

- The frontend `node_modules/` directory contains installed dependencies and is not part of the handwritten app logic.
- The `chroma_data/` folder contains generated vector database files.
- The backend currently allows all CORS origins for easier local full-stack development.

## Security Note

Do not commit real API keys into `.env.example` or source control. If a real Groq key has already been exposed, rotate it immediately and replace it with a placeholder value.

## Future Improvements

- add tests for document ingestion and question answering
- support more document types such as DOCX
- add streaming responses in the chat UI
- improve collection creation and validation
- add authentication and per-user document spaces
- show upload history and document-level management
