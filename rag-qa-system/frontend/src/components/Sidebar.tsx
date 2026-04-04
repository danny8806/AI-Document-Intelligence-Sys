import { useState, useEffect } from "react";
import {
  Database,
  Trash2,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Settings,
} from "lucide-react";
import FileUpload from "./FileUpload";
import { getCollections, deleteCollection } from "../services/api";
import type { CollectionInfo } from "../types";

interface SidebarProps {
  activeCollection: string;
  onCollectionChange: (name: string) => void;
}

export default function Sidebar({ activeCollection, onCollectionChange }: SidebarProps) {
  const [collections, setCollections] = useState<CollectionInfo[]>([]);
  const [collapsed, setCollapsed] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [showNewCollection, setShowNewCollection] = useState(false);

  const fetchCollections = async () => {
    try {
      const data = await getCollections();
      setCollections(data);
    } catch {
      // silently fail
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleDelete = async (name: string) => {
    if (!confirm(`Delete collection "${name}" and all its documents?`)) return;
    try {
      await deleteCollection(name);
      await fetchCollections();
      if (activeCollection === name) {
        onCollectionChange("default");
      }
    } catch {
      // silently fail
    }
  };

  const handleCreateCollection = () => {
    const name = newCollectionName.trim().toLowerCase().replace(/\s+/g, "-");
    if (name) {
      onCollectionChange(name);
      setNewCollectionName("");
      setShowNewCollection(false);
    }
  };

  if (collapsed) {
    return (
      <div className="w-12 bg-gray-900 flex flex-col items-center py-4 gap-4">
        <button
          onClick={() => setCollapsed(false)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <Database className="h-5 w-5 text-gray-500" />
        <Settings className="h-5 w-5 text-gray-500" />
      </div>
    );
  }

  return (
    <div className="w-80 bg-gray-900 text-white flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="font-semibold text-sm">Knowledge Base</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchCollections}
            className="text-gray-400 hover:text-white transition-colors"
            title="Refresh"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <button
            onClick={() => setCollapsed(true)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="p-4 border-b border-gray-700">
        <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider font-medium">
          Upload Documents
        </p>
        <FileUpload
          collectionName={activeCollection}
          onUploadComplete={fetchCollections}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">
            Collections
          </p>
          <button
            onClick={() => setShowNewCollection(!showNewCollection)}
            className="text-xs text-blue-400 hover:text-blue-300"
          >
            + New
          </button>
        </div>

        {showNewCollection && (
          <div className="mb-3 flex gap-2">
            <input
              type="text"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreateCollection()}
              placeholder="Collection name..."
              className="flex-1 bg-gray-800 border border-gray-600 rounded px-2 py-1 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleCreateCollection}
              className="text-xs bg-blue-600 px-2 py-1 rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        )}

        {collections.length === 0 ? (
          <p className="text-xs text-gray-500 text-center py-4">
            No collections yet. Upload documents to get started.
          </p>
        ) : (
          <div className="space-y-1">
            {collections.map((col) => (
              <div
                key={col.name}
                className={`flex items-center justify-between rounded-lg px-3 py-2 cursor-pointer transition-colors group ${
                  activeCollection === col.name
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
                onClick={() => onCollectionChange(col.name)}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Database className="h-4 w-4 shrink-0" />
                  <span className="text-sm truncate">{col.name}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs opacity-60">
                    {col.document_count} chunks
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(col.name);
                    }}
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400 transition-all"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-700">
        <div className="text-xs text-gray-500 space-y-1">
          <p className="flex items-center gap-1">
            <Settings className="h-3 w-3" />
            Groq + Llama 3.3 70B
          </p>
          <p>Embeddings: all-MiniLM-L6-v2</p>
        </div>
      </div>
    </div>
  );
}
