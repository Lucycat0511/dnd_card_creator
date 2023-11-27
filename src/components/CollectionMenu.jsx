import { useContext } from "react";
import { CollectionContext } from "../hooks/CollectionProvider";
import { getCollectionData, writeCollectionData } from "../api/firebaseAPI";

export default function CollectionMenu() {
  const { collections, setCurrentCollection, deleteCollection, newCollection } =
    useContext(CollectionContext);
  return (
    <div className="flex flex-col gap-2">
      <button
        className="btn btn-primary"
        onClick={() => {
          newCollection();
        }}
      >
        New Collection
      </button>
      <div className="h-56 w-full border rounded-md overflow-y-scroll overflow-x-clip">
        <div className="menu">
          {collections.current &&
            collections.array.map((collection, index) => {
              return (
                <li
                  key={collection.key}
                  onClick={() => {
                    setCurrentCollection(collection.key);
                  }}
                  className="relative group"
                >
                  <span className="uppercase">{collection.name}</span>
                  <button
                    className="group-hover:flex hidden btn btn-accent btn-xs btn-circle absolute right-1 top-1.5 content-center"
                    onClick={() => {
                      deleteCollection(collection.key);
                    }}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </li>
              );
            })}
        </div>
      </div>
    </div>
  );
}
