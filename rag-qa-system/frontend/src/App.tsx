import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatArea from "./components/ChatArea";

function App() {
  const [activeCollection, setActiveCollection] = useState("default");

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        activeCollection={activeCollection}
        onCollectionChange={setActiveCollection}
      />
      <ChatArea collectionName={activeCollection} />
    </div>
  );
}

export default App;
