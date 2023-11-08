import { createContext, useState } from "react";

export const CollectionContext = createContext("");

export default function CollectionProvider({ children }) {
  const [collections, setCollections] = useState({
    current: [{ key: "", data: "" }],
    array: [{ key: "hello", data: "" }],
  });
  function addCollection(collection) {
    setCollections((prev) => {
      return { current: [collection], array: [...prev.array, collection] };
    });
  }
  return (
    <CollectionContext.Provider
      value={{ collections, setCollections, addCollection }}
    >
      {children}
    </CollectionContext.Provider>
  );
}
