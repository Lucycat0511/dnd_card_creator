import { useContext } from "react";
import { CollectionContext } from "../hooks/CollectionProvider";

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
        Save Collection
      </button>
      <div className="h-56 border rounded-md">
        <div className="menu">
          {collections.array.map((collection, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  setCurrentCollection(index);
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
