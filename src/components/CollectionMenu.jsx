import { useContext } from "react";
import { CollectionContext } from "../hooks/CollectionProvider";
import { getCollectionData, writeCollectionData } from "../api/firebaseAPI";

export default function CollectionMenu() {
  const { collections, setCurrentCollection, addCollection } =
    useContext(CollectionContext);
  return (
    <div className="flex flex-col gap-2">
      <button
        className="btn btn-primary"
        onClick={() => {
          addCollection();
        }}
      >
        New Collection
      </button>
      <button
        className="btn btn-primary"
        onClick={() => {
          addCollection();
        }}
      >
        Save Collection
      </button>
      <div className="h-full w-full border rounded-md overflow-y-scroll overflow-x-clip">
        <div className="menu">
          {collections.current &&
            collections.array.map((collection, index) => {
              return (
                <li
                  key={collection.key}
                  onClick={() => {
                    setCurrentCollection(collection.key);
                  }}
                >
                  <span>{collection.name}</span>
                </li>
              );
            })}
        </div>
      </div>
    </div>
  );
}
