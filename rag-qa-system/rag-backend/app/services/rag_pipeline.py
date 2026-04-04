import os

from groq import Groq

from app.services.vector_store import query_collection


SYSTEM_PROMPT = """You are a knowledgeable research assistant that answers questions based on the provided context documents. Follow these rules:

1. ONLY answer based on the provided context. If the context doesn't contain enough information, say "I don't have enough information in the uploaded documents to answer this question."
2. Cite your sources by referencing the document name and page number when available.
3. Be precise and detailed in your answers.
4. If multiple sources provide conflicting information, mention the discrepancy.
5. Structure your answers clearly with paragraphs or bullet points when appropriate.
6. Do not make up information or hallucinate facts."""


def build_context(chunks: list[dict]) -> str:
    """Build a context string from retrieved chunks for the LLM prompt."""
    if not chunks:
        return "No relevant documents found."

    context_parts = []
    for i, chunk in enumerate(chunks):
        source_info = f"[Source: {chunk['source']}"
        if chunk.get("page"):
            source_info += f", Page {chunk['page']}"
        source_info += f", Relevance: {chunk['relevance_score']:.2f}]"

        context_parts.append(f"--- Document Fragment {i + 1} {source_info} ---\n{chunk['content']}")

    return "\n\n".join(context_parts)


def generate_answer(
    question: str,
    collection_name: str = "default",
    top_k: int = 5,
    model: str | None = None,
) -> dict:
    """Full RAG pipeline: retrieve relevant chunks -> generate answer with Groq LLM."""
    if model is None:
        model = os.environ.get("LLM_MODEL", "llama-3.3-70b-versatile")
    retrieved_chunks = query_collection(collection_name, question, top_k)

    context = build_context(retrieved_chunks)

    user_message = f"""Context from uploaded documents:

{context}

---

Question: {question}

Please provide a comprehensive answer based on the context above. Cite the source documents when possible."""

    client = Groq(api_key=os.environ.get("GROQ_API_KEY", ""))

    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_message},
        ],
        temperature=0.3,
        max_tokens=2000,
    )

    answer = response.choices[0].message.content or "No answer generated."
    total_tokens = response.usage.total_tokens if response.usage else 0

    return {
        "answer": answer,
        "sources": retrieved_chunks,
        "model": model,
        "total_tokens": total_tokens,
    }
