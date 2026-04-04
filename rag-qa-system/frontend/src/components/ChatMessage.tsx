import { useState } from "react";
import { User, Bot, ChevronDown, ChevronUp, FileText, Clock } from "lucide-react";
import type { ChatMessage as ChatMessageType } from "../types";

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const [showSources, setShowSources] = useState(false);
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? "bg-blue-600" : "bg-emerald-600"
        }`}
      >
        {isUser ? (
          <User className="h-4 w-4 text-white" />
        ) : (
          <Bot className="h-4 w-4 text-white" />
        )}
      </div>

      <div className={`max-w-3xl ${isUser ? "text-right" : ""}`}>
        <div
          className={`rounded-2xl px-4 py-3 inline-block text-left ${
            isUser
              ? "bg-blue-600 text-white"
              : "bg-white border border-gray-200 text-gray-800 shadow-sm"
          }`}
        >
          <div className="text-sm whitespace-pre-wrap leading-relaxed">
            {message.content}
          </div>
        </div>

        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="mt-2">
            <button
              onClick={() => setShowSources(!showSources)}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FileText className="h-3 w-3" />
              {message.sources.length} source{message.sources.length > 1 ? "s" : ""}
              {showSources ? (
                <ChevronUp className="h-3 w-3" />
              ) : (
                <ChevronDown className="h-3 w-3" />
              )}
            </button>

            {showSources && (
              <div className="mt-2 space-y-2">
                {message.sources.map((source, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-left"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="h-3 w-3 text-blue-500" />
                      <span className="text-xs font-medium text-gray-700">
                        {source.source}
                        {source.page && ` (Page ${source.page})`}
                      </span>
                      <span className="text-xs text-gray-400 ml-auto">
                        {(source.relevance_score * 100).toFixed(0)}% match
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-3">
                      {source.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {!isUser && message.model && (
          <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
            <span>{message.model}</span>
            {message.tokens && <span>{message.tokens} tokens</span>}
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {message.timestamp.toLocaleTimeString()}
            </span>
          </div>
        )}

        {isUser && (
          <div className="text-xs text-gray-400 mt-1">
            {message.timestamp.toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  );
}
