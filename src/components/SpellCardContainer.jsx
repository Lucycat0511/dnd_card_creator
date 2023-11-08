import { useContext } from "react";
import SpellCard from "./SpellCard";
import { CollectionContext } from "../hooks/CollectionProvider";

export default function SpellCardContainer() {
  const { collections, handleDelete } = useContext(CollectionContext);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-4">
      {collections.current.data.map((spell, index) => {
        return (
          <SpellCard
            key={index}
            data={spell}
            handleDelete={() => {
              handleDelete(index);
            }}
          />
        );
      })}
    </div>
  );
}
